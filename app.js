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
    /* mostrar() {
        return ("Nombre: "+this.nomb+"\nDNI: "+this.dni+"\nTelefono: "+this.tel+"\nE-mail: "+this.mail+"\nDireccion: "+this.dir);
    }   */ 
}

const client = [];
const clienteFinal = document.getElementById("clienteFinal");

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
    clienteFinal.innerHTML=`<div class="container_resultado">
                    <h4>Nombre:</h4> ${newClient.nomb}
                    <h4>Cuit/Dni:</h4> ${newClient.dni}
                    <h4>Telefono:</h4> ${newClient.tel}
                    <h4>E-mail:</h4> ${newClient.mail}
                    <h4>Domicilio:</h4> ${newClient.dir}
                    <h4>Localidad:</h4> ${newClient.city}
                </div>`;

}

// Definicion Clase Producto
class Product{
    constructor(nomb, cant, price, iva){
        this.nomb = nomb;
        this.cant = cant;
        this.price = price;
        this.iva = iva;
    }
    /* constructor(obj){
        this.nomb = obj.nomb;
        this.cant = obj.cant;
        this.price = obj.price;
        this.iva = obj.iva
    } */
    /* calcularIva(){
        return this.price * this.iva / 100;
    }
    calcularIvaTotal(){
        return this.cant * this.calcularIva();
    }
    calcularTotal(){
        return this.price * this.cant;
    } */
}

// Definicion Clase Carrito
class ProductInCarrito{
    constructor(cant, product){
        this.cant = cant;
        this.product = product;
    }
}



const productName = document.getElementById("productName");
const productCant = document.getElementById("productCant");
const productPrice = document.getElementById("productPrice");
const productIva = document.getElementById("productIva");
const productosFinal = document.getElementById("productosFinal");
const productDB = []//Array DB para almacenar productos. posteriormente se manda al localStorage

// Funcion para sincronizar el localStorage
const SyncLocalDB = () =>{
    const productDBSync = (JSON.parse(localStorage.getItem("productDB")));
    console.log(productDBSync);
    if(productDBSync!=null){
        for (const product of productDBSync){
            console.log(product);
            const productToSync = new Product (
                product.nomb,
                product.cant,
                product.price,
                product.iva
            )
            productDB.push(productToSync);
            console.log(productDB);
        }
    }
}

//Funcion para agregar productos
const newProduct = () =>{
    let newProduct = new Product(
        productName.value,
        productCant.value,
        productPrice.value,
        productIva.value,
    );
    productDB.push(newProduct);
    console.log(productDB);
    //Limpia los campos del formulario
    productName.value ="";
    productCant.value ="";
    productPrice.value ="";
    productIva.value ="";

}

// Funcion para actulizar el localStorage
const UpdateLocalDB = () =>{
    localStorage.setItem("productDB", JSON.stringify(productDB))
}

//Funcion para mostrar los productos
const showProducts = () =>{
    let producto =document.createElement("div");
    for(const prod of productDB){
        
        producto.innerHTML =`<h4>Cantidad:</h4> ${prod.cant}
        <h4>Producto:</h4> ${prod.nomb}
        <h4>Precio:</h4> ${prod.price}
        <h4>IVA:</h4> ${prod.iva}`;
        productosFinal.append(producto);
      
        console.log(
            `Nombre: ${prod.nomb}
             Cantidad: ${prod.cant}
             Precio: ${prod.price}
             Iva: ${prod.iva}`);
    }
}

//ingresar validez -----------------------

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
// Fin modulo ingresar validez---------------------

// Tomar Cliente

const clientAdd = document.getElementById("clientAdd");
clientAdd.addEventListener("click", newClient);

// Agregar productos
SyncLocalDB();
const productAdd = document.getElementById("productAdd");
productAdd.addEventListener("click", newProduct);
//productAdd.addEventListener("click", showProducts);
productAdd.addEventListener("click", UpdateLocalDB);


