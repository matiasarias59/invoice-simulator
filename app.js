//Script para trabajar con el dom 

//Definicion Clase Cliente
class Client{
    constructor(nomb, dni, tel, mail, dir, city){
        this.nomb = nomb;
        this.dni = dni;
        this.tel = tel;
        this.mail = mail;
        this.dir = dir;
        this.city = city;
    }
    mostrar() {
        return ("Nombre: "+this.nomb+"\nDNI: "+this.dni+"\nTelefono: "+this.tel+"\nE-mail: "+this.mail+"\nDireccion: "+this.dir);
    }   
}

const client = [];
const newClient = () =>{
    let newClient = new Client(
        document.getElementById("clientName").value,
        document.getElementById("clientId").value,
        document.getElementById("clientPhone").value,
        document.getElementById("clientMail").value,
        document.getElementById("clientAddress").value,
        document.getElementById("clientCity").value,
    );
    client.push(newClient);
    console.log(client);    
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

//ingresar validez

const presupuesto = document.getElementById("presupuesto");
const notaVenta = document.getElementById("notaVenta");
const containerValidez = document.getElementById("validez__presupuesto");

presupuesto.addEventListener("click", presupuestoIsChecked);
function presupuestoIsChecked(){
    containerValidez.style.display = "block";
    console.log("cliqueaste presupuesto");
}

notaVenta.addEventListener("click",notaVentaIsChecked);


function notaVentaIsChecked(){
    containerValidez.style.display = "none";
    console.log("cliqueaste nota de venta");
}

// Tomar Cliente



const agregarCliente = document.getElementById("agregarCliente");

agregarCliente.addEventListener("click", newClient);


