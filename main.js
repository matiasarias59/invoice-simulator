//Funcion para ingresar datos de cliente
const ingresarDatoCliente = (dato) => {
    let input = prompt("Ingrese el " + dato + " del cliente");
    while(input == ""){
        alert("No puede dejar este campo vacio");
        input = ingresarDatoCliente(dato);
    }
    return input;  
}   
//Definicion Clase Cliente
class Client{
    constructor(nomb, dni, tel, mail, dir){
        this.nomb = nomb;
        this.dni = dni;
        this.tel = tel;
        this.mail = mail;
        this.dir = dir;
    }
    mostrar() {
        return ("Nombre: "+this.nomb+"\nDNI: "+this.dni+"\nTelefono: "+this.tel+"\nE-mail: "+this.mail+"\nDireccion: "+this.dir);
    }   
}
//Funcion ingresar Cliente
const ingresarCliente = () =>{
    const cliente = new Client(
        ingresarDatoCliente("Nombre"),
        ingresarDatoCliente("DNI"),
        ingresarDatoCliente("Telefono"),
        ingresarDatoCliente("E-mail"),
        ingresarDatoCliente("Domicilio"));
    return cliente;
}
// Definicion Clase Producto
class Product{
    constructor(cant, nomb, price, iva){
        this.cant = cant;
        this.nomb = nomb;
        this.price = price;
        this.iva = iva;
    }
    calcularIva(){
        return this.price * this.iva / 100;
    }
    calcularIvaTotal(){
        return this.cant * this.calcularIva();
    }
    calcularTotal(){
        return this.price * this.cant;
    }
    mostrar() {
        return ("Cantidad: "+this.cant+"\nProducto: "+this.nomb+"\nPrecio: "+this.price+"\nIVA: "+this.iva);
    } 
}
// Definicion de funciones para ingreso de produtos
const ingresoNro = (valor) =>{
    let cant = parseFloat(prompt(valor+": "));
    while(cant < 1 || isNaN(cant)){
        alert("Ingreso invalido");
        cant = ingresoNro(valor);
    }
    return cant;
}
const ingresoTexto = () =>{
    let input = prompt("Producto: ");
    while(input == ""){
        alert("No puede dejar este campo vacio");
        input = ingresarTexto();
    }
    return input;
}
// Definicion Funcion Crear producto
const ingresarProducto = () =>{
    const product = new Product(
        ingresoNro("Cantidad"),
        ingresoTexto(),
        ingresoNro("Precio"),
        ingresoNro("IVA"),
    );
    return product;
}
//Funcion pregunta si es presupuesto o nota de venta
const esPresupuesto = () =>{
    let opcion = parseInt(prompt("Seleccione una opción:\n1 - Nota de Venta\n2 - Presupuesto"));
    while(opcion !=1 && opcion !=2){
        alert("Opcion no valida. Intentelo de nuevo");
        opcion = parseInt(prompt("Seleccione una opción:\n1 - Nota de Venta\n2 - Presupuesto"));
    }
    if(opcion == 1){
        return false;
    }else{
        return true;
    }
}
// Funcion calcula iva total del carrito
const ivaCarrito = (carrito) =>{
    let sumaIva = 0;
    for(let i = 0; i < carrito.length; i++){
        sumaIva = sumaIva + carrito[i].calcularIvaTotal();
    }
    return sumaIva;
}
//Funcion calcula total del carrito
const totalCarrito = (carrito) =>{
    let sumaTotal = 0;
    for(let i = 0; i < carrito.length; i++){
        sumaTotal = sumaTotal + carrito[i].calcularTotal();
    }
    return sumaTotal;
}
// Definicion de Funcion para filtrar productos por cantidad maxima
const filtrarCantidad = (arr, cantMax) =>{
    const filtrado = arr.filter((el) => el.cant <= cantMax);
    return filtrado;
}

// Main

let fecha = new Date();
let presupuesto;
let validezPresupuesto;
let cliente;
let continuar; 
let producto;
let carrito = [];
let agregar = true;
let ivaFinal;
let totalFinal; 
let carritoFinal = "";

alert("Bienvenido! Puedes crear notas de venta o presupuestos.");

presupuesto = esPresupuesto();

if(presupuesto == true){
    do {
        validezPresupuesto = parseInt(prompt("Ingrese los dias de validez"))
    } while (validezPresupuesto <=0 || isNaN(validezPresupuesto));    
}

alert("Ingrese los datos del cliente");

while(continuar !=1){
    cliente = ingresarCliente();
    continuar = parseInt(prompt("Ingreso:\n" + cliente.mostrar() + "\nEs correcto?\n1 - Si, continuar\n2 - Volver a ingresar cliente"));
    while(continuar !=1){
        if(isNaN(continuar)==true){
        alert("Opcion no valida. Intentelo de nuevo");
        continuar = parseInt(prompt("Ingreso:\n" + cliente.mostrar() + "\nEs correcto?\n1 - Si, continuar\n2 - Volver a ingresar cliente"));
        }else{
            cliente = ingresarCliente();
            continuar = parseInt(prompt("Ingreso:\n" + cliente.mostrar() + "\nEs correcto?\n1 - Si, continuar\n2 - Volver a ingresar cliente"));
        }
    }
}

alert("Ingrese los productos");

while(agregar == true){
    continuar = ""
    while(continuar !=1){
        producto = ingresarProducto();
        continuar = parseInt(prompt("Ingreso:\n" + producto.mostrar() + "\nEs correcto?\n1 - Si, continuar\n2 - Volver a ingresar producto"));
        while(continuar !=1){
            if(isNaN(continuar)==true){
            alert("Opcion no valida. Intentelo de nuevo");
            continuar = parseInt(prompt("Ingreso:\n" + producto.mostrar() + "\nEs correcto?\n1 - Si, continuar\n2 - Volver a ingresar producto"));
            }else{
                producto = ingresarProducto();
                continuar = parseInt(prompt("Ingreso:\n" + producto.mostrar() + "\nEs correcto?\n1 - Si, continuar\n2 - Volver a ingresar producto"));
            }
        }
        carrito.push(producto);
    }
    let seguirAgregando = parseInt(prompt("¿Desea continuar agregando elementos?\n1 - Si\n2 - No"));
    while(seguirAgregando != 1 || seguirAgregando != 2){
        if(seguirAgregando == 1){
            break;
        }else if(seguirAgregando == 2){
            agregar = false;
            break;
        }else{
            alert("Ingrese una opcion valida");
            seguirAgregando = parseInt(prompt("¿Desea continuar agregando elementos?\n1 - Si\n2 - No"));
        }
    }
}

ivaFinal = ivaCarrito(carrito);
totalFinal = totalCarrito(carrito);
for (const i of carrito){
    carritoFinal = carritoFinal + i.mostrar() + "\n";
}

alert("Cliente:\n" + cliente.mostrar());
alert("productos:\n" + carritoFinal); //corregir esto 


alert("Total impuestos: $" + ivaFinal + "\nTotal: $" + totalFinal);


console.log(ivaFinal);
console.log(totalFinal);
console.log(carrito);



const filtrado = filtrarCantidad(carrito, 5);
console.log(filtrado);
