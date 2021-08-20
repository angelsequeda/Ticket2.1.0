import { Renderizer } from "./renderizers.js";
import {RetrieveData} from "./senddata.js"

console.log(JSON.parse(sessionStorage.getItem('useractive')));
let allOurPeople = await RetrieveData.getEveryone(JSON.parse(sessionStorage.getItem('useractive')).token);
console.log(allOurPeople);
if(!allOurPeople.result) {
    alert(allOurPeople.message);
} else {
    allOurPeople.result.teclers.forEach((element) => {
        Renderizer.createCards(element.name,'Teclersdivision',null,element.idTecler,element.profilePhoto);
        document.getElementById(element.idTecler).addEventListener('click',async ()=> {
            let result = await RetrieveData.getAnotherTecler(element.username);
            console.log(result);
            Renderizer.openform('tecler',result.tecler);
            result.extraInfo.studies.forEach((element)=> {
                Renderizer.addRowTotable('tableStudies',`studyRow${document.getElementById('tableStudies').rows.length}`,'afterbegin',`Estudié ${element.what} por ${element.howLong} años en ${element.location}`)
            });
            result.extraInfo.lenguages.forEach((element) => {
                Renderizer.addRowTotable("tableLenguages",`lenguageRow${document.getElementById('tableLenguages').rows.length}`,'afterbegin',`Estudié ${element.lenguage} por ${element.howLong} años en ${element.location} y obtuve ${element.degree}`);
            });
            result.extraInfo.hobbies.forEach((element) => {
                Renderizer.addRowTotable('tableHobbies',`hobbieRow${document.getElementById('tableHobbies').rows.length}`,'afterbegin',`A mi me gusta ${element.hobbie}, en donde he aprendido ${element.tellSomething}`);
            });
            result.extraInfo.socials.forEach((element) => {
                Renderizer.addRowTotable('tableSocials',`socialRow${document.getElementById('tableSocials').rows.length}`,'afterbegin',`Puedes encntrarme en: <a href="${element.link}" style ="color:black">${element.SocialMedia}</a>`);
            });
            result.extraInfo.habilities.forEach((element) => {
                Renderizer.addRowTotable('tableHabilities',`habilityRow${document.getElementById('tableHabilities').rows.length}`,'afterbegin',`${element.what}`);
            });
            if(!document.getElementById(`doEvaluationButton`).hidden) {
                document.getElementById('doEvaluationButton').addEventListener('click', ()=> {
                    Renderizer.openFirstEvaluationForm(1);
                    document.getElementById('buttonknowledgeEvaluationStart').addEventListener('click', ()=> {
                        Renderizer.openFirstEvaluationForm(2,'knowledge',element.username,JSON.parse(sessionStorage.getItem('useractive')).data.username,element.idTecler,JSON.parse(sessionStorage.getItem('useractive')).data.idEvaluator,JSON.parse(sessionStorage.getItem('useractive')).token);
                    });
                    document.getElementById('buttontechnologyEvaluationStart').addEventListener('click', ()=> {
                        Renderizer.openFirstEvaluationForm(2,'technology',element.username,JSON.parse(sessionStorage.getItem('useractive')).data.username,element.idTecler,JSON.parse(sessionStorage.getItem('useractive')).data.idEvaluator,JSON.parse(sessionStorage.getItem('useractive')).token);
                    });
                    document.getElementById('buttonperformanceEvaluationStart').addEventListener('click', ()=> {

                        Renderizer.openFirstEvaluationForm(2,'performance',element.username,JSON.parse(sessionStorage.getItem('useractive')).data.username,element.idTecler,JSON.parse(sessionStorage.getItem('useractive')).data.idEvaluator,JSON.parse(sessionStorage.getItem('useractive')).token)
                    });
                    document.getElementById('buttonsoftSkillEvaluationStart').addEventListener('click', ()=> {

                        Renderizer.openFirstEvaluationForm(2,'soft',element.username,JSON.parse(sessionStorage.getItem('useractive')).data.username,element.idTecler,JSON.parse(sessionStorage.getItem('useractive')).data.idEvaluator,JSON.parse(sessionStorage.getItem('useractive')).token)
                    });
                    document.getElementById('buttonprofesionalEvaluationStart').addEventListener('click', ()=> {

                        Renderizer.openFirstEvaluationForm(2,'profesional',element.username,JSON.parse(sessionStorage.getItem('useractive')).data.username,element.idTecler,JSON.parse(sessionStorage.getItem('useractive')).data.idEvaluator,JSON.parse(sessionStorage.getItem('useractive')).token)
                    });
                })
            };
        })
    });
    
    allOurPeople.result.evaluators.forEach((element) => {
        Renderizer.createCards(element.name,'Evaluatorsdivision',null,element.idEvaluator,element.profilePhoto);
        document.getElementById(element.idEvaluator).addEventListener('click', ()=> {
            Renderizer.openform('evaluator',element);
        })
    });
    
    allOurPeople.result.companies.forEach((element) => {
        Renderizer.createCards(element.name,'Companydivision',null,element.idCompanyUser,element.profilePhoto);
        document.getElementById(element.idCompanyUser).addEventListener('click', ()=> {
            Renderizer.openform('company',element);
        })
    })
}

