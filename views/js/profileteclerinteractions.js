import { Tecler } from "./classes.js";
import { Renderizer } from "./renderizers.js";
import { RetrieveData, Savedata } from "./senddata.js";

let userActive = JSON.parse(localStorage.getItem('useractive'));
console.log(userActive);
if (userActive != null) {
    document.getElementById('usernameprofile').value = userActive.data.username;
    document.getElementById('nameprofile').value = userActive.data.name;
    document.getElementById('ageprofile').value = userActive.data.age;
    document.getElementById('countryprofile').value = userActive.data.country;
    document.getElementById('cityprofile').value = userActive.data.city;
    document.getElementById(`tellUsSomethingprofile`).value = userActive.data.tellUsSomething;
    document.getElementById('profilePhotoprofile').setAttribute('src',userActive.data.profilePhoto);
    document.getElementById(`mailprofile`).value = userActive.data.mail;
    
}else {
    alert('Usuario no ingresado');
    window.open('../html/login.html','_self');
}



document.getElementById('editButton').addEventListener('click', ()=> {
    
    let list = ['Lenguage','Social','Hobbie','Study'];
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
    Renderizer.addRowTotable('tableLenguages',`lenguageRow${rows-1}`);
    document.getElementById(`lenguageRow${rows-1}`).insertAdjacentHTML('afterbegin',`<td>Estudié <input type ="text" value= ""style = " color:black" class="inputs" placeholder="¿Que aprendiste?" id="lenguageinput${rows-1}"> por <input type= "text" value=""  style = " color:black" class="inputs" placeholder="¿Por cuánto tiempo?" id="lenguageexperienceinput${rows-1}"> años </td>`);
});

document.getElementById('addStudy').addEventListener('click', ()=>{

    let rows = document.getElementById('tableStudies').rows.length;

    Renderizer.addRowTotable('tableStudies',`studyRow${rows-1}`)
    document.getElementById(`studyRow${rows-1}`).insertAdjacentHTML('afterbegin',`<td>Estudié <input type ="text" style = " color:black" class="inputs" id="studyinput${rows-1}"> por <input id="studyexperienceinput${rows-1}" type= "text" style = " color:black" class="inputs" > años y obtuve <input type= "text"  style = " color:black" class="inputs"  id="studydegreeinput${rows-1}" ></td>`)

});


document.getElementById('addHobbie').addEventListener('click', ()=> {

    let rows = document.getElementById('tableHobbies').rows.length;

    Renderizer.addRowTotable('tableHobbies',`hobbieRow${rows-1}`);

    document.getElementById(`hobbieRow${rows-1}`).insertAdjacentHTML('afterbegin',`<td>Practiqué <input type ="text"  style = " color:black" class="inputs" id="hobbieinput${rows-1}"> por <input type= "text" v style = " color:black" class="inputs" id= "hobbieexperienceinput${rows-1}"> años </td>`)

});


document.getElementById('addSocial').addEventListener('click', ()=> {

    let rows = document.getElementById('tableSocials').rows.length;

    Renderizer.addRowTotable('tableSocials',`socialRow${rows-1}`);

    document.getElementById(`socialRow${rows-1}`).insertAdjacentHTML('afterbegin',`<td>Me puedes encontrar en <input type="text" sytle="color: black" placeholder="Github,Face..." id="socialinput${rows-1}"> en el link <input type="text" style="color:black" placeholder="Pega el link a tu página " id="sociallinkinput${rows-1}"></td>`);

});

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
    let result = await Savedata.updateTecler({data: userToUpload,token:userActive.token});
    console.log(result);
    localStorage.setItem('useractive',JSON.stringify({data:result.result,token:result.token}));
    window.open('../html/profiletecler.html','_self');
    
})