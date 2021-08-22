//Estas son las interacciones enre el perfil de un tecler y todo el sistema 
import { Tecler } from "./classes.js";
import { Renderizer } from "./renderizers.js";
import { DeleteData, RetrieveData, Savedata } from "./senddata.js";

//El usuario presente esta guardado en el session storage
let userActiveaux = JSON.parse(sessionStorage.getItem('useractive'));
let userActive = await RetrieveData.getTecler(userActiveaux.data.username,userActiveaux.data.password);
userActive.evaluations = await RetrieveData.getEvaluations(userActive.token);
userActive.friends = await RetrieveData.getAllFrieds(userActive.token,userActive.result.idTecler);
userActive.offers = await RetrieveData.getAllMyOfers(userActive.result.idTecler,userActive.token);
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

    //Se muestran las ofertas de trabajo hechas al tecler

    userActive.offers.result.forEach((element)=> {
        if(element.answered === 0){
            let rows = document.getElementById('tableOffers').rows.length;
            Renderizer.addRowTotable('tableOffers',`offerRow${rows-1}`,'afterbegin',`<td>${element.namefrom}</td>
            <td>${element.job}</td><td>${element.ofer}</td><td>$${element.salary}</td><td>${element.registered}</td><td><button id="answerOfer${rows-1}">Enviar respuesta</button>`);
            document.getElementById(`answerOfer${rows-1}`).addEventListener('click', ()=> {
            Renderizer.openFirstEvaluationForm(2,'answer');
            document.getElementById('sendAnswerOferButton').addEventListener('click',async ()=> {
                let result = await Savedata.sendNewAnswerToOffer(element.id,element.namefrom,userActive.result.username,document.getElementById('answerinput').value,userActive.token);
                if(result.message === "correcto"){
                    alert('Respuesta enviada');
                }else{
                    alert(result.message);
                }
                document.getElementById('evaluationForm').style.display = 'none';
                document.getElementById('evaluationForm').innerHTML = '';
            })
        });
        }
    })

    //Se muestran las habilidades extras del tecler (lenguajes, hobbies, etc.)
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
       Renderizer.addRowTotable('Profesional',`profesionalRow${document.getElementById(`Profesional`).rows.length}`,'afterbegin',`<td>${element.github}</td><td>${element.trello_jira}</td><td>${element.Slack}</td><td>${element.agile}</td><td>${element.namefrom}</td>`);
   });

   userActive.extras.comments.forEach((element) => {
       let rows = document.getElementById(`tableComments`).rows.length;
       Renderizer.addRowTotable('tableComments',`commentRow${rows-1}`,'afterbegin',`<td>"${element.commentary}"   ${element.fromwhoName}</td><td><button id="answerComment${element.id}">Responder</button><button id="deleteComment${element.id}">Eliminar</button></td>`);
       document.getElementById(`deleteComment${element.id}`).addEventListener('click', async()=> {
           let result = await DeleteData.deleteComment(element.id,userActive.result.idTecler,element.fromwho,userActive.token);
           console.log(result);
           document.getElementById(`commentRow${rows-1}`).remove();
       });
       document.getElementById(`answerComment${element.id}`).addEventListener('click', ()=> {
            Renderizer.openFirstEvaluationForm(2,'comment',element.fromwhoName,userActive.result.username,element.fromwho,userActive.result.idTecler,userActive.token);
       })
   });
   
   //Se buscan y muestran los amigos del tecler 
   userActive.friends.result.forEach((element)=> {
    let rows = document.getElementById(`tableFriends`).rows.length;
    //Cada amigo (dependiendo si su solicitud de amistad ha sido aceptada o no) aparece aqui
       if(element.accepted === 0 && element.friend2id === userActive.result.idTecler){
           //Si la solicitud no ha sido aceptada los botones asignados permiten aceptar la invitacion o borrarla de la 
           //base de datos
            Renderizer.addRowTotable('tableFriends',`friendRow${rows}`,'afterbegin',`<td>${element.friend1name} quiere ser tu amigo <button id="butttonAcceptFriend${element.friend1name}">Aceptar</button><button id="deleteFriend${element.friend1name}">Declinar</button></td>`)
            document.getElementById(`butttonAcceptFriend${element.friend1name}`).addEventListener('click', async()=> {
                if(element.friend1id !== userActive.result.idTecler){
                    let result = await DeleteData.changeFriendship(userActive.token,element.friend1id,userActive.result.idTecler,'accept');
                }else if(element.accepted === 1){
                    let result = await DeleteData.changeFriendship(userActive.token,element.friend2id,userActive.result.idTecler,'accept');
                }
                
                document.getElementById(`butttonAcceptFriend${element.friend1name}`).disabled = true;
            });
       }else if(element.accepted === 1){
           if(userActive.result.idTecler === element.friend1id){
                //Si la solicitud fue aceptada se puede borrar la solicitud (quedando como no amigos) o bien
                //se puede hacer un comentario al compañero
                Renderizer.addRowTotable('tableFriends',`friendRow${rows}`,'afterbegin',`<td>${element.friend2name} es tu amigo, puedes hacerle un comentario desde aqui <button id="buttonSendComment${element.friend2name}">Comentar</button><button id="deleteFriend${element.friend2name}">Eliminar</button></td>`);
                document.getElementById(`buttonSendComment${element.friend2name}`).addEventListener('click', ()=> {
                    Renderizer.openFirstEvaluationForm(2,'comment',element.friend2name,userActive.result.username,element.friend2id,userActive.result.idTecler,userActive.token);
                })
                document.getElementById(`deleteFriend${element.friend2name}`).addEventListener('click', async()=> {
                    if(element.friend1id !== userActive.result.idTecler){
                        let result = await DeleteData.changeFriendship(userActive.token,element.friend1id,userActive.result.idTecler,'delete');
                    }else {
                        let result = await DeleteData.changeFriendship(userActive.token,element.friend2id,userActive.result.idTecler,'delete');
                    }
                    document.getElementById(`friendRow${rows}`).remove();
               });
           }else if(userActive.result.idTecler === element.friend2id){
                Renderizer.addRowTotable('tableFriends',`friendRow${rows}`,'afterbegin',`<td>${element.friend1name} es tu amigo, puedes hacerle un comentario desde aqui <button id="buttonSendComment${element.friend1name}">Comentar</button><button id="deleteFriend${element.friend1name}">Eliminar</button></td>`)
                document.getElementById(`deleteFriend${element.friend1name}`).addEventListener('click', async()=> {
                    if(element.friend1id !== userActive.result.idTecler){
                        let result = await DeleteData.changeFriendship(userActive.token,element.friend1id,userActive.result.idTecler,'delete');
                    }else {
                        let result = await DeleteData.changeFriendship(userActive.token,element.friend2id,userActive.result.idTecler,'delete');
                    };
                    document.getElementById(`friendRow${rows}`).remove();
               });
                document.getElementById(`buttonSendComment${element.friend1name}`).addEventListener('click', ()=> {
                    Renderizer.openFirstEvaluationForm(2,'comment',element.friend1name,userActive.result.username,element.friend1id,userActive.result.idTecler,userActive.token);
                })
           }
           
       };
        
   })
    
}else {
    alert('Usuario no ingresado');
    window.open('../html/login.html','_self');
}

//A partir de este punto todas son funciones de los distintos botones que permiten actualizar al tecler

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

document.getElementById('closeSession').addEventListener('click', ()=> {
    sessionStorage.clear();
})