const emailRegex = new RegExp("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[a-z]{2,}$");

export const registerValidation = (user) => {
    let err = [];

    if(!emailRegex.test(user.email))
        err.push({
            name : "email",
            message : "Invalid email"
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