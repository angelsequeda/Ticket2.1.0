//Para el perfil de un evaluador estas son las funciones necesarias
import { Renderizer } from "./renderizers.js";
import { DeleteData, RetrieveData } from "./senddata.js";

//Se busa a las evaluaciones realizadas por el evaluador
let evaluations = await RetrieveData.getEvaluations(JSON.parse(sessionStorage.getItem('useractive')).token);
console.log(evaluations);


let userActive = JSON.parse(sessionStorage.getItem('useractive'));
console.log(userActive);
document.getElementById('formContainer').style.display = 'none';

if(userActive){
    //Se llenan los espacios del perfil
    document.getElementById('usernameprofileEvaluator').value = userActive.data.username;
    document.getElementById('mailprofileEvaluator').value = userActive.data.mail;
    document.getElementById('tellUsSomethingprofileEvaluator').value = userActive.data.tellUsSomething;
    document.getElementById('nameprofileEvaluator').value = userActive.data.username;
    document.getElementById('jobprofileEvaluator').value = userActive.data.job;
    document.getElementById('passwordprofileEvaluator').value = userActive.data.password;

    //Por cada evaluacion de conocimientos se agreaga un nuevo parrafo que permite ver la evaluacion y actualizarla o borrarla
    //Lo mismo ocurre con todas las demas evaluaciones (despempeño, entorno profesional, etc.)
    evaluations.result.knowledges.forEach((element) => {
        let rows = document.getElementById('evaluationstable').rows.length;
        //Ver clase renderizer
        Renderizer.addRowTotable('evaluationstable', `evaluationRow${rows}`,'afterbegin',`Evaluacion de conocimientos de ${element.nameto} <button id="knowledgeof${element.towho}" type="button">Ver</button><button id="knowledgeDeleteof${element.towho}">Eliminar</button>`);
        document.getElementById(`knowledgeof${element.towho}`).addEventListener('click', async ()=> {
            Renderizer.openEvaluationFormforUpdate(element,'knowledge');
            document.getElementById('buttonEditEvaluation').addEventListener('click',()=> {
                Renderizer.disDisabledMany(['inputAPIS','inputDatabase','inputObjectTeory',"inputSecurity","inputTesting","buttonAcceptEvaluationUpdate"]);
                document.getElementById('buttonAcceptEvaluationUpdate').addEventListener(`click`, async()=> {
                    
                })
            });
        });
        document.getElementById(`knowledgeDeleteof${element.towho}`).addEventListener('click',async ()=> {
            let confirmation = window.confirm('¿Seguro que desea borrar la evaluación de conocimientos de ' + `${element.nameto}?`);
            if(confirmation){
                let result = await DeleteData.deleteEvaluation(userActive.token,userActive.data.idEvaluator,element.towho,'knowledge');
                document.getElementById(`evaluationRow${rows}`).remove();
            }
        });
    });
    evaluations.result.technologies.forEach((element) => {
        let rows = document.getElementById('evaluationstable').rows.length;
        Renderizer.addRowTotable('evaluationstable', `evaluationRow${rows}`,'afterbegin',`Evaluacion de tecnologías de ${element.nameto} <button id="technologyof${element.towho}" type="button">Ver</button><button id="technologyDeleteof${element.towho}">Eliminar</button>`);
        document.getElementById(`technologyof${element.towho}`).addEventListener('click',()=> {
            Renderizer.openEvaluationFormforUpdate(element,'technology');
            document.getElementById('buttonEditEvaluation').addEventListener('click',()=> {
                Renderizer.disDisabledMany(['inputFrontend', 'inputJavascript', 'inputNodejs', 'inputSwagger', 'buttonAcceptEvaluationUpdate']);
            });
        });

        document.getElementById(`technologyDeleteof${element.towho}`).addEventListener('click', async()=> {
            let confirmation = window.confirm('¿Seguro que desea borrar la evaluación de tecnologías de ' + `${element.nameto}?`);
            if(confirmation){
                await DeleteData.deleteEvaluation(userActive.token,userActive.data.idEvaluator,element.towho,'technology');
                document.getElementById(`evaluationRow${rows}`).remove();
            }
        });
    });
    evaluations.result.performance.forEach((element) => {
        let rows = document.getElementById('evaluationstable').rows.length;
        Renderizer.addRowTotable('evaluationstable', `evaluationRow${rows}`,'afterbegin',`Evaluacion de desempeño de ${element.nameto} <button id="performanceof${element.towho}" type="button">Ver</button><button id="performanceDeleteof${element.towho}">Eliminar</button>`);
        document.getElementById(`performanceof${element.towho}`).addEventListener('click', async()=> {
            Renderizer.openEvaluationFormforUpdate(element,'performance');
            document.getElementById('buttonEditEvaluation').addEventListener('click',()=> {
            Renderizer.disDisabledMany(['inputCodePerformance','inputCodeQuality','inputSpeed','buttonAcceptEvaluationUpdate']);
            })
        });
        document.getElementById(`performanceDeleteof${element.towho}`).addEventListener('click',async()=> {
            let confirm = window.confirm('¿Seguro que desea borrar la evaluación de Desempeño de '+`${element.nameto}?`)
            await DeleteData.deleteEvaluation(userActive.token,userActive.data.idEvaluator,element.towho,'performance');
            document.getElementById(`evaluationRow${rows}`).remove();
        });
        
    });
    evaluations.result.softskills.forEach((element) => {
        let rows = document.getElementById('evaluationstable').rows.length;
        Renderizer.addRowTotable('evaluationstable', `evaluationRow${rows}`,'afterbegin',`Evaluacion de habilidades blandas de ${element.nameto} <button id="softskillof${element.towho}" type="button">Ver</button><button id="softskillDeleteof${element.towho}">Eliminar</button>`);
        document.getElementById(`softskillof${element.towho}`).addEventListener('click', ()=> {
            Renderizer.openEvaluationFormforUpdate(element,'softskills');
            document.getElementById('buttonEditEvaluation').addEventListener('click',()=> {
                Renderizer.disDisabledMany(['inputcommunication','inputcompromise','inputfocus','inputlearningSkill','inputproblemResolution','inputteamWork','buttonAcceptEvaluationUpdate']);
            });
        });
        document.getElementById(`softskillDeleteof${element.towho}`).addEventListener('click',async()=> {
            let confirm = window.confirm('¿Seguro que desea borrar la evaluación de Hbilidades blandas de '+`${element.nameto}?`);
            if(confirm) {
                await DeleteData.deleteEvaluation(userActive.token,userActive.data.idEvaluator,element.towho,'softskills');
                document.getElementById(`evaluationRow${rows}`).remove();
            };
            
        });
    });
    evaluations.result.profesional.forEach((element) => {
        let rows = document.getElementById('evaluationstable').rows.length;
        Renderizer.addRowTotable('evaluationstable', `evaluationRow${rows}`,'afterbegin',`Evaluacion de entorno profesional de ${element.nameto} <button id="profesionalof${element.towho}" type="button">Ver</button><button id="profesionalDeleteof${element.towho}">Eliminar</button>`);
        document.getElementById(`profesionalof${element.towho}`).addEventListener('click' , ()=> {
            Renderizer.openEvaluationFormforUpdate(element,'profesional');
            document.getElementById(`buttonEditEvaluation`).addEventListener('click', ()=> {
                Renderizer.disDisabledMany([`inputSlack`,`inputgithub`,`inputagile`,`inputtrello_jira`,`buttonAcceptEvaluationUpdate`]);
            });
        })
        
        document.getElementById(`profesionalDeleteof${element.towho}`).addEventListener('click', async()=> {

            let confirm = window.confirm('¿Seguro que desea borrar la evaluación de Entorno Profesional de '+ `${element.nameto}`);
            if(confirm) {
                await DeleteData.deleteEvaluation(userActive.token,userActive.data.idEvaluator,element.towho,'profesional');
                document.getElementById(`evaluationRow${rows}`).remove();
            }
        })
    })
}