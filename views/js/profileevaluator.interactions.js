import { Renderizer } from "./renderizers.js";
import { RetrieveData } from "./senddata.js";

let evaluations = await RetrieveData.getEvaluations(JSON.parse(sessionStorage.getItem('useractive')).token);
console.log(evaluations);
let userActive = JSON.parse(sessionStorage.getItem('useractive'));
console.log(userActive);

if(userActive){
    document.getElementById('usernameprofileEvaluator').value = userActive.data.username;
    document.getElementById('mailprofileEvaluator').value = userActive.data.mail;
    document.getElementById('tellUsSomethingprofileEvaluator').value = userActive.data.tellUsSomething;
    document.getElementById('nameprofileEvaluator').value = userActive.data.username;
    document.getElementById('jobprofileEvaluator').value = userActive.data.job;
    document.getElementById('passwordprofileEvaluator').value = userActive.data.password;
    evaluations.knowledge.forEach((element) => {
        Renderizer.addRowTotable('tableEvaluations', `evaluationRow${document.getElementById('tableEvaluations').rows.length}`,'afterbegin',`Evaluacion de conocimientos de ${element.nameto} <button id="knowledgeof${element.towho}"></button>`);
    })
}