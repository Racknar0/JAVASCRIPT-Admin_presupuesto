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

    nuevoGasto(gasto) {
       this.gastos = [...this.gastos , gasto];
       this.calcularRestante( );
    }

    calcularRestante( ) {
        const gastado = this.gastos.reduce( (total, gasto) => total + gasto.cantidad, 0 )
        this.restante = this.presupuesto - gastado;
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

    agregarGastoListado(gastos) {
        
            this.limpiarHTML();

            // Iterar sobre gastos
            gastos.forEach(gasto => {
            const {cantidad , nombre , id} = gasto;

            
            // Crear LI
            const nuevoGasto = document.createElement('LI');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            
            // Add HTML del gasto
            nuevoGasto.innerHTML = ` ${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad}</span>`

            // Btn del gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            nuevoGasto.appendChild(btnBorrar)
            btnBorrar.innerHTML = 'Borrar &times'

            //agregar al html
            gastoListado.appendChild(nuevoGasto);
        });
    }

    //limpia html
    limpiarHTML() {
    while(gastoListado.firstChild) {
        gastoListado.removeChild(gastoListado.firstChild);
    }}

    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestoObj) {
        const {presupuesto , restante} = presupuestoObj; 
        const restanteDiv = document.querySelector('.restante')

    // Comprobar 25%
    if ( ( presupuesto / 4 ) > restante ) {
        restanteDiv.classList.remove('alert-success','alert-warning');
        restanteDiv.classList.add('alert-danger');
    } else if ( ( presupuesto / 2 ) > restante ) {
        restanteDiv.classList.remove('alert-success');
        restanteDiv.classList.add('alert-warning');
    }
    
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
    const cantidad = Number (document.querySelector('#cantidad').value);

    //validar 
    if ( nombre === '' || cantidad === ''){
        ui.imprimirAlerta('Ambos campos son Obligatorios', 'error');
    } else if ( cantidad <= 0 || isNaN(cantidad) ) {
        ui.imprimirAlerta('Cantidad no valida', 'error');

        return;
    }

    // Generar Objeto con el gasto
    const gasto = { nombre, cantidad, id: Date.now() }

    //añade nuevo gasto
    presupuesto.nuevoGasto( gasto );

    // Mensaje todo good
    ui.imprimirAlerta('Gasto Agregado Correctamente');

    //Imprimir los gastos
    const { gastos , restante } = presupuesto;
    ui.agregarGastoListado(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);

    //Reinicia el form
    formulario.reset();
}

