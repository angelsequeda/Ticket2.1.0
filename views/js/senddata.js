export class Savedata {

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
}


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
    }

};



export class DeleteData {
    
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
    }
}