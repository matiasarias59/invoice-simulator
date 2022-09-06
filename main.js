//Funcion para ingresar datos de cliente
const ingresarDatoCliente = (dato) => {
    return prompt("Ingrese el " + dato + " del cliente");
}

// Funcion Consulta si es presupuesto
function consultarPresupuesto(){
    while(esPresupuesto!=="1" && esPresupuesto!=="2"){
        esPresupuesto = prompt("Ingrese la opcion que desea crear: \n1-Presupuesto\n2-Nota de Venta");
        if(esPresupuesto=="1"){
            vencimiento = parseInt(prompt("Ingrese los días de validez"));
        }else if (esPresupuesto=="2"){
            vencimiento = "";
        }else{
            alert("Ingrese una opción valida");
        }
    }

}

class Client{
    constructor(nomb, dni, tel, mail, dir){
        this.nomb = nomb;
        this.dni = dni;
        this.tel = tel;
        this.mail = mail;
        this.dir = dir;
    }   
}

//main
//Ingrso datos cliente
let nomb = ingresarDatoCliente("nombre");
let dni = ingresarDatoCliente("DNI");
let tel = ingresarDatoCliente("telefono");
let mail = ingresarDatoCliente("e-mail");
let dir = ingresarDatoCliente("domicilio");
let esPresupuesto;
let vencimiento;
consultarPresupuesto();

// ingreso de productos

let cant;
let nombreProducto;
let iva;
let precioProducto;
let ivaTotal = 0;
let precioTotal = 0;
let totalItems = "";
let ingresoProducto = true;
let seguirAgregando;
let productoCorrecto;

while(ingresoProducto == true){
    cant = parseInt(prompt("Ingrese cantidad: "));
    nombreProducto = prompt("Ingrese nombre del producto: ");
    precioProducto = parseFloat(prompt("Ingrese el precio (IVA incluido): "));
    iva = parseFloat(prompt("Ingrese el % de IVA: "));

    productoCorrecto="";

    while(productoCorrecto !== "Y" && productoCorrecto !== "N"){
    
        productoCorrecto = prompt("Ingresó:\n" + cant + " " + nombreProducto + " " + iva + "%" + " " + "$" + precioProducto + "\n ¿Y o N?");
        productoCorrecto = productoCorrecto.toUpperCase();

        if(productoCorrecto == "Y"){
            precioTotal = precioTotal + cant * precioProducto;
            ivaTotal = ivaTotal + cant * precioProducto * iva / 100;

            totalItems += cant + " " + nombreProducto + " " + iva + "%" + " " + "$" + precioProducto + " " + "$" + precioProducto * cant + "\n";
            
            seguirAgregando = "";
            while(seguirAgregando !== "Y" && seguirAgregando !== "N"){
                seguirAgregando = prompt("¿Desea agregar mas elementos? Y o N: ");
                seguirAgregando = seguirAgregando.toUpperCase();
                if(seguirAgregando == "N"){
                    ingresoProducto = false;
                }else if(seguirAgregando== "Y"){
                    continue;
                }else{
                    alert("Ingrese una opción valida");
                }
            }
        }else if (productoCorrecto == "N"){
            continue;
        }else{
            alert("Ingrese una opción valida");
        }
    }

}

//muestra resumen final

if(esPresupuesto=="1"){
    alert("Nombre: " + nomb + "\nDNI: " + dni + "\nTelefono: " + tel + "\nE-mail: " + mail + "\nDomicilio: " + dir + "\nValidez: " + vencimiento + " días\n \n" + totalItems + "\n \nTotal IVA: $" + ivaTotal + "\nTotal: $" + precioTotal);
}else{
    alert("Nombre: " + nomb + "\nDNI: " + dni + "\nTelefono: " + tel + "\nE-mail: " + mail + "\nDomicilio: " + dir + "\n \n" + totalItems + "\n \nTotal IVA: $" + ivaTotal + "\nTotal: $" + precioTotal);
}



