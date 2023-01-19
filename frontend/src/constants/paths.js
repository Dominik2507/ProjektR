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
    LOGIN_URL: "http://localhost:3001/login",
    SIGNUP_URL:"http://localhost:3001/registration",
    ONE_PROCESS: "http://localhost:3001/process",
    ALL_PROCESSES:"http://localhost:3001/process/all",
    ALL_USER_PROCESSES: "http://localhost:3001/process/byUser",
    ALL_FAV_PROCESSES_CRUD: "http://localhost:3001/favprocess",
    ALL_FAV_USER_PROCESSES_CRUD: "http://localhost:3001/favprocess/user",
    VIEW_PROCESS: "http://localhost:3001/processView",
    GET_PROCESS_BY_ID: "http://localhost:3001/process/byId",
    CREATE_PROCESS: "http://localhost:3001/process/create",
    LOG: "http://localhost:3001/log"
}
