//En este archivo hay clases que ayudan a la renderizacion de cada pagina, asi como a recuperar la información de cada una

import { Savedata } from "./senddata.js";

export class Renderizer {

    //Añadir una fila a una cierta tabla con un contenido 
    //table : nombre de la tabla, name : nombre de la fila, criteria : 'afterbegin','beforebegin' dependiendo de lo que se requierea
    //inner : contenido de la fila a agreagar
    static  addRowTotable(table,name,criteria,inner) {
        let newRow = document.createElement('tr');
        newRow.id = name;
        document.getElementById(table).appendChild(newRow);
        document.getElementById(newRow.id).insertAdjacentHTML(criteria,inner);
    };

    //Eliminar ultima fila de una tabla por nombre, table : nombre de la tabla
    static  deleteRowFromTable(table){
        if(document.getElementById(table).rows.length > 1) {
            document.getElementById(table).lastChild.remove();
        }
        
    };

    //Como se teienen que salvar varios inputs de una tabla a objetos. saveDataFromInputs salva dichos datos a un objeto
    //tablename : nombre de la tabla, //list : una lista a la que se agregara cada objeto nuevo creado, 
    //keys : las claves del objeto a 
    //construir, inputs : los nombres de los inputs a usar
    static saveDataFromInputs(tablename,list,keys,inputs) {
        
        for (let index = 0; index < document.getElementById(tablename).rows.length-1; index++) {
            let result = {};
            for(let j=0 ; j< keys.length; j++) {
                result[keys[j]] = document.getElementById(`${inputs[j]}${index}`).value;
            }
            list.push(result);
        };
    };

    //Permite salvar los datos de varios inputs usando sus nombres en una lista y agregando su valor a otra lista a devvolver
    static saveDataFromInputsBynameToList(names) {
        let result =[];
        for (let index = 0; index < names.length; index++) {
            result.push(document.getElementById(names[index]).value);
        };
        return result;
    }

    //Crear las cartas para la indexpage dependiendo si es un tecler,un evaluador o un colaborador
    static createCards(name,where,extraInfo,id,foto) {
        let division = document.createElement('div');
        division.className = 'card';
        division.style = "width: 18rem; margin-bottom:20px; height: 20rem"
        division.insertAdjacentHTML('afterbegin',`<img class="card-img-top" src="${foto}" alt="Card image cap" style="height:100px; width: 100px">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <button class="btn btn-primary" id=${id}>Ver</button>
        </div>`);
        if (extraInfo) {
            document.getElementById(id).insertAdjacentHTML('beforebegin',`<p>${extraInfo}</p>`)
        };
        document.getElementById(where).appendChild(division);
    };

    //Abrir el formato con los datos de una persona en la pagina principal, dependiendo de si es un tecler, un evaluador o un colaborador
    static openform(role,data) {
        document.getElementById('formContainer').innerHTML = "";
        if(role === 'tecler'){
            document.getElementById('formContainer').insertAdjacentHTML('afterbegin', `
            <img src = "${data.profilePhoto}" class ="imageforFormUser" style="heigth : 100px; width: 100px"></img>
            <p>${data.username}</p>
            <p>"${data.tellUsSomething}"</p>
            <p>Nombre: ${data.name}</p>
            <p>Edad: ${data.age}</p>
            <p>Mail: ${data.mail}</p>
            <h4>Estudios</h4>
            <table id="tableStudies"></table>
            <h4>Lenguajes</h4>
            <table id="tableLenguages"></table>
            <h4>Hobbies</h4>
            <table id="tableHobbies"></table>
            <h4>Contacto</h4>
            <table id="tableSocials"></table>
            <h4>Otras habilidades</h4>
            <table id="tableHabilities"></table>
            <button id="evaluationsButton" style="margin-top: 10px">Ver evaluaciones</button>
            <button id="doEvaluationButton">Evaluar</button>
            <button id="commentButton">Hacer comentario</button>
            <button id ="employeeOferButton">Hacer oferta</button>
            <button id ="makeFriendButton">Solicitud de amistad</button>
            <button id = "closeForm">Cerrar</button>`);
            if(JSON.parse(sessionStorage.getItem('useractive')).data.idTecler) {
                document.getElementById('makeFriendButton').hidden = false;
                document.getElementById("evaluationsButton").hidden = true;
                document.getElementById('doEvaluationButton').hidden = true;
                document.getElementById('employeeOferButton').hidden = true;
                document.getElementById('commentButton').hidden = false;
            }else if((JSON.parse(sessionStorage.getItem('useractive')).data.idCompanyUser)){
                document.getElementById('makeFriendButton').hidden = true;
                document.getElementById("evaluationsButton").hidden = false;
                document.getElementById('doEvaluationButton').hidden = true;
                document.getElementById('employeeOferButton').hidden = false;
                document.getElementById('commentButton').hidden = true;
            }else {
                document.getElementById('makeFriendButton').hidden = true;
                document.getElementById("evaluationsButton").hidden = false;
                document.getElementById('doEvaluationButton').hidden = false;
                document.getElementById('employeeOferButton').hidden = true;
                document.getElementById('commentButton').hidden = false;
            }
        }else if(role === "evaluator") {
            document.getElementById('formContainer').insertAdjacentHTML('afterbegin',`
            <img src = "${data.profilePhoto}" class ="imageforFormUser" style="heigth : 100px; width: 100px"></img>
            <p>${data.username}</p>
            <p>"${data.tellUsSomething}"</p>
            <p>Nombre: ${data.name}</p>
            <p>Soy: ${data.job} en Tecla</p>
            <p>Mail: ${data.mail}</p>
            <button id="commentButton">Hacer comentario</button>
            <button id = "closeForm">Cerrar</button>`);
            if(JSON.parse(sessionStorage.getItem('useractive')).data.idTecler) {
                document.getElementById('commentButton').hidden = false;
            }else if((JSON.parse(sessionStorage.getItem('useractive')).data.idCompanyUser)){
                document.getElementById('commentButton').hidden = true;
            }else {
                document.getElementById('commentButton').hidden = false;
            }
        }else if(role === 'company'){
            document.getElementById('formContainer').insertAdjacentHTML('afterbegin', `
            <img src = "${data.profilePhoto}" class ="imageforFormUser" style="heigth : 100px; width: 100px"></img>
            <p>${data.username}</p>
            <p>Nombre: ${data.name}</p>
            <p>Soy: ${data.job} en ${data.companyName}</p>
            <p>Mail: ${data.mail}</p>
            <button id = "closeForm">Cerrar</button>
            `)
        }
        document.getElementById('closeForm').addEventListener('click', ()=> {
            document.getElementById('formContainer').style.display = 'none';
            document.getElementById('formContainer').innerHTML = "";
        });
        document.getElementById('formContainer').style.display = 'block';
    };

    //Abrir un formato para actualizar las evaluaciones hechas por un evaluador con sesion iniciada
    //data : los datos para llenar los espacios de los inputs
    //type :  depende de la evaluacion  a abrir
    //knowledge : conocimientos, technology :  tecnologias, performance : despempeño , softskills : habilidades blandas
    //profesional : entorno profesional
    static openEvaluationFormforUpdate(data,type) {
        document.getElementById('formContainer').innerHTML = "";
        if(type ==="knowledge"){
            document.getElementById('formContainer').insertAdjacentHTML('afterbegin',`
            <h3>Evaluación de conocimientos de ${data.nameto}</h3>
            <p>API's: <input type="number" id="inputAPIS" value ="${data.apis}" max="5" min="0" disabled> </p>
            <p>Bases de datos: <input type="number" id="inputDatabase" value ="${data.databaseKnowledge}" max="5" min="0" disabled></p>
            <p>Teoría de objetos:<input type="number" id="inputObjectTeory" value ="${data.objectTeory}" max="5" min="0" disabled> </p>
            <p>Seguridad:<input type="number" id="inputSecurity" value ="${data.security}" max="5" min="0" disabled> </p>
            <p>Testing:<input type="number" id="inputTesting" value ="${data.testing}" max="5" min="0" disabled></p>
            <button id="buttonEditEvaluation">Edit</button>
            <button id="buttonAcceptEvaluationUpdate" disabled>Aceptar</button>
            <button id="buttonCloseFormEvaluation">Cerrar</button>`);
        }else if(type === 'technology'){
            document.getElementById('formContainer').insertAdjacentHTML('afterbegin',`
            <h3>Evaluación de tecnologías de ${data.nameto}</h3>
            <p>Frontend: <input type="number" id="inputFrontend" value ="${data.frontend}" max="5" min="0" disabled> </p>
            <p>Javascript: <input type="number" id="inputJavascript" value ="${data.javascript}" max="5" min="0" disabled></p>
            <p>Nodejs:<input type="number" id="inputNodejs" value ="${data.nodejs}" max="5" min="0" disabled> </p>
            <p>Swagger:<input type="number" id="inputSwagger" value ="${data.swagger}" max="5" min="0" disabled> </p>
            <button id="buttonEditEvaluation">Edit</button>
            <button id="buttonAcceptEvaluationUpdate" disabled>Aceptar</button>
            <button id="buttonCloseFormEvaluation">Cerrar</button>`)
        }else if(type === "performance") {
            document.getElementById('formContainer').insertAdjacentHTML('afterbegin',`
            <h3>Evaluación de desempeño de ${data.nameto}</h3>
            <p>Eficiencia de código: <input type="number" id="inputCodePerformance" value ="${data.codePerformance}" max="5" min="0" disabled> </p>
            <p>Calidad de código: <input type="number" id="inputCodeQuality" value ="${data.codequality}" max="5" min="0" disabled></p>
            <p>Velocidad de entrega:<input type="number" id="inputSpeed" value ="${data.speed}" max="5" min="0" disabled> </p>
            <button id="buttonEditEvaluation">Edit</button>
            <button id="buttonAcceptEvaluationUpdate" disabled>Aceptar</button>
            <button id="buttonCloseFormEvaluation">Cerrar</button>
            `)
        }else if(type === "softskills") {
            document.getElementById('formContainer').insertAdjacentHTML('afterbegin',`
            <h3>Evaluación de Habilidades blandas de ${data.nameto}</h3>
            <p>Comunicación: <input type="number" id="inputcommunication" value ="${data.communication}" max="5" min="0" disabled> </p>
            <p>Comprometido:<input type="number" id="inputcompromise" value ="${data.compromise}" max="5" min="0" disabled> </p>
            <p>Enfocado: <input type="number" id="inputfocus" value ="${data.focus}" max="5" min="0" disabled></p>
            <p>Capacidad de aprendizaje:<input type="number" id="inputlearningSkill" value ="${data.learningSkill}" max="5" min="0" disabled> </p>
            <p>Resolución de problemas:<input type="number" id="inputproblemResolution" value ="${data.problemResolution}" max="5" min="0" disabled> </p>
            <p>Trabajo en equipo:<input type="number" id="inputteamWork" value ="${data.teamWork}" max="5" min="0" disabled> </p>
            <button id="buttonEditEvaluation">Edit</button>
            <button id="buttonAcceptEvaluationUpdate" disabled>Aceptar</button>
            <button id="buttonCloseFormEvaluation">Cerrar</button>
            `)
        }else if(type === "profesional") {
            document.getElementById('formContainer').insertAdjacentHTML('afterbegin',`
            <h3>Evaluación de entorno profesional de ${data.nameto}</h3>
            <p>Slack: <input type="number" id="inputSlack" value ="${data.Slack}" max="5" min="0" disabled> </p>
            <p>Github (versionado):<input type="number" id="inputgithub" value ="${data.github}" max="5" min="0" disabled> </p>
            <p>Trello/Jira: <input type="number" id="inputtrello_jira" value ="${data.trello_jira}" max="5" min="0" disabled></p>
            <p>Metodologías ágiles:<input type="number" id="inputagile" value ="${data.agile}" max="5" min="0" disabled> </p>
            <button id="buttonEditEvaluation">Edit</button>
            <button id="buttonAcceptEvaluationUpdate" disabled>Aceptar</button>
            <button id="buttonCloseFormEvaluation">Cerrar</button>
            `)
        }

        document.getElementById('buttonCloseFormEvaluation').addEventListener('click',()=> {
            document.getElementById('formContainer').innerHTML = "";
            document.getElementById('formContainer').style.display = 'none';
        });
        document.getElementById('formContainer').style.display = 'block';

    };

    //Abrir un formato para la primera evaluacion hecha a un tecler, se puede seleccionar el tipo d eevaluacion a hacer
    //stage : si es 1 abre la seleccion de evaluaciones, si es 2 abre la evaluacion
    //type : el tipo de evaluacion
    //namefrom : nombre del evaluador
    //nameto : nombre del tecler evaluado
    //fromwho : id del evaluador
    //towho : id del tecler evaluado
    //token : token del evaluador
    static openFirstEvaluationForm(stage,type,nameto,namefrom,towho,fromwho,token) {

        if(stage === 1){
            document.getElementById('evaluationForm').innerHTML = "";
            document.getElementById('evaluationForm').insertAdjacentHTML('afterbegin', `
            <h2>Seleccione su evaluación</h2>
            <button class ="buttons" id="buttonknowledgeEvaluationStart">Conocimientos</button>
            <button class ="buttons" id="buttonperformanceEvaluationStart">Desempeño</button>
            <button class ="buttons" id="buttonsoftSkillEvaluationStart">Habilidades blandas</button>
            <button class ="buttons" id="buttontechnologyEvaluationStart">Tecnologías</button>
            <button class ="buttons" id="buttonprofesionalEvaluationStart">Entorno profesional</button>
            <button class ="buttons" id="buttonCloseFirstEvaluationForm">Cerrar</button>
            `);
            document.getElementById('evaluationForm').style.display = "block";
            document.getElementById('buttonCloseFirstEvaluationForm').addEventListener('click', ()=> {
                document.getElementById('evaluationForm').innerHTML = "";
                document.getElementById('evaluationForm').style.display = "none";
            })
        }
        if(stage === 2) {
            document.getElementById('evaluationForm').innerHTML = "";
            if(type === 'knowledge'){
                document.getElementById(`evaluationForm`).insertAdjacentHTML('afterbegin', `<h3>Evaluación de conocimientos de ${nameto}</h3>
                <p>API's: <input type="number" id="inputAPIS" value ="" max="5" min="0"> </p>
                <p>Bases de datos: <input type="number" id="inputDatabase" value ="" max="5" min="0"></p>
                <p>Teoría de objetos:<input type="number" id="inputObjectTeory" value ="" max="5" min="0"> </p>
                <p>Seguridad:<input type="number" id="inputSecurity" value ="" max="5" min="0"> </p>
                <p>Testing:<input type="number" id="inputTesting" value ="" max="5" min="0"></p>
                <button id="buttonAcceptEvaluation" >Aceptar</button>
                <button id="buttonCloseEvaluationForm">Cerrar</button>` );
                document.getElementById('buttonAcceptEvaluation').addEventListener('click',async ()=> {
                    let knowledge = this.saveDataFromInputsBynameToList(["inputDatabase",'inputAPIS',"inputTesting","inputSecurity","inputObjectTeory"]);
                    let result = await Savedata.sendNewEvaluation({knowledge : knowledge,fromwho : fromwho,towho : towho,nameto : nameto, namefrom : namefrom},token);
                    if(result.message !=='correcto'){
                        alert(result.message);
                        document.getElementById('evaluationForm').innerHTML = "";
                        document.getElementById('evaluationForm').style.display = "none";
                    }else {
                        alert('Evaluación hecha, revisar perfil para revisión');
                        document.getElementById('evaluationForm').innerHTML = "";
                        document.getElementById('evaluationForm').style.display = "none";
                    }
                })
            }else if(type === "technology"){
                document.getElementById('evaluationForm').insertAdjacentHTML('afterbegin', `
                <h3>Evaluación de tecnologías de ${nameto}</h3>
                <p>Frontend: <input type="number" id="inputFrontend" value ="0" max="5" min="0"> </p>
                <p>Javascript: <input type="number" id="inputJavascript" value ="0" max="5" min="0"></p>
                <p>Nodejs:<input type="number" id="inputNodejs" value ="0" max="5" min="0"> </p>
                <p>Swagger:<input type="number" id="inputSwagger" value ="0" max="5" min="0"> </p>
                <button id="buttonAcceptEvaluation" >Aceptar</button>
                <button id="buttonCloseEvaluationForm">Cerrar</button>
                `);
                document.getElementById('buttonAcceptEvaluation').addEventListener('click',async ()=> {
                    let technologies = this.saveDataFromInputsBynameToList(["inputNodejs",'inputFrontend',"inputSwagger","inputJavascript"]);
                    let result = await Savedata.sendNewEvaluation({technologies : technologies,fromwho : fromwho,towho : towho,nameto : nameto, namefrom : namefrom},token);
                    if(result.message !=='correcto'){
                        alert(result.message);
                        document.getElementById('evaluationForm').innerHTML = "";
                        document.getElementById('evaluationForm').style.display = "none";
                    }else {
                        alert('Evaluación hecha, revisar perfil para revisión');
                        document.getElementById('evaluationForm').innerHTML = "";
                        document.getElementById('evaluationForm').style.display = "none";
                    }
                });
            }else if(type === "performance"){
                document.getElementById('evaluationForm').insertAdjacentHTML('afterbegin',`
                <h3>Evaluación de desempeño de ${nameto}</h3>
                <p>Eficiencia de código: <input type="number" id="inputCodePerformance" value ="0" max="5" min="0" > </p>
                <p>Calidad de código: <input type="number" id="inputCodeQuality" value ="0" max="5" min="0" ></p>
                <p>Velocidad de entrega:<input type="number" id="inputSpeed" value ="0" max="5" min="0" > </p>
                <button id="buttonAcceptEvaluation" >Aceptar</button>
                <button id="buttonCloseEvaluationForm">Cerrar</button>
                `);
                document.getElementById('buttonAcceptEvaluation').addEventListener('click',async ()=> {
                    let performance = this.saveDataFromInputsBynameToList(["inputCodeQuality",'inputSpeed',"inputCodePerformance",]);
                    let result = await Savedata.sendNewEvaluation({performance : performance,fromwho : fromwho,towho : towho,nameto : nameto, namefrom : namefrom},token);
                    if(result.message !=='correcto'){
                        alert(result.message);
                        document.getElementById('evaluationForm').innerHTML = "";
                        document.getElementById('evaluationForm').style.display = "none";
                    }else {
                        alert('Evaluación hecha, revisar perfil para revisión');
                        document.getElementById('evaluationForm').innerHTML = "";
                        document.getElementById('evaluationForm').style.display = "none";
                    }
                });
            }else if(type === "soft"){
                document.getElementById('evaluationForm').insertAdjacentHTML('afterbegin', `
                <h3>Evaluación de Habilidades blandas de ${nameto}</h3>
                <p>Comunicación: <input type="number" id="inputcommunication" value ="0" max="5" min="0"> </p>
                <p>Comprometido:<input type="number" id="inputcompromise" value ="0" max="5" min="0"> </p>
                <p>Enfocado: <input type="number" id="inputfocus" value ="0" max="5" min="0"></p>
                <p>Capacidad de aprendizaje:<input type="number" id="inputlearningSkill" value ="0" max="5" min="0"> </p>
                <p>Resolución de problemas:<input type="number" id="inputproblemResolution" value ="0" max="5" min="0"> </p>
                <p>Trabajo en equipo:<input type="number" id="inputteamWork" value ="0" max="5" min="0"> </p>
                <button id="buttonAcceptEvaluation" >Aceptar</button>
                <button id="buttonCloseEvaluationForm">Cerrar</button>
                `);
                document.getElementById('buttonAcceptEvaluation').addEventListener('click',async ()=> {
                    let soft = this.saveDataFromInputsBynameToList(["inputfocus",'inputteamWork',"inputcompromise",'inputcommunication','inputlearningSkill','inputproblemResolution']);
                    let result = await Savedata.sendNewEvaluation({soft : soft,fromwho : fromwho,towho : towho,nameto : nameto, namefrom : namefrom},token);
                    if(result.message !=='correcto'){
                        alert(result.message);
                        document.getElementById('evaluationForm').innerHTML = "";
                        document.getElementById('evaluationForm').style.display = "none";
                    }else {
                        alert('Evaluación hecha, revisar perfil para revisión');
                        document.getElementById('evaluationForm').innerHTML = "";
                        document.getElementById('evaluationForm').style.display = "none";
                    }
                });
            }else if(type === "profesional"){
                document.getElementById(`evaluationForm`).insertAdjacentHTML('afterbegin', `
                <h3>Evaluación de entorno profesional de ${nameto}</h3>
                <p>Slack: <input type="number" id="inputSlack" value ="0" max="5" min="0"> </p>
                <p>Github (versionado):<input type="number" id="inputgithub" value ="0" max="5" min="0"> </p>
                <p>Trello/Jira: <input type="number" id="inputtrello_jira" value ="0" max="5" min="0"></p>
                <p>Metodologías ágiles:<input type="number" id="inputagile" value ="0" max="5" min="0"> </p>
                <button id="buttonAcceptEvaluation" >Aceptar</button>
                <button id="buttonCloseEvaluationForm">Cerrar</button>
                `);
                document.getElementById('buttonAcceptEvaluation').addEventListener('click',async ()=> {
                    let profesional = this.saveDataFromInputsBynameToList(["inputgithub",'inputtrello_jira',"inputSlack",'inputagile']);
                    let result = await Savedata.sendNewEvaluation({profesional : profesional,fromwho : fromwho,towho : towho,nameto : nameto, namefrom : namefrom},token);
                    if(result.message !=='correcto'){
                        alert(result.message);
                        document.getElementById('evaluationForm').innerHTML = "";
                        document.getElementById('evaluationForm').style.display = "none";
                    }else {
                        alert('Evaluación hecha, revisar perfil para revisión');
                        document.getElementById('evaluationForm').innerHTML = "";
                        document.getElementById('evaluationForm').style.display = "none";
                    }
                });
            }else if(type === 'comment'){
                document.getElementById('evaluationForm').insertAdjacentHTML('afterbegin',`
                <h2>Comentario</h2>
                <textarea id="commentinput" rows= "4" cols ="50" maxlength="1000"></textarea>
                <button id ="sendCommentButton">Enviar</button>
                <button id="buttonCloseEvaluationForm">Cerrar</button>
                `);
                document.getElementById('sendCommentButton').addEventListener('click', async()=> {
                    let result = await Savedata.sendNewComment(namefrom,nameto,fromwho,towho,document.getElementById('commentinput').value,token);
                    if(result.message === "correcto"){
                        alert('Mensaje enviado');
                        
                    }else {
                        alert(result.message)
                    }
                    document.getElementById('evaluationForm').innerHTML = "";
                    document.getElementById('evaluationForm').style.display = "none";
                });
                document.getElementById('evaluationForm').style.display = 'block';
            }else if(type === 'offer'){
                document.getElementById('evaluationForm').insertAdjacentHTML('afterbegin',`
                <h2>Invita a ${nameto} a trabajar contigo</h2>
                <p>Salario:<input type="number" id="salaryinput"> m/n</p>
                <p>Puesto: <input type ="text" id="jobinput"></p>
                <p>Describe brevemente el trabajo</p>
                <textarea id ="offerinput" rows ="4" cols ="50" maxlength ="1000"></textarea>
                <button id ="sendOferButton">Enviar</button>
                <button id="buttonCloseEvaluationForm">Cerrar</button>
                ` );
                document.getElementById('evaluationForm').style.display = 'block';
            }else if(type === "answer"){
                document.getElementById('evaluationForm').insertAdjacentHTML('afterbegin',`
                <h2>Responde brevemente</h2>
                <textarea id="answerinput" rows ="4" cols ="50" maxlength ="1000"></textarea>
                <button id ="sendAnswerOferButton">Enviar</button>
                <button id="buttonCloseEvaluationForm">Cerrar</button>
                `);
                document.getElementById('evaluationForm').style.display = 'block';
            }
            document.getElementById('buttonCloseEvaluationForm').addEventListener('click', ()=> {
                document.getElementById('evaluationForm').innerHTML = "";
                document.getElementById('evaluationForm').style.display = "none";
            })
        }
    }

    //Esta funcion permite habilitar varios botones o inputs al mismo tiempo usanod sus nombres en una lista
    static disDisabledMany = (data) => {
        data.forEach((element) => {
            document.getElementById(element).disabled = false;
        })
    }
};