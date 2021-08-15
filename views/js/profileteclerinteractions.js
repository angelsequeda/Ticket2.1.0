import { Tecler } from "./classes.js";
import { Renderizer } from "./renderizers.js";
import { RetrieveData, Savedata } from "./senddata.js";


let userActiveaux = JSON.parse(localStorage.getItem('useractive'));
console.log(userActiveaux);
let userActive = await RetrieveData.getTecler(userActiveaux.data.username,userActiveaux.data.password);
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
        Renderizer.addRowTotable('tableHabilities',`habilityRow${rows-1}`, 'afterbegin',`<td> Mi extra es que : <input type="text" clas ="inputs" id="habilityinput" value="${element.what}" disabled>`);
    });

    userActive.extras.hobbies.forEach((element)=> {
        let rows = document.getElementById('tableHobbies').rows.length;
        Renderizer.addRowTotable('tableHobbies',`hobbieRow${rows-1}`,'afterbegin',`<td>Me gusta <input type ="text" class="inputs" id="hobbieinput${rows-1}" value="${element.hobbie}" disabled>, desde hace <input type= "text"  class="inputs" id= "hobbieexperienceinput${rows-1}" value ="${element.howLong}" disabled> años  y lo que he aprendido es <input type="text" id="hobiielikeinput" value ="${element.tellSomething}" disabled></td>`);
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
    document.getElementById(`passwordprofile`).value = userActive.data.password;
    document.getElementById('passwordprofile').disabled = false;
    document.getElementById('acceptChangesButton').hidden = false;
    document.getElementById('cancelChangesButton').hidden = false;
    document.getElementById('editButton').hidden = true;

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
});

document.getElementById('addLenguage').addEventListener('click' , ()=> {
    let rows = document.getElementById('tableLenguages').rows.length;
    Renderizer.addRowTotable('tableLenguages',`lenguageRow${rows-1}`,'afterbegin',`<td>Estudié <input type ="text" value= "" class="inputs" placeholder="¿Que aprendiste?" id="lenguageinput${rows-1}"> por <input type= "text" value=""   class="inputs" placeholder="¿Por cuánto tiempo?" id="lenguageexperienceinput${rows-1}"> años, en <input id="lenguagelocationinput" placeholder ="¿algún curso o autodidacta?" class ="inputs"> y obtuve <input id="lenguagedegreeinput" class ="inputs" placeholder ="¿tienes algún diploma?"></td>`);
});

document.getElementById('addStudy').addEventListener('click', ()=>{

    let rows = document.getElementById('tableStudies').rows.length;

    Renderizer.addRowTotable('tableStudies',`studyRow${rows-1}`,'afterbegin',`<td>Estudié <input type ="text"  class="inputs" id="studyinput${rows-1}"> por <input id="studyexperienceinput${rows-1}" type= "text"  class="inputs" > años, en <input type= "text"   class="inputs"  id="studylocationinput${rows-1}" placeholder="¿en dónde?"></td>`);

});


document.getElementById('addHobbie').addEventListener('click', ()=> {

    let rows = document.getElementById('tableHobbies').rows.length;

    Renderizer.addRowTotable('tableHobbies',`hobbieRow${rows-1}`,'afterbegin',`<td>Me gusta <input type ="text" class="inputs" id="hobbieinput${rows-1}">, desde hace <input type= "text"  class="inputs" id= "hobbieexperienceinput${rows-1}"> años  y lo que he aprendido es <input type="text" id="hobiielikeinput" placeholder="con este hobbie aprendí a...."></td>`);

});


document.getElementById('addSocial').addEventListener('click', ()=> {

    let rows = document.getElementById('tableSocials').rows.length;

    Renderizer.addRowTotable('tableSocials',`socialRow${rows-1}`,'afterbegin',`<td>Me puedes encontrar en <input type="text" sytle="color: black" placeholder="Github,Face..." id="socialinput${rows-1}"> en el link <input type="text" style="color:black" placeholder="Pega el link a tu página " id="sociallinkinput${rows-1}"></td>`);


});

document.getElementById(`addHability`).addEventListener('click', ()=> {
    let rows = document.getElementById('tableHabilities').rows.length;
    Renderizer.addRowTotable('tableHabilities',`habilityRow${rows-1}`, 'afterbegin',`<td> Mi extra es que : <input type="text" clas ="inputs" id="habilityinput" placeholder="yo puedo o yo sé.......">`);

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
    userToUpload.idTecler = userActive.data.idTecler;

    let userUploading = new Tecler(userToUpload);
    let result = await userUploading.saveTeclerChanges(userActive.token);
    console.log(result);
    localStorage.setItem('useractive',JSON.stringify({data:result.result,token:result.token}));
    window.open('../html/profiletecler.html','_self');
    
});

