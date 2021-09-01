const fs = require("fs")

const User = {
    filename: "../data/usuarios.json",

    getData: function(){
        return JSON.parse(fs.readFileSync(this.filename, "utf-8"));
    },

    findAll: function() {
        return this.getData();
    },

    generateID: function() {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser) {
        return lastUser.id + 1;
        }
        return 1;
    },

    create: function (userData){
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateID(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.filename, JSON.stringify(allUsers,null, " "));
        return newUser;

    }

}

module.exports = User;