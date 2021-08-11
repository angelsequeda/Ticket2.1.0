document.getElementById('acceptRegisterButtonTecler').addEventListener('click',()=>{

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
    
});

document.getElementById('acceptRegisterButtonEvaluator').addEventListener('click', ()=> {

    newEvaluator ={};

})