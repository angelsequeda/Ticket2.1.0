import { Savedata } from "./senddata.js"

export class Tecler {

    constructor(data){
        this.name = data.name,
        this.age = data.age,
        this.mail = data.mail,
        this.username = data.username,
        this.password = data.password,
        this.tellUsSomething = data.tellUsSomething,
        this.city = data.city,
        this.country = data.country,
        this.profilePhoto = data.profilePhoto,
        this.idTecler = data.idTecler
    }
    
    async saveTeclerChanges(token) {

        let result = await Savedata.updateTecler({data:this, token : token});
        return result
    }

    async saveTeclerExtraInfo(extraInfo,token) {
        let data = this;
        data.extraInfo = extraInfo
        let result = await Savedata.updateTecler({data: this, token: token});
    }
}

export class Company {

    constructor(data) {
        this.name = data.name,
        this.companyName = data.companyName,
        this.job = data.job,
        this.username = data.username,
        this.mail = data.mail,
        this.password = data.password,
        this.profilePhoto = data.profilePhoto
        this.role = data.role
    }

}

export class Evaluator {
    constructor(data) {

        this.name = data.name,
        this.profilePhoto = data.profilePhoto,
        this.tellUsSomething = data.tellUsSomething,
        this.username = data.username,
        this.password = data.password,
        this.job = data.job,
        this.mail = data.mail
        this.role = data.role
    }
}