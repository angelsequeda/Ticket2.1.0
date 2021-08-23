import { Evaluator } from "../classes.js";
import { RetrieveData, Savedata } from "../senddata.js";



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