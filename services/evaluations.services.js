//Los servicios necesarios para las evaluaciones de los teclers

const companyModel = require("../models/company.model");
const evaluatorModel = require("../models/evaluator.model");
const knowledgeModel = require("../models/knowledge.model");
const performanceModel = require("../models/performance.model");
const profesionalEnviromentModel = require("../models/profesional.model");
const softSkillsMOdel = require("../models/softskills.model");
const technologyModel = require("../models/technologies.model");
const teclerModel = require("../models/tecler.model");

//Dependiendo de lo que se envia en el sistema es el modelo de la base de datos a la que se agrega la evaluacion
//Cada evaluacion va en forma de una lista con las evaluaciones del cero al cinco de cada aspecto
module.exports.newEvaluationService = async (data) => {

    try {
        let evaluator = data.fromwho;
        let evaluated = data.towho;
        if(data.knowledge){
            await knowledgeModel.create({fromwho: evaluator,towho: evaluated,namefrom:data.namefrom,nameto:data.nameto, databaseKnowledge: data.knowledge[0],apis: data.knowledge[1], testing:data.knowledge[2], security: data.knowledge[3],objectTeory: data.knowledge[4]});
        }
        if(data.technologies){
            await technologyModel.create({fromwho: evaluator,towho: evaluated,namefrom:data.namefrom,nameto:data.nameto,nodejs: data.technologies[0],frontend:data.technologies[1],swagger: data.technologies[2],javascript: data.technologies[3]});
        }
        if(data.performance) {
            await performanceModel.create({fromwho: evaluator,towho: evaluated,namefrom:data.namefrom,nameto:data.nameto, codequality: data.performance[0],speed: data.performance[1], codePerformance: data.performance[2]});
        }
        
        if(data.soft) {
            await softSkillsMOdel.create({fromwho: evaluator,towho:evaluated,namefrom:data.namefrom,nameto:data.nameto, focus: data.soft[0], teamWork: data.soft[1], compromise: data.soft[2], communication: data.soft[3], learningSkill: data.soft[4],problemResolution: data.soft[5]});
        }
        if(data.profesional) {
            await profesionalEnviromentModel.create({fromwho: evaluator, towho: evaluated,namefrom:data.namefrom,nameto:data.nameto,github: data.profesional[0],trello_jira: data.profesional[1],Slack: data.profesional[2],agile: data.profesional[3]} );
        return({message:'correcto'});
        }
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al subir evaluacion [evaluations.services.js]');
    }

};

//Se puede buscar una evaluacion por criterio (creador, a quien se evaluo, etc.)
module.exports.searchEvaluationByCriteria = async (criteria) => {
    try {
        let knowledges = await knowledgeModel.findAll({where : criteria,raw: true});
        let technologies = await technologyModel.findAll({where : criteria,raw: true});
        let softskills = await softSkillsMOdel.findAll({where : criteria, raw: true});
        let performance = await performanceModel.findAll({where : criteria , raw: true});
        let profesional = await profesionalEnviromentModel.findAll({where : criteria, raw: true});
        let result = {knowledges,technologies,softskills,performance,profesional};
        return result;

    } catch (error) {
        console.log(error.message);
        throw new Error('Error al buscar evaluaciones [evaluations.services.js]');
    }
}

//Eliminar todas las evaluaciones por un tecler
module.exports.deleteAllEvaluationsService = async(data) => {
    try {
        await knowledgeModel.destroy({where :{ towho : data.idTecler}});
        await technologyModel.destroy({where :{ towho : data.idTecler}});
        await softSkillsMOdel.destroy({where :{ towho : data.idTecler}});
        await performanceModel.destroy({where :{ towho : data.idTecler}});
        await profesionalEnviromentModel.destroy({where :{ towho : data.idTecler}});
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al eliminar todas las evaluaciones [evaluations.services]')
    }
};

//Buscar a todas las personas del sistema (incluyendo evaluaciones del tecler)
module.exports.seeAllPeople = async () => {
    try {
        let teclers = await teclerModel.findAll({attributes:{exclude: ['password','num_usuario']}, where: {active : 1}});
        let companies = await companyModel.findAll({attributes:{exclude:['password','companynumber']}, where: {active : 1}});
        let evaluators = await evaluatorModel.findAll({attributes: {exclude:['password','evaluatorNumber']}, where: {active : 1}});
        return {teclers,companies,evaluators};
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al buscar todos los usuarios [evaluations.services]')
    }
};
//Eliminar las evaluaciones por parte de un evaluador
module.exports.deleteEvaluationByEvaluatorService = async(data) => {
    try {
        if(data.type === "knowledge"){
            await knowledgeModel.destroy({where : {fromwho : data.fromwho, towho:data.towho}});
        }else if(data.type === "technology") {
            await technologyModel.destroy({where : {fromwho : data.fromwho, towho:data.towho}});
        }else if(data.type === "performance"){
            await performanceModel.destroy({where : {fromwho : data.fromwho, towho:data.towho}});
        }else if(data.type === "softskills"){
            await softSkillsMOdel.destroy({where : {fromwho : data.fromwho, towho:data.towho}});
        }else if(data.type === "profesional") {
            await profesionalEnviromentModel.destroy({where : {fromwho : data.fromwho, towho:data.towho}});
        }
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al borrar evaluacion [evaluations.services]');
    }
};
//Actualizar una evaluacion
module.exports.updateEvaluations = async(data) => {
    try {
        let evaluator = data.fromwho;
        let evaluated = data.towho;
        if(data.knowledge){ 
            await knowledgeModel.update({databaseKnowledge: data.knowledge[0],apis: data.knowledge[1], testing:data.knowledge[2], security: data.knowledge[3],objectTeory: data.knowledge[4]},{where : {fromwho: evaluator,towho: evaluated}});
        };
        if(data.technologies){
            await technologyModel.update({nodejs: data.technologies[0],frontend:data.technologies[1],swagger: data.technologies[2],javascript: data.technologies[3]},{where : {fromwho: evaluator,towho: evaluated}});
        };
        if(data.performance) {
            await performanceModel.update({ codequality: data.performance[0],speed: data.performance[1], codePerformance: data.performance[2]},{where : {fromwho: evaluator,towho: evaluated}});
        };
        if(data.soft) {
            await softSkillsMOdel.update({ focus: data.soft[0], teamWork: data.soft[1], compromise: data.soft[2], communication: data.soft[3], learningSkill: data.soft[4],problemResolution: data.soft[5]},{where : {fromwho: evaluator,towho:evaluated}});
        };
        if(data.profesional) {
            await profesionalEnviromentModel.update({nameto:data.nameto,github: data.profesional[0],trello_jira: data.profesional[1],Slack: data.profesional[2],agile: data.profesional[3]}, {where : {fromwho: evaluator, towho: evaluated}} );
        };
    } catch (error) {
        console.log(error);
        throw new Error('Error al actualizar evaluacion [evaluation.services]');
    }
}