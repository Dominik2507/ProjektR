class User{
    constructor({email,firstName="",lastName="",password,repeatPassword, type, name="", ceo=""}){
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.repeatPassword = repeatPassword;
        this.type=type;
        this.name=name;
        this.ceo=ceo;
    }
}

export default User;