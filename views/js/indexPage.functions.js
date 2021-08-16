import { Renderizer } from "./renderizers.js";
import {RetrieveData} from "./senddata.js"


let allOurPeople = await RetrieveData.getEveryone(JSON.parse(sessionStorage.getItem('useractive')).token);
allOurPeople.result.teclers.forEach((element) => {
    Renderizer.createCards(element.name,'Teclersdivision',null,element.idTecler,element.profilePhoto);
});

allOurPeople.result.evaluators.forEach((element) => {
    Renderizer.createCards(element.name,'Evaluatorsdivision',null,element.idEvaluator,element.profilePhoto);
});

allOurPeople.result.companies.forEach((element) => {
    Renderizer.createCards(element.name,'Companydivision',null,element.idCompanyUser,element.profilePhoto);
})


