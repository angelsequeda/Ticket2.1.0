
import { RetrieveData, Savedata } from "../senddata.js";

document.getElementById('buttonAcceptLoginTecler').addEventListener('click', async () => {
  setTimeout(() => {
    window.location = 'http://localhost:3000/perfiltecler'
  }, 1000);

  let username = document.getElementById('usernameLoginInput').value;
  let password = document.getElementById('passwordLoginInput').value


  let result = await RetrieveData.getTecler(username, password);
  localStorage.setItem('datos', JSON.stringify(result.result))
  localStorage.setItem('evaluaciones', JSON.stringify(result.extras))
  console.log(result)

  if (result.message === 'correcto') {
    result.result.password = password;
    sessionStorage.setItem('useractive',JSON.stringify({data:result.result,token:result.token,extraInfo : result.extras}));
    localStorage.setItem('resultado', JSON.stringify(result))
  } else {
    alert(result.message)
  }

});
