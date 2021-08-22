//La clase savedata es para subir o actualizar cualquier dato a usar
export class Savedata {
    //registrar un tecler
    static async saveTecler(tecler) {

        let result = await fetch('http://localhost:3000/teclers/new',{
            method: 'POST',
            headers:{
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tecler)
        });
        return result.json();
    };
    //registrar un evaluador
    static async saveEvaluator(evaluator) {
        let result = await fetch('http://localhost:3000/teclapartners/new',{
            method: 'POST',
            headers:{
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(evaluator)
        });
        return result.json();
    };

    //registrar un colaborador de una compañia
    static async saveCompany(company) {
        let result = await fetch('http://localhost:3000/companies/new',{
            method: 'POST',
            headers:{
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(company)
        });
        return result.json();
    };


    //actualizar informacion de un tecler
    static async updateTecler(tecler) {
        let result = await fetch('http://localhost:3000/teclers/actualize', {
            method:'PUT',
            headers:{
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({data: tecler.data, token: tecler.token, extraInfo : tecler.extraInfo})
        });
        return result.json();
    };

    //Enviar una nueva evaluacion usando el tipo de evaluacion y el token del usuario
    //evaluation debe contener (towho,fromwho,nameto,namefrom) y la evaluacion con su nombre (knowledge, technology,
    //soft,profesional,performance), solo una a la vez
    static async sendNewEvaluation(evaluation,token){
        let result = await fetch('http://localhost:3000/evaluations/new',{
            method : 'POST',
            headers:{
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                token : token,
                evaluation : evaluation
            })
        });
        return result.json();
    };
    
    static async sendNewComment(namefrom,nameto,idfrom,idto,comment,token) {
        let result = await fetch('http://localhost:3000/friendscomments/newcomment', {
            method : 'POST',
            headers:{
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id1 : idfrom,
                id2 : idto,
                name1 : namefrom,
                name2 : nameto,
                commentary : comment,
                token : token
            })
        });
        return result.json();
    };

    static async sendNewFriendRequest(fromwho,towho,namefrom,nameto,token){
        let result = await fetch('http://localhost:3000/friendscomments/newfriendship',{
            method : 'POST',
            headers:{
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                id1 : fromwho ,
                id2: towho,
                name1 : namefrom,
                name2 : nameto,
                token : token
            })
        });
        return result.json();
    };

    static async updateEvaluation(evaluation,token){
        let result = await fetch('http://localhost:3000/evaluations/update',{
            method : 'POST',
            headers:{
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                token : token,
                evaluation : evaluation
            })
        });
        return result.json();
    };

    static async sendNewOffer(nameto,namefrom,fromwho,towho,salary,job,ofer,token){
        let result = await fetch('http://localhost:3000/offers/new',{
            method : 'POST',
            headers:{
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                nameto : nameto,
                namefrom : namefrom,
                fromwho : fromwho,
                towho : towho,
                salary : salary,
                job : job,
                ofer : ofer,
                token: token
            })
        });
        return result.json();
    };

    static async sendNewAnswerToOffer(id,fromwho,towho,answer,token){
        let result = await fetch('http://localhost:3000/offers/answer',{
            method : 'POST',
            headers:{
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                id : id,
                fromwho : fromwho,
                towho : towho,
                answer : answer,
                token : token
            })
        });
        return result.json();
    }
}

//Esta clase permite enviar datos desde el back hasta el frontend
export class RetrieveData {
    
    static async getTecler(teclerUsername,teclerPassword){
        let result = await fetch('http://localhost:3000/teclers/search',{
            method:'POST',
            headers:{
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: teclerUsername,
                password: teclerPassword,
                role: 'tecler'
            })
        });
        return result.json();

    };
    //Acceder a la informacion de otro tecler sin ser el tecler (no requiere contraseña pero tampoco la devuelve)
    static async getAnotherTecler(username) {
        let result = await fetch('http://localhost:3000/teclers/another', {
            method : 'POST',
            headers:{
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                username : username
            })
        });
        return result.json();
    }
    //Obtener informacion de un evaluador (requiere usuario y contraseña)
    static async getEvaluator(evaluatorUsername,evaluatorPassword){
        let result = await fetch('http://localhost:3000/teclapartners/search',{
            method:'POST',
            headers:{
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: evaluatorUsername,
                password: evaluatorPassword,
                role: 'evaluator'
            })
        });
        return result.json();
    };

    //Obtener datos de un colaborador sin ser el colaborador (requiere usuario y contraseña)
    static async getCompany(companyUsername,companyPassword) {

        let result = await fetch('http://localhost:3000/companies/search',{
            method:'POST',
            headers:{
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: companyUsername,
                password: companyPassword,
                role: 'company'
            })
        });
        return result.json();

    };

    //Obtnener las evaluaciones usando el token y el id, si no hay un id se procede como si se tratara de un 
    //evaluador buscando una evaluacion
    static async getEvaluations(token,id) {
        if (!id) {
            console.log('no ok');
            let result = await fetch('http://localhost:3000/evaluations/download',{
                method: 'POST',
                headers:{
                    "Accept": "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({
                    token: token,
                })
            });
            return result.json();
        }else {
            console.log('ok');
            console.log(id);
            let result = await fetch('http://localhost:3000/evaluations/download',{
                method: 'POST',
                headers:{
                    "Accept": "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({
                    token: token,
                    idSearch : id
                })
            });
            return result.json();
        }
        
    };

    //Obtener los datos basicos de todos los usuarios (no incluye contraseñas)
    static async getEveryone(token) {
        let result = await fetch('http://localhost:3000/mainIndex',{
            method : 'GET',
            headers:{
                "Autorization" : token,
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
        });
        return result.json();
    };

    //Obtener todas las solicitudes de amistad de un usuario usando un teoken y el id del usuario a buscar
    static async getAllFrieds(token,id) {
        let result = await fetch('http://localhost:3000/friendscomments/getmyfriends',{
            method : 'POST',
            headers:{
                "Autorization" : token,
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body :JSON.stringify({
                token : token,
                id1 : id
            })
        });
        return result.json();
    };

    //recuperar todos los comentarios de una persona 
    static async findComments(id,token,criteria) {
        if(criteria === "forme" || criteria ==="mine"){
            let result = await fetch('http://localhost:3000/friendscomments/getmycomments', {
            method : 'post',
            headers : {
                'Accept' : 'application/json, text/plain, */*',
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({
                id1 : id,
                token : token,
                criteria : criteria
            })
            });
            return result.json();
        }else {
            throw new Error('Solo se admite criteria = "forme" o criteria = "mine');
        }
        
    };

    static async getAllMyOfers(id,token){
        let result = await fetch('http://localhost:3000/offers/getoffers',{
            method : 'POST',
            headers : {
                'Accept' : 'application/json, text/plain, */*',
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({
                id : id,
                token : token
            })
        });
        return result.json();
    }

};


//Esta clase permite eliminar datos de la base
export class DeleteData {
    
    //Eliminar un tecler
    static async deleteTecler(token,idTecler) {
        let result = await fetch('http://localhost:3000/teclers/delete',{
            method : 'DELETE',
            headers:{
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body :JSON.stringify ({
                token: token,
                idTecler : idTecler
            })
        });
        return result.json();
    };

    //Eliminar una evaluacion
    static async deleteEvaluation(token,fromwho,towho,type){
        let result = await fetch('http://localhost:3000/evaluations/delete', {
            method : 'POST',
            headers:{
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                token : token,
                fromwho : fromwho,
                towho : towho,
                type : type
            })
        });
        return result.json();
    };

    //Cambiar el estado de una solicitud de amistad 
    //token del usuario que elimina
    //fromwho : id de uno de los usuarios involucrados
    //towho : id del otro usuario
    //what : puede ser delete para eliminar la solicitud o accept para aceptarla
    static async changeFriendship(token,fromwho,towho,what) {
        let result = await fetch('http://localhost:3000/friendscomments/changefrienship',{
            method :'POST',
            headers:{
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                id1: fromwho,
                id2: towho,
                what : what,
                token : token
            })
        });
        return result.json();
    };

    ///Eliminar un comentario
    //id : id del comentario
    //id1 :id de uno de los involucrados
    //id2 : id del otro involucrado

    static async deleteComment(id,id1,id2,token){
        let result = await fetch('http://localhost:3000/friendscomments/deletecomment', {
            method : 'POST',
            headers:{
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                id1 : id1,
                id2 : id2,
                idcomment : id,
                token : token
            })
        });
        return result.json();
    };

    static async deleteOfer(id,fromwho,towho,token){
        let result = await fetch('http://localhost:3000/offers/delete', {
            method : 'POST',
            headers:{
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body : {
                id : id,
                fromwho : fromwho,
                towho : towho,
                token
            }
        });
        return result.json();
    }
}