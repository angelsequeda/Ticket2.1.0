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
        this.lenguages = [],
        this.education = [],
        this.social = {},
        this.hobbies = {}
    }

    addLenguage(lenguage,experience) {
        this.lenguages.push({name:lenguage,experience:experience});
    }

    addEducation(type,title,time,degree) {
        this.education.push({type:type,title:title,time:time,degree:degree});
    }
}