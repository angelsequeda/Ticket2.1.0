import { DeleteData, RetrieveData } from "./senddata.js";
import {Renderizer} from "./renderizers.js"
//Estas son todas las funciones usadas para hacer funcionar la pagina de perfil de un colaborador de alguna compañia
let userActive = await RetrieveData.getCompany(JSON.parse(sessionStorage.getItem('useractive')).data.username,JSON.parse(sessionStorage.getItem('useractive')).data.password);


if(userActive.result) {
    userActive.offers = await RetrieveData.getAllMyOfers(userActive.result.username,userActive.token);
    document.getElementById('mailprofileCompany').value = userActive.result.mail;
    document.getElementById('usernameprofileCompany').value = userActive.result.username; 
    document.getElementById('nameprofileCompany').value = userActive.result.name;
    document.getElementById('jobprofileCompany').value = userActive.result.job;
    document.getElementById('companyNameCompany').value = userActive.result.companyName;
    document.getElementById('passwordprofileCompany').value = userActive.result.password;
    document.getElementById('profilePhotoprofile').setAttribute('src',userActive.result.profilePhoto);
    if(userActive.offers.message === "correcto"){
        userActive.offers.result.forEach((element) => {
            let rows = document.getElementById('tableOfers').rows.length;
            Renderizer.addRowTotable('tableOfers',`oferRow${rows-1}`,'afterbegin',`<td>Descripción: ${element.ofer}, hecha por mi a ${element.nameto}<td><td><button id="deleteOfer${rows-1}">Dar de baja</button></td>`);
            document.getElementById(`deleteOfer${rows-1}`).addEventListener('click', async()=> {
                let confirm = window.confirm('¿Seguro que desea eliminar esta propuesta de manera permanente?');
                if(confirm) {
                    let result = await DeleteData.deleteOfer(element.id,element.fromwho,element.towho,userActive.token);
                    if(result.message === "correcto"){
                        alert('Borrado');
                    }else {
                        alert(result.message);
                    }
                }
            })
            userActive.offers.answers.forEach((element2)=> {
                if(element2.idOfOfer === element.id){
                    let rows = document.getElementById('tableOfers').rows.length;
                    Renderizer.addRowTotable('tableOfers',`oferRow${rows-1}`,'afterbegin',`<td>Respuesta: ${element2.answer} (${element2.registered})<td>`)
                }
            })
        })
    }
};

document.getElementById('closeSession').addEventListener('click', ()=> {
    sessionStorage.clear();
})