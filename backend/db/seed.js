const { Pool } = require("pg");


//LOCAL DB

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "processManager",
  password: "bazepodataka",
  port: 5432,
}); 


/* 
const pool = new Pool({
  user: "projektadmin",
  host: "161.53.18.24",
  database: "BLogistics",
  password: "5tz89rg5489ohizg",
  port: 5432
}); */


const sql_create_user = `
  CREATE TABLE user_data(
    userId SERIAL NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL DEFAULT 'personal',
    PRIMARY KEY (userId),
    UNIQUE (email)
);
`;

const sql_create_user_company = `
  CREATE TABLE user_company(
    userId INT NOT NULL,
    name VARCHAR NOT NULL,
    ceo VARCHAR NOT NULL,
    PRIMARY KEY (userId),
    FOREIGN KEY (userId) REFERENCES user_data(userId) ON DELETE CASCADE
);

`;const sql_create_user_person = `
  CREATE TABLE user_person(
    userId INT NOT NULL,
    firstName VARCHAR NOT NULL,
    lastName VARCHAR NOT NULL,
    PRIMARY KEY (userId),
    FOREIGN KEY (userId) REFERENCES user_data(userId) ON DELETE CASCADE
);
`;

const sql_create_process = `
    
    CREATE TABLE process(
        processId SERIAL NOT NULL,
        name VARCHAR(50) NOT NULL,
        description VARCHAR(200) NOT NULL,
        verification VARCHAR(50) NOT NULL,
        userId INT NOT NULL,
        PRIMARY KEY (processId),
        FOREIGN KEY (userId) REFERENCES user_data(userId) ON DELETE CASCADE
);
`;

const sql_create_process_batch = `
    
    CREATE TABLE batch(
        batchId SERIAL NOT NULL,
        start_datetime TIMESTAMP,
        end_datetime TIMESTAMP,
        activePhaseId INT default 0,
        processId INT NOT NULL,
        PRIMARY KEY (batchId),
        FOREIGN KEY (processId) REFERENCES process(processId) ON DELETE CASCADE, 
        FOREIGN KEY (activePhaseId) REFERENCES process_phase(phaseId) ON DELETE SET NULL
);
`;

const sql_create_process_batch_phases = `
    
    CREATE TABLE batch_phases(
        batchId INT NOT NULL,
        phaseId INT NOT NULL,
        start_datetime TIMESTAMP,
        end_datetime TIMESTAMP,
        PRIMARY KEY (batchId, phaseId),
        FOREIGN KEY (batchId) REFERENCES batch(batchId) ON DELETE CASCADE,
        FOREIGN KEY (phaseId) REFERENCES process_phase(phaseId) ON DELETE CASCADE
);
`;

const sql_create_process_phase = `
    
    CREATE TABLE process_phase(
        phaseId SERIAL NOT NULL,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(200) NOT NULL,
        location VARCHAR(100),
        processId INT NOT NULL,
        PRIMARY KEY (phaseId),
        FOREIGN KEY (processId) REFERENCES process(processId) ON DELETE CASCADE
);
`;

const sql_create_process_component = `
    
    CREATE TABLE process_component(
        componentId SERIAL NOT NULL,
        name VARCHAR(50) NOT NULL,
        phaseId INT NOT NULL,
        PRIMARY KEY (componentId),
        FOREIGN KEY (phaseId) REFERENCES process_phase(phaseId) ON DELETE CASCADE
);
`;

const sql_create_fav_templates = `

    CREATE TABLE favorite_templates(
        processId INT NOT NULL,
        userId INT NOT NULL,
        PRIMARY KEY (processId,userId),
        FOREIGN KEY (userId) REFERENCES user_data(userId) ON DELETE CASCADE,
        FOREIGN KEY (processId) REFERENCES process(processId) ON DELETE CASCADE
    );
`;

const sql_create_reports = `

    CREATE TABLE reports(
        reportId SERIAL NOT NULL,
        processId INT NOT NULL,
        reportedById INT NOT NULL,
        description VARCHAR(500) NOT NULL,
        PRIMARY KEY (reportId),
        FOREIGN KEY (reportedById) REFERENCES user_data(userId) ON DELETE CASCADE,
        FOREIGN KEY (processId) REFERENCES process(processId) ON DELETE CASCADE
    );
`;

const sql_create_parameter_log = `
    
    CREATE TABLE parameter_log(
        logId SERIAL NOT NULL,
        value FLOAT(12) NOT NULL,
        datetime TIMESTAMP NOT NULL,
        parameterId INT NOT NULL,
        batchId INT NOT NULL,
        PRIMARY KEY (logId),
        FOREIGN KEY (parameterId) REFERENCES parameter(parameterId) ON DELETE CASCADE,
        FOREIGN KEY (batchId) REFERENCES batch(batchId) ON DELETE CASCADE
);
`;

const sql_create_parameter = `
    
    CREATE TABLE parameter(
        phaseId INT,
        processId INT,
        componentId INT,
        parameterId SERIAL NOT NULL,
        max_value FLOAT(12),
        min_value FLOAT(12),
        name VARCHAR(50) NOT NULL,
        unit VARCHAR(20) NOT NULL,

        PRIMARY KEY (parameterId),
        FOREIGN KEY (phaseId) REFERENCES process_phase(phaseId) ON DELETE CASCADE,
        FOREIGN KEY (componentId) REFERENCES process_component(componentId) ON DELETE CASCADE
);
`;


const sql_create_blockchain = `
  CREATE TABLE blockchain(
    id SERIAL NOT NULL,
    processid INT NOT NULL ,
    transactionId VARCHAR(200) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (processid) REFERENCES process(processid) ON DELETE CASCADE
  );
`;

const sql_create_component_with_params = `
    CREATE VIEW component_with_params as
     SELECT process_component.componentid,
    process_component.name,
    process_component.phaseid,
    ( SELECT json_agg(parameter.*) AS json_agg
           FROM parameter
          WHERE process_component.componentid = parameter.componentid) AS params
   FROM process_component
   ORDER BY process_component.componentid;
`;

const sql_create_phase_with_components = `
  CREATE VIEW phase_with_components as
  SELECT process_phase.phaseid,
         process_phase.name,
         process_phase.description,
         process_phase.location,
         process_phase.processid,
         ( SELECT json_agg(component_with_params.*) AS json_agg
           FROM component_with_params
           WHERE component_with_params.phaseid = process_phase.phaseid) AS components,
         ( SELECT json_agg(parameter.*) AS json_agg
           FROM parameter
           WHERE parameter.phaseid = process_phase.phaseid) AS params
  FROM process_phase
  ORDER BY process_phase.phaseid;
`;

const sql_create_process_with_phases = `
  
CREATE VIEW process_with_phases as
  SELECT 
    batch.batchid,
    process.processid,
    process.name,
    process.description,
    process.userid,
    process.verification,
    batch.start_datetime,
    batch.end_datetime,
    batch.activePhaseId,
    ( SELECT json_agg(json_build_object(
      'phaseid', phase_with_components.phaseid,
      'name', phase_with_components.name,
      'description', phase_with_components.description,
      'location', phase_with_components.location,
      'start_datetime', batch_phases.start_datetime, 
      'end_datetime', batch_phases.end_datetime,
      'processid', phase_with_components.processid,
      'params', phase_with_components.params,
      'components', phase_with_components.components
    )) AS json_agg
          FROM phase_with_components LEFT JOIN batch_phases ON phase_with_components.phaseid=batch_phases.phaseid AND batch_phases.batchid=batch.batchid
          WHERE phase_with_components.processid = process.processid) AS phases,
    ( SELECT json_agg(parameter.*) AS json_agg
          FROM parameter
          WHERE parameter.processid = process.processid) AS params
  FROM process left join batch using(processid);
`;

const sql_create_user_combined = `
  CREATE VIEW user_combined as
  SELECT *
   FROM user_data LEFT JOIN user_person using(userid) LEFT JOIN user_company using(userid);
`;

let tables = [
  sql_create_user,
  sql_create_user_company,
  sql_create_user_person,
  sql_create_process,
  sql_create_process_phase,
  sql_create_process_batch,
  sql_create_process_batch_phases,
  sql_create_fav_templates,
  sql_create_process_component,
  sql_create_parameter,
  sql_create_parameter_log,
  sql_create_blockchain,
  sql_create_reports
];

let views = [
  sql_create_component_with_params,
  sql_create_phase_with_components,
  sql_create_process_with_phases,
];

let table_names = [
  "user_data",
  "user_company",
  "user_person",
  "process",
  "process_phase",
  "batch",
  "batch_phases",
  "favorite_templates",
  "process_component",
  "parameter",
  "parameter_log",
  "blockchain",
  "reports",
];

let views_names = [
  "component_with_params",
  "phase_with_components",
  "process_with_phases",
];

(async () => {
  console.log("DROPING TABLES");
  for (let i = 0; i < tables.length; i++) {
    console.log("Droping table " + table_names[i] + ".");
    try {
      await pool.query(`DROP TABLE IF EXISTS ${table_names[i]} CASCADE;`, []);
      console.log("Table " + table_names[i] + " droped.");
    } catch (err) {
      console.log("Error droping table " + table_names[i]);
      return console.log(err.message);
    }
  }

  console.log("Creating tables");
  for (let i = 0; i < tables.length; i++) {
    console.log("Creating table " + table_names[i] + ".");
    try {
      await pool.query(tables[i], []);
      console.log("Table " + table_names[i] + " created.");
    } catch (err) {
      console.log("Error creating table " + table_names[i]);
      return console.log(err.message);
    }
  }

  for (let i = 0; i < views.length; i++) {
    try {
      await pool.query(views[i], []);
      console.log("View " + views_names[i] + " created");
    } catch (err) {
      console.log("Error creating table " + views_names[i]);
      return console.log(err.message);
    }
  }

  await pool.end();
})`

`;

