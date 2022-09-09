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