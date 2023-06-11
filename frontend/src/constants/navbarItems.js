export const navbarItems = [{
    path: "/",
    linkName: "Home"
}]

export const adminNavbarItems = [{
    path: "/admin",
    linkName: "Home"
},
{
    path: "/admin/users",
    linkName: "Users"
},
{
    path: "/admin/process",
    linkName: "Process list"
},
{
    path: "/admin/reports",
    linkName: "Reports"
}]

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
    path: "/createProcess",
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