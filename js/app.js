/************** ( '// Variables y Selectores' ) **************/
const formulario = document.querySelector('#agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')

/************** ( '// Eventos' ) **************/

eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);
}

/************** ( '// Clases' ) **************/
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante =  Number(presupuesto);
        this.gastos = [];
    }
}


class UI {
    insertarPresupuesto ( cantidad ) {
        //Extraer valor
        const {presupuesto , restante} = cantidad; //!destructuring
        //Agregar al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta (mensaje, tipo) {
        // Crear el div
        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('text-center', 'alert');

        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        //agregar mensaje error
        divMensaje.textContent = mensaje;

        //insertar en html
        document.querySelector('.primario').insertBefore(divMensaje , formulario);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    } 
}

/************** ( '// Instancias' ) **************/
const ui = new UI();
let presupuesto;


/************** ( '// Funciones' ) **************/

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('Cual es tu presupuesto', 0);
    
    if ( presupuestoUsuario === '' ||  presupuestoUsuario === null || isNaN(presupuestoUsuario) ||  presupuestoUsuario <= 0 ) {
        window.location.reload();
    } 

    // Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);

    ui.insertarPresupuesto( presupuesto );
}

//añade gasto
function agregarGasto(e) {
    e.preventDefault;

    // Ller datos form
    const nombre = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;

    //validar 
    if ( nombre === '' || cantidad === ''){
        ui.imprimirAlerta('Ambos campos son Obligatorios', 'error');
    } else if ( cantidad <= 0 || isNaN(cantidad) ) {
        ui.imprimirAlerta('Cantidad no valida', 'error');

        return;
    }

    console.log('Agregnado Gasto');
}