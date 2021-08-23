import { Company } from "../classes.js";
import { RetrieveData, Savedata } from "../senddata.js";



document.getElementById('buttonAcceptLoginCompany').addEventListener('click', async()=> {

  let username =  document.getElementById('usernameLoginInput').value;
  let password =  document.getElementById('passwordLoginInput').value;

  let result = await RetrieveData.getCompany(username,password);

});
