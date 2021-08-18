import { Tecler } from "./classes.js";
import { Renderizer } from "./renderizers.js";
import { DeleteData, RetrieveData, Savedata } from "./senddata.js";


let userActiveaux = JSON.parse(sessionStorage.getItem('useractive'));
let userActive = await RetrieveData.getTecler(userActiveaux.data.username,userActiveaux.data.password);
userActive.evaluations = await RetrieveData.getEvaluations(userActive.token);
console.log(userActive);
if (userActive != null) {
    document.getElementById('usernameprofile').value = userActive.result.username;
    document.getElementById('nameprofile').value = userActive.result.name;
    document.getElementById('ageprofile').value = userActive.result.age;
    document.getElementById('countryprofile').value = userActive.result.country;
    document.getElementById('cityprofile').value = userActive.result.city;
    document.getElementById(`tellUsSomethingprofile`).value = userActive.result.tellUsSomething;
    document.getElementById('profilePhotoprofile').setAttribute('src',userActive.result.profilePhoto);
    document.getElementById(`mailprofile`).value = userActive.result.mail;

    userActive.extras.habilities.forEach((element)=> {
        let rows = document.getElementById('tableHabilities').rows.length;
        Renderizer.addRowTotable('tableHabilities',`habilityRow${rows-1}`, 'afterbegin',`<td> Mi extra es que : <input type="text" clas ="inputs" id="habilityinput${rows-1}" value="${element.what}" disabled class="inputs">`);
    });

    userActive.extras.hobbies.forEach((element)=> {
        let rows = document.getElementById('tableHobbies').rows.length;
        Renderizer.addRowTotable('tableHobbies',`hobbieRow${rows-1}`,'afterbegin',`<td>Me gusta <input type ="text" class="inputs" id="hobbieinput${rows-1}" value="${element.hobbie}" disabled>, desde hace <input type= "text"  class="inputs" id= "hobbieexperienceinput${rows-1}" value ="${element.howLong}" disabled> años  y lo que he aprendido es <input type="text" id="hobiielikeinput${rows-1}" value ="${element.tellSomething}" disabled class="inputs"></td>`);
    });

   userActive.extras.lenguages.forEach((element) => {
       let rows = document.getElementById(`tableLenguages`).rows.length;
       Renderizer.addRowTotable('tableLenguages',`lenguageRow${rows-1}`,'afterbegin',`<td>Estudié <input disabled type ="text" value= "${element.lenguage}" class="inputs"  id="lenguageinput${rows-1}"> por <input disabled type= "text"  class="inputs" value="${element.howLong}" id="lenguageexperienceinput${rows-1}"> años, en <input disabled id="lenguagelocationinput${rows-1}" value ="${element.location}" class ="inputs"> y obtuve <input disabled id="lenguagedegreeinput${rows-1}" class ="inputs" value="${element.degree}"></td>`);
   });

   userActive.extras.studies.forEach((element) => {

        let rows = document.getElementById('tableStudies').rows.length;
        Renderizer.addRowTotable('tableStudies',`studyRow${rows-1}`,'afterbegin',`<td>Estudié <input type ="text"  class="inputs" disabled id="studyinput${rows-1}" value ="${element.what}"> por <input id="studyexperienceinput${rows-1}" disabled type= "text"  class="inputs" value="${element.howLong}"> años, en <input disabled type= "text"   class="inputs"  id="studylocationinput${rows-1}" value ="${element.location}"></td>`);
   });

   userActive.extras.socials.forEach((element)=> {

        let rows = document.getElementById(`tableSocials`).rows.length;
        Renderizer.addRowTotable('tableSocials',`socialRow${rows-1}`,'afterbegin',`<td>Me puedes encontrar en <input type="text" class="inputs" sytle="color: black" value="${element.SocialMedia}" id="socialinput${rows-1}" disabled> en el link <input type="text" style="color:black" value="${element.link}" id="sociallinkinput${rows-1}" disabled class ="inputs"></td>`);
   });

   userActive.evaluations.result.knowledges.forEach((element) => {
       Renderizer.addRowTotable('Knows',`knowlegeRow${document.getElementById('Knows').rows.length}`,'afterbegin',`<td>${element.databaseKnowledge}</td><td>${element.apis}</td><td>${element.testing}</td><td>${element.security}</td><td>${element.objectTeory}</td><td>${element.namefrom}</td>`)
   });
   userActive.evaluations.result.technologies.forEach((element) => {
       Renderizer.addRowTotable('Technologies',`technologieRow${document.getElementById('Technologies').rows.length}`,'afterbegin',`<td>${element.nodejs}</td><td>${element.frontend}</td><td>${element.swagger}</td><td>${element.javascript}</td><td>${element.namefrom}</td>`)
   });
   userActive.evaluations.result.performance.forEach((element)=> {
       Renderizer.addRowTotable('Performance',`performanceRow${document.getElementById(`Performance`).rows.length}`,'afterbegin',`<td>${element.codequality}</td><td>${element.speed}</td><td>${element.codePerformance}</td><td>${element.namefrom}</td>`)
   });
   userActive.evaluations.result.softskills.forEach((element) => {
       Renderizer.addRowTotable('Softskills',`softskillRow${document.getElementById(`Softskills`).rows.length}`,`afterbegin`, `<td>${element.focus}</td><td>${element.teamWork}</td><td>${element.compromise}</td><td>${element.communication}</td><td>${element.learningSkill}</td><td>${element.problemResolution}</td><td>${element.namefrom}</td>`)
   });

   userActive.evaluations.result.profesional.forEach((element) => {
       Renderizer.addRowTotable('Profesional',`profesionalRow${document.getElementById(`Profesional`).rows.length}`,'afterbegin',`<td>${element.github}</td><td>${element.trello_jira}</td><td>${element.Slack}</td><td>${element.agile}</td><td>${element.namefrom}</td>`)
   });

   userActive.extras.comments.forEach((element) => {
       let rows = document.getElementById(`tableComments`).rows.length;
       Renderizer.addRowTotable('tableComments',`commentRow${rows-1}`,'afterbegin',`<td>${element.commentary}   ${element.registered}</td>`)
   })
    
}else {
    alert('Usuario no ingresado');
    window.open('../html/login.html','_self');
}



document.getElementById('editButton').addEventListener('click', ()=> {
    
    let list = ['Lenguage','Social','Hobbie','Study','Hability'];
    let list2 = ['name','age','country','city','mail','tellUsSomething'];

    list.forEach((element)=> {
        document.getElementById('add'+element).hidden = false;
        document.getElementById('delete'+element).hidden = false;
    });

    list2.forEach((element) => {
        document.getElementById(element+'profile').disabled = false;
    });

    document.getElementById('passwordHidden').hidden = false;
    document.getElementById(`passwordprofile`).value = userActive.result.password;
    document.getElementById('passwordprofile').disabled = false;
    document.getElementById('acceptChangesButton').hidden = false;
    document.getElementById('cancelChangesButton').hidden = false;
    document.getElementById('editButton').hidden = true;
    document.getElementById(`giveUpButton`).hidden = false;

});



document.getElementById('cancelChangesButton').addEventListener('click',()=>{

    let list = ['Lenguage','Social','Hobbie','Study'];
    let list2 = ['username','name','age','country','city'];

    list.forEach((element)=> {
        document.getElementById('add'+element).hidden = true;
        document.getElementById('delete'+element).hidden = true;
    });

    list2.forEach((element) => {
        document.getElementById(element+'profile').disabled = true;
    });

    document.getElementById('passwordHidden').hidden = true;
    document.getElementById('passwordprofile').disabled = true;
    document.getElementById('acceptChangesButton').hidden = true;
    document.getElementById('cancelChangesButton').hidden = true;
    document.getElementById('editButton').hidden = false;
    document.getElementById(`giveUpButton`).hidden = true;
});

document.getElementById('addLenguage').addEventListener('click' , ()=> {
    let rows = document.getElementById('tableLenguages').rows.length;
    Renderizer.addRowTotable('tableLenguages',`lenguageRow${rows-1}`,'afterbegin',`<td>Estudié <input type ="text" value= ""  placeholder="¿Que aprendiste?" id="lenguageinput${rows-1}"> por <input type= "text" value=""    placeholder="¿Por cuánto tiempo?" id="lenguageexperienceinput${rows-1}"> años, en <input id="lenguagelocationinput${rows-1}" placeholder ="¿algún curso o autodidacta?" class ="inputs"> y obtuve <input id="lenguagedegreeinput${rows-1}" placeholder ="¿tienes algún diploma?"></td>`);
});

document.getElementById('addStudy').addEventListener('click', ()=>{

    let rows = document.getElementById('tableStudies').rows.length;

    Renderizer.addRowTotable('tableStudies',`studyRow${rows-1}`,'afterbegin',`<td>Estudié <input type ="text"   id="studyinput${rows-1}"> por <input id="studyexperienceinput${rows-1}" type= "text"   > años, en <input type= "text"     id="studylocationinput${rows-1}" placeholder="¿en dónde?"></td>`);

});


document.getElementById('addHobbie').addEventListener('click', ()=> {

    let rows = document.getElementById('tableHobbies').rows.length;

    Renderizer.addRowTotable('tableHobbies',`hobbieRow${rows-1}`,'afterbegin',`<td>Me gusta <input type ="text"  id="hobbieinput${rows-1}">, desde hace <input type= "text"   id= "hobbieexperienceinput${rows-1}"> años  y lo que he aprendido es <input type="text" id="hobiielikeinput${rows-1}" placeholder="con este hobbie aprendí a...."></td>`);

});


document.getElementById('addSocial').addEventListener('click', ()=> {

    let rows = document.getElementById('tableSocials').rows.length;

    Renderizer.addRowTotable('tableSocials',`socialRow${rows-1}`,'afterbegin',`<td>Me puedes encontrar en <input type="text" sytle="color: black" placeholder="Github,Face..." id="socialinput${rows-1}"> en el link <input type="text" style="color:black" placeholder="Pega el link a tu página " id="sociallinkinput${rows-1}"></td>`);


});

document.getElementById(`addHability`).addEventListener('click', ()=> {
    let rows = document.getElementById('tableHabilities').rows.length;
    Renderizer.addRowTotable('tableHabilities',`habilityRow${rows-1}`, 'afterbegin',`<td> Mi extra es que : <input type="text" clas ="inputs" id="habilityinput${rows-1}" placeholder="yo puedo o yo sé.......">`);

})

document.getElementById("deleteStudy").addEventListener('click', ()=> {

    Renderizer.deleteRowFromTable('tableStudies');
});

document.getElementById("deleteHobbie").addEventListener('click', ()=> {

    Renderizer.deleteRowFromTable('tableHobbies');
});

document.getElementById("deleteLenguage").addEventListener('click', ()=> {

    Renderizer.deleteRowFromTable('tableLenguages');
});

document.getElementById("deleteSocial").addEventListener('click', ()=> {

    Renderizer.deleteRowFromTable('tableSocials');
});

document.getElementById('deleteHability').addEventListener('click', ()=> {
    Renderizer.deleteRowFromTable('tableHabilities');
})
    
    
document.getElementById('acceptChangesButton').addEventListener('click',async function algo(){
    
    let userToUpload = {}
    userToUpload.name = document.getElementById(`nameprofile`).value;
    userToUpload.password = document.getElementById(`passwordprofile`).value;
    userToUpload.age = document.getElementById(`ageprofile`).value.slice(0,2);
    userToUpload.city = document.getElementById(`cityprofile`).value;
    userToUpload.country = document.getElementById(`countryprofile`).value;
    userToUpload.username = document.getElementById(`usernameprofile`).value;
    userToUpload.tellUsSomething = document.getElementById(`tellUsSomethingprofile`).value;
    userToUpload.profilePhoto = document.getElementById(`profilePhotoprofile`).src;
    userToUpload.mail = document.getElementById(`mailprofile`).value;
    userToUpload.idTecler = userActive.result.idTecler;

    let extraInfo = {studies:[], socials:[], lenguages:[], hobbies: [], habilities: []};
    Renderizer.saveDataFromInputs(`tableStudies`,extraInfo.studies,['what','location','howLong'],['studyinput',`studylocationinput`,`studyexperienceinput`]);
    Renderizer.saveDataFromInputs(`tableLenguages`,extraInfo.lenguages,['lenguage','howLong','location','degree'],['lenguageinput','lenguageexperienceinput','lenguagelocationinput','lenguagedegreeinput']);
    Renderizer.saveDataFromInputs(`tableHobbies`,extraInfo.hobbies,['hobbie','howLong','tellSomething'],['hobbieinput','hobbieexperienceinput',`hobiielikeinput`]);
    Renderizer.saveDataFromInputs(`tableHabilities`,extraInfo.habilities,[`what`],['habilityinput']);
    console.log(extraInfo);
    Renderizer.saveDataFromInputs(`tableSocials`,extraInfo.socials,[`SocialMedia`,`link`],['socialinput','sociallinkinput']);

    
    let userUploading = new Tecler(userToUpload);
    userUploading.extraInfo = extraInfo;
    console.log(userUploading);
    let result = await userUploading.saveTeclerChanges(userActive.token);
    console.log(result);
    sessionStorage.setItem('useractive',JSON.stringify({data:result.result,token:result.token}));
    window.open('../html/profiletecler.html','_self');
    
});

document.getElementById(`giveUpButton`).addEventListener('click', async ()=> {
    let result = await DeleteData.deleteTecler(userActive.token,userActive.result.idTecler);
})