let userActive = JSON.parse(localStorage.getItem('useractive'));
console.log(userActive.data.username);
document.getElementById('usernameprofile').value = userActive.data.username;
document.getElementById('nameprofile').value = userActive.data.name;
document.getElementById('ageprofile').value = userActive.data.age + ' años';
document.getElementById('countryprofile').value = userActive.data.country;
document.getElementById('cityprofile').value = userActive.data.city;


document.getElementById('editButton').addEventListener('click', ()=> {

    let list = ['Lenguage','Social','Hobbie','Study'];
    let list2 = ['username','name','age','country','city'];

    list.forEach((element)=> {
        document.getElementById('add'+element).hidden = false;
        document.getElementById('delete'+element).hidden = false;
    });

    list2.forEach((element) => {
        document.getElementById(element+'profile').disabled = false;
    })
})