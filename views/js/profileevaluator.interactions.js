import { Renderizer } from "./renderizers.js";
import { DeleteData, RetrieveData } from "./senddata.js";

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

    evaluations.result.knowledges.forEach((element) => {
        let rows = document.getElementById('evaluationstable').rows.length;
        Renderizer.addRowTotable('evaluationstable', `evaluationRow${rows}`,'afterbegin',`Evaluacion de conocimientos de ${element.nameto} <button id="knowledgeof${element.towho}" type="button">Ver</button>`);
        document.getElementById(`knowledgeof${element.towho}`).addEventListener('click', async ()=> {
            let result = await DeleteData.deleteEvaluation(userActive.token,userActive.data.idEvaluator,element.towho,'knowledge');
            document.getElementById(`evaluationRow${rows}`).remove();
        })
    });
    evaluations.result.technologies.forEach((element) => {
        let rows = document.getElementById('evaluationstable').rows.length;
        Renderizer.addRowTotable('evaluationstable', `evaluationRow${rows}`,'afterbegin',`Evaluacion de tecnologías de ${element.nameto} <button id="technologyof${element.towho}" type="button">Ver</button>`);
        document.getElementById(`technologyof${element.towho}`).addEventListener('click', async()=> {
            let result = await DeleteData.deleteEvaluation(userActive.token,userActive.data.idEvaluator,element.towho,'technology');
            document.getElementById(`evaluationRow${rows}`).remove();
        })
    });
    evaluations.result.performance.forEach((element) => {
        let rows = document.getElementById('evaluationstable').rows.length;
        Renderizer.addRowTotable('evaluationstable', `evaluationRow${rows}`,'afterbegin',`Evaluacion de desempeño de ${element.nameto} <button id="performanceof${element.towho}" type="button">Ver</button>`);
        document.getElementById(`performanceof${element.towho}`).addEventListener('click', async()=> {
            let result = await DeleteData.deleteEvaluation(userActive.token,userActive.data.idEvaluator,element.towho,'performance');
            document.getElementById(`evaluationRow${rows}`).remove();
        });
    });
}