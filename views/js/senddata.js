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
    }
}


export class RetrieveData {
    
    static async getTecler(teclerUsername,teclerPassword){
        console.log(teclerUsername,teclerPassword);
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

    }
}