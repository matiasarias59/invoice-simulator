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

const newClientName = document.getElementById("newClientName");
const newClientId = document.getElementById("newClientId");
const newClientPhone = document.getElementById("newClientPhone");
const newClientMail = document.getElementById("newClientMail");
const newClientAddress = document.getElementById("newClientAddress");
const newClientCity = document.getElementById("newClientCity");

const clientDB = [];
const clienteFinal = document.getElementById("clienteFinal");

const newClient = () =>{
    let newClient = new Client(
        newClientName.value,
        newClientId.value,
        newClientPhone.value,
        newClientMail.value,
        newClientAddress.value,
        newClientCity.value,
    );
    clientDB.push(newClient);
    console.log(clientDB);
    /* clienteFinal.innerHTML=`<div class="container_resultado">
                    <h4>Nombre:</h4> ${newClient.nomb}
                    <h4>Cuit/Dni:</h4> ${newClient.dni}
                    <h4>Telefono:</h4> ${newClient.tel}
                    <h4>E-mail:</h4> ${newClient.mail}
                    <h4>Domicilio:</h4> ${newClient.dir}
                    <h4>Localidad:</h4> ${newClient.city}
                </div>`; */

}

// Definicion Clase Producto
class Product{
    constructor(brand, model, desc, stock, price, iva){
        this.brand = brand;
        this.model = model;
        this.desc = desc;
        this.stock = stock;
        this.price = price;
        this.iva = iva;
    }
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


const productBrand = document.getElementById("productBrand");
const productModel = document.getElementById("productModel");
const productDesc = document.getElementById("productDesc");
const productStock = document.getElementById("productStock");
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
                product.brand,
                product.model,
                product.desc,
                product.stock,
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
        productBrand.value,
        productModel.value,
        productDesc.value,
        productStock.value,
        productPrice.value,
        productIva.value
    );
    productDB.push(newProduct);
    console.log(productDB);
    //Limpia los campos del formulario
    productBrand.value = "";
    productModel.value = "";
    productDesc.value = "";
    productStock.value ="";
    productPrice.value ="";
    productIva.value ="";

}

// Funcion para actulizar el localStorage
const UpdateLocalDB = () =>{
    localStorage.setItem("productDB", JSON.stringify(productDB))
}

// Busqueda y Filtrado de Productos

const searchProduct = document.getElementById("searchProduct"); //input de busqueda

//Funcion para filter de busqueda
const Search = (element) =>{
    return element.model.includes(searchProduct.value)
} 

const resultSearch = document.getElementById("resultSearch");//section donde se agregaran los productos a mostrar

//Filtra la DB de productos y los muestra
const UpdateSearch = () =>{
    resultSearch.innerHTML = "";
   const productDBFilter = productDB.filter(Search);
    console.log(productDBFilter);
    if(productDBFilter.length === 0){
        resultSearch.innerHTML = "<p>Lo sentimos no hay resultados</p>";
    }else{
        productDBFilter.forEach(el => {
            const contentResultSearch = document.createElement("div");
            contentResultSearch.innerHTML = `<p>Marca: ${el.brand}</p>
            <p>Modelo: ${el.model}</p> 
            <p>Descripción: ${el.desc}</p> 
            <p>Stock: ${el.stock}</p>
            <p>Precio: ${el.price}</p>
            <p>IVA: ${el.iva}</p>`;
            resultSearch.appendChild(contentResultSearch);
        })
    }
    if(searchProduct.value===""){
        resultSearch.innerHTML = "";
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
productAdd.addEventListener("click", UpdateLocalDB);

//Busqueda/Filtrado de productos
searchProduct.addEventListener("keyup",UpdateSearch);
searchProduct.addEventListener("search",UpdateSearch);
