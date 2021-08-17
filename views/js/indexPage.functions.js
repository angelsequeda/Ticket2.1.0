import { Renderizer } from "./renderizers.js";
import {RetrieveData} from "./senddata.js"


let allOurPeople = await RetrieveData.getEveryone(JSON.parse(sessionStorage.getItem('useractive')).token);
if(!allOurPeople.result) {
    alert(allOurPeople.message);
} else {
    allOurPeople.result.teclers.forEach((element) => {
        console.log(element.username);
        Renderizer.createCards(element.name,'Teclersdivision',null,element.idTecler,element.profilePhoto);
        document.getElementById(element.idTecler).addEventListener('click',async ()=> {
            let result = await RetrieveData.getAnotherTecler(element.username);
            Renderizer.openform('tecler',result.tecler);
        })
    });
    
    allOurPeople.result.evaluators.forEach((element) => {
        Renderizer.createCards(element.name,'Evaluatorsdivision',null,element.idEvaluator,element.profilePhoto);
    });
    
    allOurPeople.result.companies.forEach((element) => {
        Renderizer.createCards(element.name,'Companydivision',null,element.idCompanyUser,element.profilePhoto);
    })
}

