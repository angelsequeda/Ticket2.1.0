
import { Company} from "../classes.js";
import { RetrieveData, Savedata } from "../senddata.js";


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
