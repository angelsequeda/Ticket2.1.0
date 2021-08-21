import { RetrieveData } from "./senddata.js";

//Estas son todas las funciones usadas para hacer funcionar la pagina de perfil de un colaborador de alguna compañia
let userActive = await RetrieveData.getCompany(JSON.parse(sessionStorage.getItem('useractive')).data.username,JSON.parse(sessionStorage.getItem('useractive')).data.password);
console.log(userActive);

if(userActive.result) {
    document.getElementById('mailprofileCompany').value = userActive.result.mail;
    document.getElementById('usernameprofileCompany').value = userActive.result.username; 
    document.getElementById('nameprofileCompany').value = userActive.result.name;
    document.getElementById('jobprofileCompany').value = userActive.result.job;
    document.getElementById('companyNameCompany').value = userActive.result.companyName;
    document.getElementById('passwordprofileCompany').value = userActive.result.password;
}