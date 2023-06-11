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
    PROCESS_VIEW: "/processView",
    ADMIN_HOME: "/admin",
    ADMIN_PROCESS_ALL: "/admin/process",
    ADMIN_USERS_ALL: "/admin/users",
    ADMIN_REPORTS_ALL: "/admin/reports",
    ADMIN_ONE_PROCESS: "/admin/process/:id",
    ADMIN_ONE_USER: "/admin/user/:id"

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
    HASH: `${SERVER_URL}/cardano/getProcessHash`,
    ALL_USERS: `${SERVER_URL}/user/all`,
    GET_USER_BY_ID: `${SERVER_URL}/user/byId`,
    START_NEW_BULK: `${SERVER_URL}/process/bulk/new`,
    CREATE_NEW_REPORT: `${SERVER_URL}/report/add`,
    ALL_REPORTS: `${SERVER_URL}/report/all`,
    GET_REPORT_BY_ID: `${SERVER_URL}/report/byId`,
    RESOLVE_REPORT: `${SERVER_URL}/report/resolve`
}

