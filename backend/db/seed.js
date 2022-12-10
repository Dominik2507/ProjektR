const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "processManager",
  password: "bazepodataka",
  port: 5432,
});

const sql_create_user = `
  CREATE TABLE user_data(
    userId SERIAL NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (userId),
    UNIQUE (email)
);
`;

const sql_create_process = `
    
    CREATE TABLE process(
        processId SERIAL NOT NULL,
        name VARCHAR(50) NOT NULL,
        start_datetime TIMESTAMP NOT NULL,
        end_datetime TIMESTAMP NOT NULL,
        description VARCHAR(200) NOT NULL,
        userId INT NOT NULL,
        PRIMARY KEY (processId),
        FOREIGN KEY (userId) REFERENCES user_data(userId)
);
`;

const sql_create_process_phase = `
    
    CREATE TABLE process_phase(
        phaseId SERIAL NOT NULL,
        start_datetime TIMESTAMP NOT NULL,
        end_datetime TIMESTAMP NOT NULL,
        description VARCHAR(200) NOT NULL,
        active CHAR(1) NOT NULL,
        processId INT NOT NULL,
        PRIMARY KEY (phaseId),
        FOREIGN KEY (processId) REFERENCES process(processId)
);
`;

const sql_create_fav_templates = `

    CREATE TABLE favorite_templates(
        processId INT NOT NULL,
        userId INT NOT NULL,
        PRIMARY KEY (processId,userId),
        FOREIGN KEY (userId) REFERENCES user_data(userId),
        FOREIGN KEY (processId) REFERENCES process(processId)
    );
`;

const sql_create_process_component = `
    
    CREATE TABLE process_component(
        componentId SERIAL NOT NULL,
        name VARCHAR(50) NOT NULL,
        phaseId INT NOT NULL,
        has_componentId INT,
        PRIMARY KEY (componentId),
        FOREIGN KEY (phaseId) REFERENCES process_phase(phaseId),
        FOREIGN KEY (has_componentId) REFERENCES process_component(componentId)
);
`;

const sql_create_parameter_log = `
    
    CREATE TABLE parameter_log(
        logId SERIAL NOT NULL,
        value VARCHAR(200) NOT NULL,
        datetime TIMESTAMP NOT NULL,
        parameterId INT NOT NULL,
        PRIMARY KEY (logId),
        FOREIGN KEY (parameterId) REFERENCES parameter(parameterId)
);
`;

const sql_create_parameter = `
    
    CREATE TABLE parameter(
        phaseId INT,
        processId INT,
        componentId INT,
        parameterId SERIAL NOT NULL,
        max_value VARCHAR(200),
        min_value VARCHAR(200),
        name VARCHAR(50) NOT NULL,
        unit VARCHAR(20) NOT NULL,

        PRIMARY KEY (parameterId),
        FOREIGN KEY (phaseId) REFERENCES process_phase(phaseId),
        FOREIGN KEY (componentId) REFERENCES process_component(componentId)
);
`;

//TODO: fix

const sql_create_sessions = `
CREATE TABLE session (
    sid varchar NOT NULL COLLATE "default",
    sess json NOT NULL,
    expire timestamp(6) NOT NULL
  )
  WITH (OIDS=FALSE);`;

const sql_create_session_index1 = `
    ALTER TABLE session ADD CONSTRAINT session_pkey 
    PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;
`;

const sql_create_session_index2 = `
CREATE INDEX IDX_session_expire ON session(expire);
`;

let tables = [
  sql_create_user,
  sql_create_process,
  sql_create_process_phase,
  sql_create_fav_templates,
  sql_create_process_component,
  sql_create_parameter,
  sql_create_parameter_log,
  sql_create_sessions,
];

let table_names = [
  "user_data",
  "process",
  "process_phase",
  "favorite_templates",
  "process_component",
  "parameter",
  "parameter_log",
  "sessions",
];

let indexes = [sql_create_session_index1, sql_create_session_index2];

(async () => {
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

  console.log("Creating indexes");
  for (let i = 0; i < indexes.length; i++) {
    try {
      await pool.query(indexes[i], []);
      console.log("Index " + i + " created.");
    } catch (e) {
      console.log("Failed to create index " + i + ".");
      return console.log(e.message);
    }
  }

  await pool.end();
})`

`;
