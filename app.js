//Script para trabajar con el dom 

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

