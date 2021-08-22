//Estas son las funciones que renderizan y dan animacion a la pagina principal 
import { Renderizer } from "./renderizers.js";
import {RetrieveData, Savedata} from "./senddata.js"

//El usuario se guarda en un sessionStorage como useractive (solo la informacio de usuario y contraseña)
console.log(JSON.parse(sessionStorage.getItem('useractive')));
//Se buscan todos los usuarios 
let allOurPeople = await RetrieveData.getEveryone(JSON.parse(sessionStorage.getItem('useractive')).token);
console.log(allOurPeople);
if(!allOurPeople.result) {
    alert(allOurPeople.message);
} else {
    //Se renderizan tarjetas para cada uno de los usuarios dependiendo de su role
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
            if(!document.getElementById('commentButton').hidden){
                document.getElementById('commentButton').addEventListener('click', ()=> {
                    Renderizer.openFirstEvaluationForm(2,'comment',element.username,JSON.parse(sessionStorage.getItem('useractive')).data.username,element.idTecler,JSON.parse(sessionStorage.getItem('useractive')).data.idEvaluator || JSON.parse(sessionStorage.getItem('useractive')).data.idTecler,JSON.parse(sessionStorage.getItem('useractive')).token);
                })
            }
            if(!document.getElementById(`makeFriendButton`).hidden) {
                document.getElementById('makeFriendButton').addEventListener('click',async ()=> {
                    let result = await Savedata.sendNewFriendRequest(JSON.parse(sessionStorage.getItem('useractive')).data.idTecler || JSON.parse(sessionStorage.getItem('useractive')).data.idEvaluator,element.idTecler,JSON.parse(sessionStorage.getItem('useractive')).data.username,element.username, JSON.parse(sessionStorage.getItem('useractive')).token);
                    if(result.message === 'correcto'){
                        alert('nuevo amigo pendiente');
                    }else {
                        alert(result.message);
                    }
                })
            };
            if(!document.getElementById('employeeOferButton').hidden){
                document.getElementById('employeeOferButton').addEventListener('click', ()=> {
                    Renderizer.openFirstEvaluationForm(2,'offer',element.username,JSON.parse(sessionStorage.getItem('useractive')).data.username,element.idTecler,JSON.parse(sessionStorage.getItem('useractive')).data.idCompanyUser,JSON.parse(sessionStorage.getItem('useractive')).token);
                    document.getElementById('sendOferButton').addEventListener('click', async()=> {
                        let result = await Savedata.sendNewOffer(element.username,JSON.parse(sessionStorage.getItem('useractive')).data.username,JSON.parse(sessionStorage.getItem('useractive')).data.idCompanyUser,element.idTecler,document.getElementById('salaryinput').value,document.getElementById('jobinput').value,document.getElementById('offerinput').value,JSON.parse(sessionStorage.getItem('useractive')).token)
                        if(result.message === "correcto"){
                            alert('Propuesta enviada');
                            document.getElementById('evaluationForm').style.display = 'none';
                            document.getElementById('evaluationForm').innerHTML ="";
                        }else{
                            alert(result.message)
                        }
                    })
                })
            }
        })
    });
    
    allOurPeople.result.evaluators.forEach((element) => {
        Renderizer.createCards(element.name,'Evaluatorsdivision',null,element.idEvaluator,element.profilePhoto);
        document.getElementById(element.idEvaluator).addEventListener('click', ()=> {
            Renderizer.openform('evaluator',element);
            if(!document.getElementById('commentButton').hidden){
                document.getElementById('commentButton').addEventListener('click', ()=> {
                    Renderizer.openFirstEvaluationForm(2,'comment',element.username,JSON.parse(sessionStorage.getItem('useractive')).data.username,element.idEvaluator,JSON.parse(sessionStorage.getItem('useractive')).data.idEvaluator || JSON.parse(sessionStorage.getItem('useractive')).data.idTecler,JSON.parse(sessionStorage.getItem('useractive')).token);
                })
            }
        })
        
    });
    
    allOurPeople.result.companies.forEach((element) => {
        Renderizer.createCards(element.name,'Companydivision',null,element.idCompanyUser,element.profilePhoto);
        document.getElementById(element.idCompanyUser).addEventListener('click', ()=> {
            Renderizer.openform('company',element);
        })
    })
}

if(JSON.parse(sessionStorage.getItem('useractive')).data.idTecler){
    document.getElementById('profileRef').setAttribute('href','../html/profiletecler.html');
}else if(JSON.parse(sessionStorage.getItem('useractive')).data.idEvaluator){
    document.getElementById('profileRef').setAttribute('href','../html/profileevaluator.html');
}else if(JSON.parse(sessionStorage.getItem('useractive')).data.idCompanyUser){
    document.getElementById('profileRef').setAttribute('href','../html/profilecompany.html');
};

document.getElementById('closeSession').addEventListener('click', ()=> {
    sessionStorage.clear();
})