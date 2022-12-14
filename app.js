//Script para trabajar con el dom 

//------ SECCION CLIENTES -------

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
    cancelNewClient();
    /* newClientContainer.style.display="none"
    newClientName.value = "";
    newClientId.value = "";
    newClientPhone.value = "";
    newClientMail.value = "";
    newClientAddress.value = "";
    newClientCity.value = ""; */
}

const cancelNewClient = () =>{
    newClientContainer.style.display="none"
    newClientName.value = "";
    newClientId.value = "";
    newClientPhone.value = "";
    newClientMail.value = "";
    newClientAddress.value = "";
    newClientCity.value = "";
}

// Funcion para actulizar el localStorage de clientes
const UpdateLocalClientDB = () =>{
    localStorage.setItem("clientDB", JSON.stringify(clientDB))
}

// Funcion para sincronizar el localStorage de Clientes
const SyncLocalClientDB = () =>{
    const clientDBSync = (JSON.parse(localStorage.getItem("clientDB")));
    console.log(clientDBSync);
    if(clientDBSync!=null){
        for (const client of clientDBSync){
            console.log(client);
            const clientToSync = new Client (
                client.nomb,
                client.dni,
                client.tel,
                client.mail,
                client.dir,
                client.city
            )
            clientDB.push(clientToSync);
            console.log(clientDB);
        }
    }
}

// Funcion para mostrar pesta??a de agregar cliente
const newClientContainer = document.getElementById("newClientContainer");
const showNewClientContainer = () =>{
    newClientContainer.style.display="block"
}
//Funcion para seleccionar el cliente en el resultado de busqueda
const selectedClient = document.getElementById("selectedClient");
const selectedClientBtn = document.getElementsByClassName("selectedClientBtn");

const selectClient = (clientDBFilter)=>{
    console.log(selectedClientBtn.length);
    const arrSelectedClientBtn = [...selectedClientBtn];
    for (const btn of selectedClientBtn) {
        btn.addEventListener("click",function(){
            console.log("Clickeaste seleccionar");
            console.log(clientDBFilter);
            console.log(arrSelectedClientBtn)
            selectedClient.innerHTML=`<p>Nombre: <span class="clientData">${clientDBFilter[arrSelectedClientBtn.indexOf(btn)].nomb}</span></p>
            <p>Cuit / Dni: <span class="clientData">${clientDBFilter[arrSelectedClientBtn.indexOf(btn)].dni}</span></p>
            <p>Telefono: <span class="clientData">${clientDBFilter[arrSelectedClientBtn.indexOf(btn)].tel}</span></p>
            <p>E-mail: <span class="clientData">${clientDBFilter[arrSelectedClientBtn.indexOf(btn)].mail}</span></p>
            <p>Direcci??n: <span class="clientData">${clientDBFilter[arrSelectedClientBtn.indexOf(btn)].dir}</span></p>
            <p>Localidad: <span class="clientData">${clientDBFilter[arrSelectedClientBtn.indexOf(btn)].city}</span></p>`; 
            clientToFind.value="";
            resultClientSearch.innerHTML = "";
        }) 
    }
    
};

// ------Busqueda y Filtrado de Productos------------------------------

const clientToFind = document.getElementById("clientToFind"); //input de busqueda

//Funcion para filter de busqueda
const clientSearch = (element) =>{
    return element.nomb.includes(clientToFind.value)
} 

const resultClientSearch = document.getElementById("resultClientSearch");//section donde se agregaran los clientes resultados de busqueda

//Filtra la DB de productos y los muestra

const UpdateClientSearch = () =>{
    cancelNewClient();
    resultClientSearch.innerHTML = "";
    const clientDBFilter = clientDB.filter(clientSearch);
    console.log(clientDBFilter);
    if(clientDBFilter.length === 0){
        resultClientSearch.innerHTML = "<p>Lo sentimos no hay resultados</p>";
    }else{
        clientDBFilter.forEach(el => {
            const contentResultClientSearch = document.createElement("div");
            contentResultClientSearch.innerHTML = `<p>Nombre: <span class="clientData">${el.nomb}</span></p>
            <p>Cuit / Dni: <span class="clientData">${el.dni}</span></p>
            <p>Telefono: <span class="clientData">${el.tel}</span></p>
            <p>E-mail: <span class="clientData">${el.mail}</span></p>
            <p>Direcci??n: <span class="clientData">${el.dir}</span></p>
            <p>Localidad: <span class="clientData">${el.city}</span></p>
            <button class="selectedClientBtn">Seleccionar</button>`;
           // <button id="indexClient${clientDBFilter.indexOf(el)}">Seleccionar</button>;
            resultClientSearch.appendChild(contentResultClientSearch);
        })
        selectClient(clientDBFilter);        
    }
    if(clientToFind.value===""){
        resultClientSearch.innerHTML = "";
    }   
}

//----------------------------------------------------------------
// Agregar Cliente a DB
SyncLocalClientDB();

const newClientBtn = document.getElementById("newClientBtn");
newClientBtn.addEventListener("click", showNewClientContainer);
const cancelClientBtn = document.getElementById("cancelClientBtn");
cancelClientBtn.addEventListener("click", cancelNewClient);

const clientAdd = document.getElementById("clientAdd");
clientAdd.addEventListener("click", newClient);
clientAdd.addEventListener("click", UpdateLocalClientDB);

//Busqueda/Filtrado de clientes
clientToFind.addEventListener("keyup",UpdateClientSearch);
clientToFind.addEventListener("search",UpdateClientSearch);


// ------------ SECCION PRODUCTOS-----------

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
const UpdateLocalProductDB = () =>{
    localStorage.setItem("productDB", JSON.stringify(productDB))
}

// Funcion para sincronizar el localStorage de Productos
const SyncLocalProductDB = () =>{
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

// Busqueda y Filtrado de Productos

const searchProduct = document.getElementById("searchProduct"); //input de busqueda

//Funcion para filter de busqueda
const productSearch = (element) =>{
    return element.model.includes(searchProduct.value)
} 

const resultSearch = document.getElementById("resultSearch");//section donde se agregaran los productos a mostrar

//Filtra la DB de productos y los muestra
const UpdateProductSearch = () =>{
    resultSearch.innerHTML = "";
   const productDBFilter = productDB.filter(productSearch);
    console.log(productDBFilter);
    if(productDBFilter.length === 0){
        resultSearch.innerHTML = "<p>Lo sentimos no hay resultados</p>";
    }else{
        productDBFilter.forEach(el => {
            const contentResultSearch = document.createElement("div");
            contentResultSearch.innerHTML = `<p>Marca: ${el.brand}</p>
            <p>Modelo: ${el.model}</p> 
            <p>Descripci??n: ${el.desc}</p> 
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

// Agregar productos
SyncLocalProductDB();
const productAdd = document.getElementById("productAdd");
productAdd.addEventListener("click", newProduct);
productAdd.addEventListener("click", UpdateLocalProductDB);

//Busqueda/Filtrado de productos
searchProduct.addEventListener("keyup",UpdateProductSearch);
searchProduct.addEventListener("search",UpdateProductSearch);


// -------------- SECCION TIPO DE DOCUMENTO -----------------

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
// Fin modulo ingresar validez------------------