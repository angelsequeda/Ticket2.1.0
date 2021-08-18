const companyModel = require("../models/company.model");
const evaluatorModel = require("../models/evaluator.model");
const knowledgeModel = require("../models/knowledge.model");
const performanceModel = require("../models/performance.model");
const profesionalEnviromentModel = require("../models/profesional.model");
const softSkillsMOdel = require("../models/softskills.model");
const technologyModel = require("../models/technologies.model");
const teclerModel = require("../models/tecler.model");


module.exports.newEvaluationService = async (data) => {

    try {
        let evaluator = data.fromwho;
        let evaluated = data.towho;
        if(data.knowledge){
            await knowledgeModel.create({fromwho: evaluator,towho: evaluated,namefrom:data.namefrom,nameto:data.nameto, database: data.knowledge[0],apis: data.knowledge[1], testing:data.knowledge[2], security: data.knowledge[3],objectTeory: data.knowledge[4]});
        }
        if(data.technologies){
            await technologyModel.create({fromwho: evaluator,towho: evaluated,namefrom:data.namefrom,nameto:data.nameto,nodejs: data.technologies[0],frontend:data.technologies[1],swagger: data.technologies[2],javascript: data.technologies[3]});
        }
        if(data.performance) {
            await performanceModel.create({fromwho: evaluator,towho: evaluated,namefrom:data.namefrom,nameto:data.nameto, codequality: data.performance[0],speed: data.performance[1], codePerformance: data.performance[2]});
        }
        
        if(data.soft) {
            await softSkillsMOdel.create({fromwho: evaluator,towho:evaluated,namefrom:data.namefrom,nameto:data.nameto, focus: data.soft[0], teamWork: data.soft[1], comprmise: data.soft[2], communication: data.soft[3], learningSkill: data.soft[4],problemResolution: data.soft[5]});
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

module.exports.updateEvaluations = async(data) => {
    try {
        if(data.knowledge){ 
            await knowledgeModel.update({
                databaseKnowledge : data.knowledge.databaseKnowledge,
                apis : data.knowledge.apis,
                testing : data.knowledge.testing,
                security : data.knowledge.security,
                objectTeory : data.knowledge.objectTeory
            }, {
                where : {
                    fromwho : data.fromwho,
                    towho : data.towho
                }
            })
        };
        if(data.technology){
            await technologyModel.update({
                nodejs : data.technology.nodejs,
                swagger : data.technology.swagger,
                frontend : data.technology.frontend,
                javascript : data.javascript
            },{
                where : {
                    fromwho : data.fromwho,
                    towho : data.towho
                }
            })
        };
        if(data.performance) {
            await performanceModel.update({
                codequality : data.performance.codequality,
                speed : data.performance.speed,
                codePerformance : data.performance.codePerformance
            },{
                where : {
                    fromwho : data.fromwho,
                    towho : data.towho
                }
            })
        };
        if(data.softskills) {
            await softSkillsMOdel.update({
                focus : data.focus,
                teamWork : data.teamWork,
                compromise : data.compromise,
                communication : data.communication,
                learningSkill : data.learningSkill,
                problemResolution : data.problemResolution
            },{
                where : {
                    fromwho : data.fromwho,
                    towho : data.towho
                }
            })
        };
        if(data.profesional) {
            await profesionalEnviromentModel.update({
                github : data.github,
                trello_jira : data.trello_jira,
                Slack : data.Slack,
                agile : data.agile
            } ,{
                where : {
                    fromwho : data.fromwho,
                    towho : data.towho
                }
            })
        };
    } catch (error) {
        console.log(error);
        throw new Error('Error al actualizar evaluacion [evaluation.services]');
    }
}