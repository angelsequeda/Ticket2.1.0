
import { RetrieveData  } from "../senddata.js";


document.getElementById('buttonAcceptLoginEvaluator').addEventListener('click', async()=> {

  let username =  document.getElementById('usernameLoginInput').value;
  let password =  document.getElementById('passwordLoginInput').value

  let result = await RetrieveData.getEvaluator(username,password);

  
});