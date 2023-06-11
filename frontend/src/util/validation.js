const emailRegex = new RegExp("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[a-z]{2,}$");

export const registerValidation = (user, type) => {
    let err = [];

    if(!emailRegex.test(user.email))
        err.push({
            name : "email",
            message : "Invalid email"
        });

    if(type == "personal" && user.firstName === "")
        err.push({
            name : "firstName",
            message : "First name empty"
        });

    if(type == "personal" &&  user.lastName === "")
        err.push({
            name : "lastName",
            message : "Last name empty"
        });

    if(type == "business" && user.name === "")
        err.push({
            name : "name",
            message : "First name empty"
        });

    if(type == "business" &&  user.ceo === "")
        err.push({
            name : "ceo",
            message : "Last name empty"
        });

    if(user.password.length < 8)
        err.push({
             name : "password",
             message: "Password must contain at least 8 characters"
            });

    if(user.repeatPassword !== user.password)
        err.push({
            name : "repeatPassword",
            message: "Passwords do not match"
        })


    return err;

}

export const loginValidation = (user) => {
    let err = [];

    if(!emailRegex.test(user.email))
        err.push({
            name : "email",
            message : "Invalid email"
        });

    return err;
}