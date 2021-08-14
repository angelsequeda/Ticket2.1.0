const knowledgeModel = require("../models/knowledge.model");
const performanceModel = require("../models/performance.model");
const profesionalEnviromentModel = require("../models/profesional.model");
const softSkillsMOdel = require("../models/softskills.model");
const technologyModel = require("../models/technologies.model");


module.exports.newEvaluationService = async (data) => {

    try {
        let evaluator = data.fromwho;
        let evaluated = data.towho;
        await knowledgeModel.create({fromwho: evaluator,towho: evaluated, database: data.knowledge[0],apis: data.knowledge[1], testing:data.knowledge[2], security: data.knowledge[3],objectTeory: data.knowledge[4]});
        await technologyModel.create({fromwho: evaluator,towho: evaluated,nodejs: data.technologies[0],frontend:data.technologies[1],swagger: data.technologies[2],javascript: data.technologies[3]});
        await performanceModel.create({fromwho: evaluator,towho: evaluated, codequality: data.performance[0],speed: data.performance[1], codePerformance: data.performance[2]});
        await softSkillsMOdel.create({fromwho: evaluator,towho:evaluated, focus: data.soft[0], teamWork: data.soft[1], comprmise: data.soft[2], communication: data.soft[3], learningSkill: data.soft[4],problemResolution: data.soft[5]});
        await profesionalEnviromentModel.create({fromwho: evaluator, towho: evaluated,github: data.profesional[0],trello_jira: data.profesional[1],Slack: data.profesional[2],agile: data.profesional[3]} );
        return({message:'correcto'});
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al subir evaluacion [evaluations.services.js]');
    }

};

module.exports.searchEvaluationByCriteria = async (criteria) => {
    try {
        let knowledges = await knowledgeModel.findAll({where : criteria,raw: true});
        let technologies = await technologyModel.findAll({where : criteria,raw: true});
        let softskills = await softSkillsMOdel.findAll({where : criteria, raw: true});
        let performance = await performanceModel.findAll({where : criteria , raw: true});
        let profesional = await profesionalEnviromentModel.findAll({where : criteria});
        let result = {knowledges,technologies,softskills,performance,profesional};
        return result;

    } catch (error) {
        console.log(error.message);
        throw new Error('Error al buscar evaluaciones [evaluations.services.js]');
    }
}
/*
module.exports.searchEvaluationsByTeclerService = async(data) => {

    console.log(data);
    
}*/
/*
module.exports.searchEvaluationsByEvaluatorService = async(data) => {
    try {
        let knowledges = await knowledgeModel.findAll({where : {fromwho : data.idUser}});
        let technologies = await technologyModel.findAll({where : {fromwho: data.idUser}});
        let softskills = await softSkillsMOdel.findAll({where : {fromwho : data.idUser}});
        let performance = await performanceModel.findAll({where : {fromwho : data.idUser}});
        let profesional = await profesionalEnviromentModel.findAll({where : {fromwho : data.idUser}});
        let result = {knowledges:knowledges,technologies : technologies, softskills : softskills,performance : performance, profesional :profesional};
        return result;
    } catch (error) {
        console.log(error.message);
        throw new Error('Error al buscar evaluaciones [evaluaciones.services.js]');
    }
};
*/

module.exports.deleteEvaluationByEvaluatorService = async(data) => {

    try {
        if(data.role != 'evaluator') {
            throw new Error('Usuario no autorizado');
        }else {
            await knowledgeModel.destroy({where :{fromwho : data.idUser, towho : data.idDeleter}});
            await technologyModel.destroy({where :{fromwho : data.idUser, towho : data.idDeleter}});
            await softSkillsMOdel.destroy({where :{fromwho : data.idUser, towho : data.idDeleter}});
            await performanceModel.destroy({where :{fromwho : data.idUser, towho : data.idDeleter}});
            await profesionalEnviromentModel.destroy({where :{fromwho : data.idUser, towho : data.idDeleter}});
        }
    } catch (error) {
        
    }
};

