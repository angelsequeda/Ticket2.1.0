//En este archivo hay clases que ayudan a la renderizacion de cada una de las paginas distintas

export class Renderizer {


    static async addRowTotable(table,name) {
        let newRow = document.createElement('tr');
        newRow.id = name;
        document.getElementById(table).appendChild(newRow);
    };

    static async deleteRowFromTable(table){
        document.getElementById(table).lastChild.remove();
    }
}