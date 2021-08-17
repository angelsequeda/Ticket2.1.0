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


    static createCards(name,where,extraInfo,id,foto) {
        let division = document.createElement('div');
        division.className = 'card';
        division.style = "width: 18rem; margin-bottom:20px; height: 20rem"
        division.insertAdjacentHTML('afterbegin',`<img class="card-img-top" src="${foto}" alt="Card image cap" style="height:100px; width: 100px">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <a href="#" class="btn btn-primary" id=${id}>Ver</a>
        </div>`);
        if (extraInfo) {
            document.getElementById(id).insertAdjacentHTML('beforebegin',`<p>${extraInfo}</p>`)
        };
        document.getElementById(where).appendChild(division);
    };

    static openform(role,data) {
        if(role === 'tecler'){
            document.getElementById('formContainer').innerHTML = "";
            document.getElementById('formContainer').insertAdjacentHTML('afterbegin', `<p>${data.name}</p>
            <p>${data.age}</p>
            <p>${data.mail}</p>`);
            document.getElementById('formContainer').style.display = 'block';
        }
    }
    
};