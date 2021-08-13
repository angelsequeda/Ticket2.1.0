import { Tecler } from "./classes.js";
import { Renderizer } from "./renderizers.js";
import { RetrieveData, Savedata } from "./senddata.js";

let userActive =new Tecler(JSON.parse(localStorage.getItem('useractive')).data);
let oldUser = await RetrieveData.getTecler(userActive.username,userActive.password);
console.log(userActive);
console.log(oldUser);
if (userActive != null) {
    document.getElementById('usernameprofile').value = userActive.username;
    document.getElementById('nameprofile').value = userActive.name;
    document.getElementById('ageprofile').value = userActive.age + ' años';
    document.getElementById('countryprofile').value = userActive.country;
    document.getElementById('cityprofile').value = userActive.city;
}else {
    alert('Usuario no ingresado');
    window.open('../html/login.html','_self');
}



document.getElementById('editButton').addEventListener('click', ()=> {
    
    let list = ['Lenguage','Social','Hobbie','Study'];
    let list2 = ['username','name','age','country','city'];

    list.forEach((element)=> {
        document.getElementById('add'+element).hidden = false;
        document.getElementById('delete'+element).hidden = false;
    });

    list2.forEach((element) => {
        document.getElementById(element+'profile').disabled = false;
    });

    document.getElementById('passwordHidden').hidden = false;
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

for (let index = 0; index < JSON.parse(userActive.lenguages).length; index++) {
    Renderizer.addRowTotable('tableLenguages',`lenguageRow${index}`);
    document.getElementById(`lenguageRow${index}`).insertAdjacentHTML('afterbegin',`<td>Estudié <input type ="text" value= "${JSON.parse(userActive.lenguages)[index]['lenguage']}" disabled style = " color:black" class="inputs" id="lenguageinput${index}"> por <input type= "text" value="${JSON.parse(userActive.lenguages)[index]['experience']}"  style = " color:black" class="inputs" disabled id="lenguageexperienceinput${index}"> años </td>`);
    
};

for (let index = 0; index < JSON.parse(userActive.hobbies).length; index++) {
    Renderizer.addRowTotable('tableHobbies',`hobbieRow${index}`);
    document.getElementById(`hobbieRow${index}`).insertAdjacentHTML('afterbegin',`<td>Practiqué <input type ="text" value= "${JSON.parse(userActive.hobbies)[index]['title']}" id="hobbieinput${index}" disabled style = " color:black" class="inputs"> por <input type= "text" value="${JSON.parse(userActive.hobbies)[index]['experience']}"  style = " color:black" class="inputs" disabled id="hobbieexperienceinput${index}"> años </td>`)
};

for (let index = 0; index < JSON.parse(userActive.education).length; index++) {
    Renderizer.addRowTotable('tableStudies',`studyRow${index}`);
    document.getElementById(`studyRow${index}`).insertAdjacentHTML('afterbegin',`<td>Estudié <input type ="text" value= "${JSON.parse(userActive.education)[index]['title']}" disabled style = " color:black" class="inputs" id="studyinput${index}"> por <input id="studyexperienceinput${index}" type= "text" value="${JSON.parse(userActive.education)[index]['experience']}"  style = " color:black" class="inputs" disabled> años y obtuve <input type= "text" value="${JSON.parse(userActive.education)[index]['degree']}"  style = " color:black" class="inputs" disabled id="studydegreeinput${index}" ></td>`)
    
};

for (let index = 0; index < JSON.parse(userActive.social).length; index++) {
    Renderizer.addRowTotable('tableSocials',`socialRow${index}`);
    document.getElementById(`socialRow${index}`).insertAdjacentHTML('afterbegin',`<td>Me puedes encontrar en <a style ="color:black" class="inputs" href ="${JSON.parse(userActive.social)[index]['link']}" id="sociallink${index}">${JSON.parse(userActive.social)[index]['type']}</a></td>`);
    
};

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

document.getElementById('acceptChangesButton').addEventListener('click', ()=> {

    let lenguages = [];
    
    for (let index = 0; index < document.getElementById('tableLenguages').rows.length-1; index++) {
 
        let lenguage = document.getElementById(`lenguageinput${index}`).value;
        let experience = document.getElementById(`lenguageexperienceinput${index}`).value;
        console.log(index,lenguage,experience);
        lenguages.push({lenguage:lenguage,experience:experience})
    }
    userActive.lenguages = JSON.stringify(lenguages);

    let studies = [];
    for (let index = 0; index < document.getElementById('tableStudies').rows.length - 1; index++) {
        
        let study = document.getElementById(`studyinput${index}`).value;
        let experience = document.getElementById(`studyexperienceinput${index}`).value;
        let degree = document.getElementById(`studydegreeinput${index}`).value;
        studies.push({title:study,experience:experience,degree:degree})
        
    }
    userActive.education = JSON.stringify(studies);

    let hobbies = [];
    for (let index = 0; index < document.getElementById('tableHobbies').rows.length-1; index++) {
        let title = document.getElementById(`hobbieinput${index}`).value;
        let experience = Number.parseFloat(document.getElementById(`hobbieexperienceinput${index}`).value)
        hobbies.push({title:title,experience:experience});
    }
    userActive.hobbies = JSON.stringify(hobbies);

    let socials =[]
    for (let index = 0; index < document.getElementById('tableSocials').rows.length - 1; index++) {
        if(index>=JSON.parse(userActive.social).length){
            userActive.addSocial(document.getElementById(`socialinput${index}`).value,document.getElementById(`sociallinkinput${index}`).value);
            socials.push({title:document.getElementById(`socialinput${index}`).value,link:document.getElementById(`sociallinkinput${index}`).value})
        }
    }
    
    
})