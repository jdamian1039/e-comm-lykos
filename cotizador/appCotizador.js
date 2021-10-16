
const cotizarSeguro=()=>{
    let marca = document.querySelector("#marca").value;
    let anio = document.querySelector("#anio").value;
    let basico = document.querySelector("#basico");
    let completo = document.querySelector("#completo");

    let divResumen = document.querySelector("#resumen");
    let divResultado = document.querySelector("#resultado");
    divResultado.style.display="none";
   

    let plan="";

    if(basico.checked){
        plan="12hrs";
    }else if(completo.checked){
        plan="24hrs";
    }

    if(marca ===''|| 
        anio ===''|| 
        plan ===''){
        mostrarError("#msj-error-cotizador", "FALTAN OPCIONES POR SELECCIONAR");
        return;
    }

    let cotizacion={marca,anio,plan};
    document.querySelector("#msj").style.display="none";

    divResumen.style.backgroundColor="#fff";
    divResumen.style.display="block";

    divResumen.innerHTML=`<div style="text-align:center">
                            <img src="spinner.gif" width=300 height=300>
                        </div>`;
    
    setTimeout(()=>{
        divResumen.style.backgroundColor="#00838f";
        divResumen.innerHTML=`
                            <h2>Resumen de Cotización</h2>
                            <ul>
                                <li>Empresa: ${mayuscula(marca)}</li>
                                <li>Guardias: ${anio}</li>
                                <li>horario: ${mayuscula(plan)}</li>
                            </ul>
                            `;
                            
        let cotizacionFinal=cotizar(cotizacion);
        divResultado.style.display="block";
        divResultado.className="divResultado";
        divResultado.innerHTML=`<p class="textoCotizacion">$ ${cotizacionFinal}</p>`;

    },2000);


}

const cotizar=(cotizacion)=>{
    const {marca, anio, plan} = cotizacion;
    let resultado=2000;

    const diferenciaanio=diferencia(anio);
    resultado-=((diferenciaanio*3)*resultado)/100;

    resultado = calcularMarca(marca)*resultado;

    const incrementoPlan=obtenerPlan(plan);
    resultado=parseFloat(incrementoPlan*resultado).toFixed(2);
    return resultado;
}

const diferencia=anio=>{
    let gaurdian
    
    switch(anio){
        case '1': gaurdian = 1.10;break;
        case '2': gaurdian = 1.20;break;
        case '3': gaurdian = 1.30;break;
        case '4': gaurdian = 1.40;break;
        case '5': gaurdian = 1.50;break;
        case '6': gaurdian = 1.60;break;
        case '7': gaurdian = 1.70;break;
        case '8': gaurdian = 1.80;break;
        case '9': gaurdian = 1.90;break;
        case '10': gaurdian = 2.00;break;
        case '11': gaurdian = 2.10;break;
        case '12': gaurdian = 2.20;break;
    }

    return gaurdian;
}
const calcularMarca=marca=>{
    let incremento;

    switch(marca){
        case 'Pequegna': incremento=1.15; break;
        case 'Mediana': incremento=1.30; break;
        case 'Grande': incremento=1.05; break;
    }
    return incremento;
}
const obtenerPlan=plan=>{
    return (plan === 'basico')?1.20:1.50;
}



const mayuscula=(palabra)=>{
    return palabra.charAt(0).toUpperCase()+palabra.slice(1);
}

const mostrarError=(elemento, mensaje)=>{
    divError=document.querySelector(elemento);
    divError.innerHTML=`<p class="alert alert-danger error">${mensaje}</p>`;
    setTimeout(()=>{divError.innerHTML=``;}, 2000);
}