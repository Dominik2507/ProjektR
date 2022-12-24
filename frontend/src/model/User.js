class User{
    constructor(email,firstName,lastName,password,repeatPassword){
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.repeatPassword = repeatPassword;
    }
}

export default User;