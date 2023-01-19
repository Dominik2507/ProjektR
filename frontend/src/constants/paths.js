const SERVER_URL="http://localhost:3001"

export const routes = {
    HOMEPAGE_URL: "/",
    CREATE_PROCESS_URL: "/createProcess",
    USER_REGISTRATION_URL: "/registration",
    USER_LOGIN_URL: "/login",
    PROFILE_URL: "/profile",
    NOT_FOUND: "*",
    PROCESS_ALL: "/processAll",
    PROCESS_BY_ID: "/processAll/process/:id",
    PROCESS_VIEW: "/processView"

};

export const backend_paths = {
    LOGIN_URL: `${SERVER_URL}/login`,
    SIGNUP_URL:`${SERVER_URL}/registration`,
    ONE_PROCESS: `${SERVER_URL}/process`,
    ALL_PROCESSES:`${SERVER_URL}/process/all`,
    ALL_USER_PROCESSES: `${SERVER_URL}/process/byUser`,
    ALL_FAV_PROCESSES_CRUD: `${SERVER_URL}/favprocess`,
    ALL_FAV_USER_PROCESSES_CRUD: `${SERVER_URL}/favprocess/user`,
    VIEW_PROCESS: `${SERVER_URL}/processView`,
    GET_PROCESS_BY_ID: `${SERVER_URL}/process/byId`,
    CREATE_PROCESS: `${SERVER_URL}/process/create`,
    LOG: `${SERVER_URL}/log`,
    START_FIRST_PHASE:`${SERVER_URL}/cardano/beginFirstPhase`,
    START_NEXT_PHASE: `${SERVER_URL}/cardano/advancePhase`,
    END_LAST_PHASE: `${SERVER_URL}/cardano/endLastPhase`,
    HASH: `${SERVER_URL}/cardano/getProcessHash`
}

