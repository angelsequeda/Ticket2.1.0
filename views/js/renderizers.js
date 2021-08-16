//En este archivo hay clases que ayudan a la renderizacion de cada pagina, asi como a recuperar la información de cada una

export class Renderizer {


    static  addRowTotable(table,name,criteria,inner) {
        let newRow = document.createElement('tr');
        newRow.id = name;
        document.getElementById(table).appendChild(newRow);
        document.getElementById(newRow.id).insertAdjacentHTML(criteria,inner);
    };

    static  deleteRowFromTable(table){
        if(document.getElementById(table).rows.length > 1) {
            document.getElementById(table).lastChild.remove();
        }
        
    };

    static saveDataFromInputs(tablename,list,keys,inputs) {
        
        for (let index = 0; index < document.getElementById(tablename).rows.length-1; index++) {
            let result = {};
            for(let j=0 ; j< keys.length; j++) {
                result[keys[j]] = document.getElementById(`${inputs[j]}${index}`).value;
            }
            list.push(result);
        };
    };
};