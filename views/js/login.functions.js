//Como el login implica varias animaciones, se separa en funciones e interacciones dependiendo
//Las funciones son las necesarias para hacer validaciones y busquedas desde el front
import { Company, Evaluator, Tecler } from "./classes.js";
import { RetrieveData, Savedata } from "./senddata.js";


//Si se registra un tecler
document.getElementById('acceptRegisterButtonTecler').addEventListener('click',async ()=>{

    let newTecler ={};

    newTecler.name = document.getElementById('nameRegistertecler').value;
    newTecler.age = document.getElementById('ageRegsitertecler').value;
    newTecler.mail = document.getElementById('mailRegistertecler').value;
    newTecler.username = document.getElementById('usernameRegistertecler').value;
    newTecler.password = document.getElementById('passwordRegistertecler').value;
    newTecler.tellUsSomething = document.getElementById('tellusRegistertecler').value;
    newTecler.city = document.getElementById('cityRegistertecler').value;
    newTecler.country = document.getElementById('countryRegistertecler').value;
    
    
    let newTeclerInfo = new Tecler(newTecler);
    newTeclerInfo.role = 'tecler';
    await Savedata.saveSomeonePhoto(newTeclerInfo,document.getElementById('image').files[0]).then(async ()=>{
        let result = await Savedata.saveTecler(newTeclerInfo);
        if(result.message === "correcto"){
            alert('Bienvenido, favor de iniciar sesión');
        }else {
            alert(result.message);
        }
    })
    
});


//Si se registra un evaluador
document.getElementById('acceptRegisterButtonEvaluator').addEventListener('click', async ()=> {

    let newEvaluator ={};
    newEvaluator.name = document.getElementById('nameRegisterevaluator').value;
    newEvaluator.tellUsSomething = document.getElementById('tellusRegisterevaluator').value;
    newEvaluator.password = document.getElementById('passwordRegisterevaluator').value;
    newEvaluator.username = document.getElementById('usernameRegisterevaluator').value;
    newEvaluator.mail = document.getElementById('mailRegisterevaluator').value;
    newEvaluator.job = document.getElementById('jobRegisterevaluator').value

    let newEvaluatorInfo = new Evaluator(newEvaluator);
    newEvaluatorInfo.role = 'evaluator';
    
    await Savedata.saveSomeonePhoto(newEvaluatorInfo,document.getElementById('image2').files[0]).then(async()=> {
        let result = await Savedata.saveEvaluator(newEvaluatorInfo);
        if(result.message === "correcto"){
            alert('Bienvenido, favor de iniciar sesión');
        }else {
            alert(result.message);
        }
    });

});
//Si se registra un colaborador de alguna compañia
document.getElementById('acceptRegisterButtonCompany').addEventListener('click', async ()=> {

    let newCompany = {};

    newCompany.name = document.getElementById('nameRegistercompany').value;
    newCompany.companyName = document.getElementById('companynameRegistercompany').value;
    newCompany.job =document.getElementById('jobRegistercompany').value;
    newCompany.mail =document.getElementById('mailRegistercompany').value;
    newCompany.password = document.getElementById('passwordRegistercompany').value;

    newCompany.role = 'company';
    newCompany.username = document.getElementById('usernameRegistercompany').value
    let newCompanyInfo = new Company(newCompany);
    await Savedata.saveSomeonePhoto(newCompanyInfo,document.getElementById('image3').files[0]).then(async()=> {
        let result = await Savedata.saveCompany(newCompanyInfo);
        if(result.message === "correcto"){
            alert('Bienvenido, favor de iniciar sesión');
        }else {
            alert(result.message);
        }
    })
    
});

//Aunque el login es el mismo formato para todos, cada uno apunta a un endopoint distinto
document.getElementById('buttonAcceptLoginTecler').addEventListener('click',async()=> {

    let username =  document.getElementById('usernameLoginInput').value;
    let password =  document.getElementById('passwordLoginInput').value
    
    
    let result = await RetrieveData.getTecler(username,password);

    

    if(result.message === 'correcto'){
        console.log(result);
        result.result.password = password;
        sessionStorage.setItem('useractive',JSON.stringify({data:result.result,token:result.token,extraInfo : result.extras}));
        window.open('../html/profiletecler.html','_self');
    }else {
        alert(result.message)
    }

});

document.getElementById('buttonAcceptLoginEvaluator').addEventListener('click', async()=> {

    let username =  document.getElementById('usernameLoginInput').value;
    let password =  document.getElementById('passwordLoginInput').value

    let result = await RetrieveData.getEvaluator(username,password);
    if(result.message === 'correcto') {
        console.log(result);
        result.result.password = password;
        sessionStorage.setItem('useractive',JSON.stringify({data : result.result,token : result.token}));
        window.open('../html/profileevaluator.html','_self');
    }
    
});

document.getElementById('buttonAcceptLoginCompany').addEventListener('click', async()=> {

    let username =  document.getElementById('usernameLoginInput').value;
    let password =  document.getElementById('passwordLoginInput').value;

    let result = await RetrieveData.getCompany(username,password);
    if(result.message === 'correcto'){
        sessionStorage.setItem('useractive',JSON.stringify({data : result.result,token : result.token}));
        window.open('../html/profilecompany.html','_self');
    }
});
