export const navbarItems = [{
    path: "/",
    linkName: "Home"
}/*,{
    path: "/create",
    linkName: "Create process"
}*/]

export const notLoggedInItems = [{
    path: "/login",
    linkName: "Login"
},{
    path: "/registration",
    linkName: "Sign up"
}];

export const loggedInItems = [{
    path: "/profile",
    linkName: "Profile"
}, {
    path: "/logout",
    linkName: "Log out"
}];

export const processItemsLoggedIn = [{
    path: "/create",
    linkName: "Create Process"
}, {
    path: "/profile#my",
    linkName: "My process"
}, {
    path: "/processAll",
    linkName: "View all process"
}];

export const processItemsNotLoggedIn = [{
    path: "/processAll",
    linkName: "View all process"
}];