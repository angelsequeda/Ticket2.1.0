
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
        this.lenguages = data.lenguages,
        this.education = data.education,
        this.social = JSON.stringify([]),
        this.hobbies = data.hobbies

    }

    addLenguage(lenguage,experience) {
        let lenguages = JSON.parse(this.lenguages);
        lenguages.push({lenguage:lenguage,experience:experience});
        this.lenguages = JSON.stringify(lenguages);
    }

    addEducation(title,experience,degree) {
        let education = JSON.parse(this.education);
        education.push({title:title,experience:experience,degree:degree})
        this.education = JSON.stringify(education);
    }

    addSocial(title,link) {
        let social = JSON.parse(this.social);
        social.push({type:title,link:link});
        this.social = JSON.stringify(social);
    }

    addHobbies(title,experience) {
        let hobbies = JSON.parse(this.hobbies);
        hobbies.push ({title:title,experience:experience});
        this.hobbies = JSON.stringify(hobbies);
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