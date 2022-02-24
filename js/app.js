// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')

// Eventos

eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}


// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante =  Number(presupuesto);
        this.gastos = []
    }
}


class UI {
    insertarPresupuesto ( cantidad ) {
        const {presupuesto , restante} = cantidad //!destructuring
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }
}

//Instacnias   
const ui = new UI();

let presupuesto;


// Funciones
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('Cual es tu presupuesto', 0);
    
    if ( presupuestoUsuario === '' ||  presupuestoUsuario === null || isNaN(presupuestoUsuario) ||  presupuestoUsuario <= 0 ) {
        window.location.reload();
    } 

    // Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);

    ui.insertarPresupuesto( presupuesto );
}

