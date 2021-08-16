import { Company, Evaluator, Tecler } from "./classes.js";
import { RetrieveData, Savedata } from "./senddata.js";

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
    newTecler.profilePhoto = document.getElementById('photoRegistertecler').value;

    
    let newTeclerInfo = new Tecler(newTecler);
    newTeclerInfo.role = 'tecler'
    let saved = await Savedata.saveTecler(newTeclerInfo);
    console.log(saved);
});

document.getElementById('acceptRegisterButtonEvaluator').addEventListener('click', async ()=> {

    let newEvaluator ={};
    newEvaluator.name = document.getElementById('nameRegisterevaluator').value;
    newEvaluator.profilePhoto = document.getElementById('photoRegisterevaluator').value;
    newEvaluator.tellUsSomething = document.getElementById('tellusRegisterevaluator').value;
    newEvaluator.password = document.getElementById('passwordRegisterevaluator').value;
    newEvaluator.username = document.getElementById('usernameRegisterevaluator').value;
    newEvaluator.mail = document.getElementById('mailRegisterevaluator').value;
    newEvaluator.job = document.getElementById('jobRegisterevaluator').value

    let newEvaluatorInfo = new Evaluator(newEvaluator);
    newEvaluatorInfo.role = 'evaluator';
    let result = await Savedata.saveEvaluator(newEvaluatorInfo);
    console.log(result);

});

document.getElementById('acceptRegisterButtonCompany').addEventListener('click', async ()=> {

    let newCompany = {};

    newCompany.name = document.getElementById('nameRegistercompany').value;
    newCompany.companyName = document.getElementById('companynameRegistercompany').value;
    newCompany.job =document.getElementById('jobRegistercompany').value;
    newCompany.mail =document.getElementById('mailRegistercompany').value;
    newCompany.password = document.getElementById('passwordRegistercompany').value;
    newCompany.profilePhoto = document.getElementById('photoRegistercompany').value;
    newCompany.role = 'company';
    newCompany.username = document.getElementById('usernameRegistercompany').value

    let newCompanyInfo = new Company(newCompany);
    let result = await Savedata.saveCompany(newCompanyInfo);
    console.log(result);
});


document.getElementById('buttonAcceptLoginTecler').addEventListener('click',async()=> {

    let username =  document.getElementById('usernameLoginInput').value;
    let password =  document.getElementById('passwordLoginInput').value
    
    
    let result = await RetrieveData.getTecler(username,password);
    console.log(result);
    

    if(result.message === 'correcto'){
        console.log(result);
        result.result.password = password;
        localStorage.setItem('useractive',JSON.stringify({data:result.result,token:result.token,extraInfo : result.extras}));
        window.open('../html/profiletecler.html','_self');
    }else {
        alert(result.message)
    }

});

document.getElementById('buttonAcceptLoginEvaluator').addEventListener('click', async()=> {

    let username =  document.getElementById('usernameLoginInput').value;
    let password =  document.getElementById('passwordLoginInput').value

    let result = await RetrieveData.getEvaluator(username,password);
    console.log(result);
    
});

document.getElementById('buttonAcceptLoginCompany').addEventListener('click', async()=> {

    let username =  document.getElementById('usernameLoginInput').value;
    let password =  document.getElementById('passwordLoginInput').value;

    let result = await RetrieveData.getCompany(username,password);
    console.log(result);
});
