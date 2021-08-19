//En este archivo hay clases que ayudan a la renderizacion de cada pagina, asi como a recuperar la información de cada una

export class Renderizer {


    static  addRowTotable(table,name,criteria,inner) {
        let newRow = document.createElement('tr');
        newRow.id = name;
        document.getElementById(table).appendChild(newRow);
        document.getElementById(newRow.id).insertAdjacentHTML(criteria,inner);
    };

    static  deleteRowFromTable(table){
        if(document.getElementById(table).rows.length > 1) {
            document.getElementById(table).lastChild.remove();
        }
        
    };

    static saveDataFromInputs(tablename,list,keys,inputs) {
        
        for (let index = 0; index < document.getElementById(tablename).rows.length-1; index++) {
            let result = {};
            for(let j=0 ; j< keys.length; j++) {
                result[keys[j]] = document.getElementById(`${inputs[j]}${index}`).value;
            }
            list.push(result);
        };
    };


    static createCards(name,where,extraInfo,id,foto) {
        let division = document.createElement('div');
        division.className = 'card';
        division.style = "width: 18rem; margin-bottom:20px; height: 20rem"
        division.insertAdjacentHTML('afterbegin',`<img class="card-img-top" src="${foto}" alt="Card image cap" style="height:100px; width: 100px">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <a href="#" class="btn btn-primary" id=${id}>Ver</a>
        </div>`);
        if (extraInfo) {
            document.getElementById(id).insertAdjacentHTML('beforebegin',`<p>${extraInfo}</p>`)
        };
        document.getElementById(where).appendChild(division);
    };

    static openform(role,data) {
        document.getElementById('formContainer').innerHTML = "";
        if(role === 'tecler'){
            document.getElementById('formContainer').insertAdjacentHTML('afterbegin', `
            <img src = "${data.profilePhoto}" class ="imageforFormUser"></img>
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
            }else if(JSON.parse(sessionStorage.getItem('useractive').data.idCompanyUser)){
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
            <img src = "${data.profilePhoto}" class ="imageforFormUser"></img>
            <p>${data.username}</p>
            <p>"${data.tellUsSomething}"</p>
            <p>Nombre: ${data.name}</p>
            <p>Soy: ${data.job} en Tecla</p>
            <p>Mail: ${data.mail}</p>
            <button id = "closeForm">Cerrar</button>`);
        }else if(role === 'company'){
            document.getElementById('formContainer').insertAdjacentHTML('afterbegin', `
            <img src = "${data.profilePhoto}" class ="imageforFormUser"></img>
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
            <h3>Evaluación de desempeño de ${data.nameto}</h3>
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
        }

        document.getElementById('buttonCloseFormEvaluation').addEventListener('click',()=> {
            document.getElementById('formContainer').innerHTML = "";
            document.getElementById('formContainer').style.display = 'none';
        });
        document.getElementById('formContainer').style.display = 'block';

    };

    static disDisabledMany = (data) => {
        data.forEach((element) => {
            document.getElementById(element).disabled = false;
        })
    }
};