//Script para trabajar con el dom 

//------ Expresiones para validar campos---
const expresiones = {
    nomb: /^[\S][a-zA-ZÀ-ÿ\s0-9\_\-\.]+$/,
	mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	numb: /^\d+$/,
    decimalNumb:/^[\d]+\.?[\d]*$/
}

const validateInput = (expresion, flagObj, input, flag) => {
    if (expresiones[expresion].test(input.value)){
        console.log("esta ok");
        input.classList.add("correct_data");
        input.classList.remove("fail_data");
        flagObj[flag]= true;
    }else{
        input.classList.add("fail_data");
        input.classList.remove("correct_data");
        flagObj[flag] = false;
    }
}


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
const newClientForm = document.getElementById("newClientForm");

// Validar Inputs Cliente
const clientFlags = {
    newClientName: false,
    newClientId: false,
    newClientPhone: false,
    newClientMail: false, 
    newClientAddress: false,
    newClientCity: false, 
}

newClientName.addEventListener("keyup", ()=>{validateInput("nomb", clientFlags, newClientName, "newClientName")});
newClientId.addEventListener("keyup", ()=>{validateInput("numb", clientFlags, newClientId, "newClientId")});
newClientPhone.addEventListener("keyup", ()=>{validateInput("numb", clientFlags, newClientPhone, "newClientPhone")});
newClientMail.addEventListener("keyup", ()=>{validateInput("mail", clientFlags, newClientMail, "newClientMail")});
newClientAddress.addEventListener("keyup", ()=>{validateInput("nomb", clientFlags, newClientAddress, "newClientAddress")});
newClientCity.addEventListener("keyup", ()=>{validateInput("nomb", clientFlags, newClientCity, "newClientCity")});

const validateForm = (objFlag, actionFunction) =>{
    let formFlag = false 
    for (const flag in objFlag) {
        if(!objFlag[flag]){
            //console.log(flag);
            Swal.fire({
                title: 'Mal!',
                text: 'Por favor completa los campos correctamente!',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            formFlag = false;
            break;
        }else{
            formFlag = true;
        }
    }
    if(formFlag) {
        actionFunction(); 
    }
}

// Funcion agregar nuevo cliente a db

const addClientToDB = () =>{
    let newClient = new Client(
        newClientName.value,
        newClientId.value,
        newClientPhone.value,
        newClientMail.value,
        newClientAddress.value,
        newClientCity.value,
    );
    clientDB.push(newClient);
    //console.log(clientDB);
    cancelNewClient();
    Swal.fire({
        title: 'Listo!',
        text: 'Cliente agregado correctamente!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
}

// Funcion nuevo Cliente
const newClient = () =>{
  //-*------------ 
   /*  let formFlag = false 
    for (const flag in clientFlags) {
        if(!clientFlags[flag]){
            //console.log(flag);
            Swal.fire({
                title: 'Mal!',
                text: 'Por favor completa los campos correctamente!',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            formFlag = false;
            break;
        }else{
            formFlag = true
        }
    }
    if(formFlag) {
        let newClient = new Client(
            newClientName.value,
            newClientId.value,
            newClientPhone.value,
            newClientMail.value,
            newClientAddress.value,
            newClientCity.value,
        );
        clientDB.push(newClient);
        //console.log(clientDB);
        cancelNewClient();
        Swal.fire({
            title: 'Listo!',
            text: 'Cliente agregado correctamente!',
            icon: 'success',
            confirmButtonText: 'Ok'
          })

    } */
   //-------------------
   validateForm(clientFlags,addClientToDB); 
    
}

const cancelNewClient = () =>{
    newClientContainer.style.display="none"
    newClientForm.reset();
}

// Funcion para Traer Clientes desde Json
const traerClientesJson = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    for (const obj of data) {
       //console.log(obj);
        clientDB.push(obj);
    }
 }
 //traerClientesJson("./json/clienDB.json");

// Funcion para actulizar el localStorage de clientes
const UpdateLocalClientDB = () =>{
    localStorage.setItem("clientDB", JSON.stringify(clientDB))
}

// Funcion para sincronizar el localStorage de Clientes
const SyncLocalClientDB = () =>{
    const clientDBSync = (JSON.parse(localStorage.getItem("clientDB")));
    //console.log(clientDBSync);
    if(clientDBSync!=null){
        for (const client of clientDBSync){
            //console.log(client);
            const clientToSync = new Client (
                client.nomb,
                client.dni,
                client.tel,
                client.mail,
                client.dir,
                client.city
            )
            clientDB.push(clientToSync);
            //console.log(clientDB);
        }
    }else{
        traerClientesJson("./json/clienDB.json");
    }
}

// Funcion para mostrar pestaña de agregar cliente
const newClientContainer = document.getElementById("newClientContainer");
const showNewClientContainer = () =>{
    newClientContainer.style.display="flex"
}
//Funcion para seleccionar el cliente en el resultado de busqueda
const selectedClient = document.getElementById("selectedClient"); //div donde se mostrara el cliente seleccionado
const selectedClientBtn = document.getElementsByClassName("selectedClientBtn"); // btn para seleccionar cliente

const selectClient = (clientDBFilter)=>{
    console.log(selectedClientBtn.length);
    const arrSelectedClientBtn = [...selectedClientBtn];
    for (const btn of selectedClientBtn) {
        btn.addEventListener("click",function(){
            //console.log("Clickeaste seleccionar");
            //console.log(clientDBFilter);
            //console.log(arrSelectedClientBtn)
            selectedClient.innerHTML=
            `<thead>
                <th>Nombre</th>
                <th>Cuit/Dni</th>
                <th>Telefono</th>
                <th>E-mail</th>
                <th>Direccion</th>
                <th>Localidad</th>
            </thead>
            <tr>
                <td>${clientDBFilter[arrSelectedClientBtn.indexOf(btn)].nomb}</td>
                <td>${clientDBFilter[arrSelectedClientBtn.indexOf(btn)].dni}</td>
                <td>${clientDBFilter[arrSelectedClientBtn.indexOf(btn)].tel}</td>
                <td>${clientDBFilter[arrSelectedClientBtn.indexOf(btn)].mail}</td>
                <td>${clientDBFilter[arrSelectedClientBtn.indexOf(btn)].dir}</td>
                <td>${clientDBFilter[arrSelectedClientBtn.indexOf(btn)].city}</td>
            </tr>`
            clientToFind.value="";
            resultClientSearch.innerHTML = "";


        }) 
    }
    
};

// ------Busqueda y Filtrado de Clientes------------------------------

const clientToFind = document.getElementById("clientToFind"); //input de busqueda

//Funcion para filter de busqueda
const clientSearch = (element) =>{
    return element.nomb.includes(clientToFind.value)
} 

const resultClientSearch = document.getElementById("resultClientSearch");//section donde se agregaran los clientes resultados de busqueda

//Filtra la DB de clientes y los muestra

const UpdateClientSearch = () =>{
    cancelNewClient();
    resultClientSearch.innerHTML = "";
    const clientDBFilter = clientDB.filter(clientSearch);
    //console.log(clientDBFilter);
    if(clientDBFilter.length === 0){
        resultClientSearch.innerHTML = "<p>Lo sentimos no hay resultados</p>";
    }else{
        resultClientSearch.innerHTML = `
        <thead>
            <th>Nombre</th>
            <th>Cuit/Dni</th>
            <th>Telefono</th>
            <th>E-mail</th>
            <th>Direccion</th>
            <th>Localidad</th>
        </thead>`
        clientDBFilter.forEach(el => {
            const contentResultClientSearch = document.createElement("tr");
            contentResultClientSearch.innerHTML = `<td>${el.nomb}</td>
            <td>${el.dni}</td>
            <td>${el.tel}</td>
            <td>${el.mail}</td>
            <td>${el.dir}</td>
            <td>${el.city}</td>
            <td><button class="selectedClientBtn">Seleccionar</button></td>`;
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
}

// Definicion Clase Carrito
class ProductInCarrito{
    constructor(cant, product){
        this.cant = cant;
        this.product = product;
    }
    calcularIva(){
        return this.product.price * this.product.iva / 100;
    }
    calcularIvaTotal(){
        return this.cant * this.calcularIva();
    }
    calcularTotal(){
        return this.product.price * this.cant;
    }

}

//----------------------------------------------------

const productBrand = document.getElementById("productBrand");
const productModel = document.getElementById("productModel");
const productDesc = document.getElementById("productDesc");
const productStock = document.getElementById("productStock");
const productPrice = document.getElementById("productPrice");
const productIva = document.getElementById("productIva");
//const productosFinal = document.getElementById("productosFinal");
const productDB = []//Array DB para almacenar productos. posteriormente se manda al localStorage

const newProductBtn = document.getElementById("newProductBtn");
const cancelProductAdd = document.getElementById("cancelProductAdd");
const newProductContainer = document.getElementById("newProductContainer");
const newProductForm = document.getElementById("newProductForm");

const searchProduct = document.getElementById("searchProduct"); //input de busqueda
const resultSearch = document.getElementById("resultSearch");//section donde se agregaran los productos a mostrar


//Funcion para mostrar container Nuevo Producto
const showNewProductContainer = () =>{
    newProductContainer.style.display="block";
}

//Funcion para limpiar campos de input de productos
const clearProductForm = () =>{
    newProductForm.reset();
    /* productBrand.value = "";
    productModel.value = "";
    productDesc.value = "";
    productStock.value ="";
    productPrice.value ="";
    productIva.value =""; */
}

// Validar Inputs Producto
const productFlags = {
    productBrand: false,
    productModel: false,
    productDesc: false,
    productStock: false,
    productPrice: false,
    productIva: false,
}

productBrand.addEventListener("keyup", ()=>{validateInput("nomb", productFlags, productBrand, "productBrand")});
productModel.addEventListener("keyup", ()=>{validateInput("nomb", productFlags, productModel, "productModel")});
productDesc.addEventListener("keyup", ()=>{validateInput("nomb", productFlags, productDesc, "productDesc")});
productStock.addEventListener("keyup", ()=>{validateInput("numb", productFlags, productStock, "productStock")});
productPrice.addEventListener("keyup", ()=>{validateInput("decimalNumb", productFlags, productPrice, "productPrice")});
productIva.addEventListener("keyup", ()=>{validateInput("decimalNumb", productFlags, productIva, "productIva")});

//Funcion para agregar productos
const addProductToDB = () =>{
    let newProduct = new Product(
        productBrand.value,
        productModel.value,
        productDesc.value,
        productStock.value,
        productPrice.value,
        productIva.value
    );
    productDB.push(newProduct);
    //console.log(productDB);
    //Limpia los campos del formulario
    clearProductForm();
    Swal.fire({
        title: 'Listo!',
        text: 'Producto agregado correctamente!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
  //  showCatalog(productDB);

}

const newProduct = () =>{
    validateForm(productFlags,addProductToDB); 
}

const cancelNewProduct = () =>{
    newProductContainer.style.display="none"
    clearProductForm();
}


 // Funcion mostrar productos en catalogo
const showCatalog = (arrProductDB) =>{
    resultSearch.innerHTML = 
        `<thead>
            <tr>
                <th>Stock</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>IVA</th>
                <th>Cant</th>
            </tr>
        </thead>`;
    arrProductDB.forEach(el => {
        const contentResultSearch = document.createElement("tr");
        contentResultSearch.innerHTML = `<td>${el.stock}</td>
        <td>${el.brand}</td>
        <td>${el.model}</td>
        <td>${el.desc}</td>
        <td>${el.price}</td>
        <td>${el.iva}</td>
        <td class="inputCant"><input type="number" name="productQty" class="productQty"></td>
        <td class="btnAgregar"><input type="button" value="Agregar al Carrito" class="addCarritoBtn"></td>`;
        resultSearch.appendChild(contentResultSearch);
    })
    addProductCarrito(arrProductDB);
}

// Funcion para Traer productos desde Json
const traerProductosJson = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    for (const obj of data) {
        //console.log(obj);
        productDB.push(obj);
    }
    //showCatalog(productDB);
 }


// Funcion para actulizar el localStorage
const UpdateLocalProductDB = () =>{
    localStorage.setItem("productDB", JSON.stringify(productDB))
}

// Funcion para sincronizar el localStorage de Productos
const SyncLocalProductDB = () =>{
    const productDBSync = (JSON.parse(localStorage.getItem("productDB")));
    //console.log(productDBSync);
    if(productDBSync!=null){
        for (const product of productDBSync){
            //console.log(product);
            const productToSync = new Product (
                product.brand,
                product.model,
                product.desc,
                product.stock,
                product.price,
                product.iva
            )
            productDB.push(productToSync);
           // console.log(productDB);
        }
    }else{
        traerProductosJson("/json/productDB.json");
       // showCatalog(productDB);
        //productDB.push(p1,p2,p3,p4,p5,p6,p7,p8,p9,p0);
    }
}



// ----------Busqueda y Filtrado de Productos-----------------

//Funcion para filter de busqueda
const productSearch = (element) =>{
    return element.model.includes(searchProduct.value)
} 

// Funcion Filtra la DB de productos y los muestra
const UpdateProductSearch = () =>{
    cancelNewProduct();
    //resultSearch.innerHTML = "";
   const productDBFilter = productDB.filter(productSearch);
    //console.log(productDBFilter);
    if(productDBFilter.length === 0){
        resultSearch.innerHTML = "<p>Lo sentimos no hay resultados</p>";
    }else{
        showCatalog(productDBFilter);
        //addProductCarrito(productDBFilter);
        
    };

    //searchProduct.value==="" && showCatalog(productDBFilter);
    if(searchProduct.value===""){
        resultSearch.innerHTML = "";
    };
};

//Funcion para mostrar elementos agregados al carrito
const carritoContainer = document.getElementById("carritoContainer");
const carritoTable = document.getElementById("carritoTable");

const updateCarritoTable = (arrCarrito) =>{
        carritoTable.innerHTML = `<thead>
        <th>Cantidad</th>
        <th>Marca</th>
        <th>Modelo</th>
        <th>Descripción</th>
        <th>Precio</th>
        <th>IVA</th>
    </thead>`;
        //console.log(arrCarrito)
        arrCarrito.forEach(el =>{
        const rowItem = document.createElement("tr");
        rowItem.innerHTML = `<td>${el.cant}</td>
        <td>${el.product.brand}</td>
        <td>${el.product.model}</td>
        <td>${el.product.desc}</td>
        <td>${el.product.price}</td>
        <td>${el.product.iva}</td>
        <td><input type="button" value="Eliminar" class="delCarritoBtn"></td>`;
        carritoTable.appendChild(rowItem);
    })
    delProductCarrito(carrito);
}


// Funcion para agregar elementos al carrito
const carrito = []; 
const productQty = document.getElementsByClassName("productQty");
const addCarritoBtn = document.getElementsByClassName("addCarritoBtn");
//const delCarritoBtn = document.getElementsByClassName("delCarritoBtn");

const addProductCarrito = (arrFiltrado) =>{
    //const arrProductQty = [...productQty];
    const arrAddCarritoBtn = [...addCarritoBtn];
    for (const btn of addCarritoBtn) {
        btn.addEventListener("click", function (){
            const productToCarrito = new ProductInCarrito (
                productQty[arrAddCarritoBtn.indexOf(btn)].value,
                arrFiltrado[arrAddCarritoBtn.indexOf(btn)]
                );
            carrito.push(productToCarrito);
            productQty[arrAddCarritoBtn.indexOf(btn)].value="";
            //console.log(carrito);
            updateCarritoTable(carrito);
            //console.log(carrito[0].calcularIva())
            //console.log(carrito[0].calcularIvaTotal())
            //console.log(carrito[0].calcularTotal())
            //delProductCarrito(carrito);
        })
    } 
};

// Funcion para eliminar elementos del carrito
const delProductCarrito = (arrCarrito) =>{
    const delCarritoBtn = document.getElementsByClassName("delCarritoBtn");
    const arrDelCarritoBtn = [...delCarritoBtn];
    for (const btn of delCarritoBtn) {
        //console.log(arrDelCarritoBtn);
        btn.addEventListener("click",function(){
           // console.log("eliminar btn");
           // console.log(arrCarrito);
            arrCarrito.splice(arrDelCarritoBtn.indexOf(btn),1);
            updateCarritoTable(arrCarrito);
        })
    }
}

// Agregar productos a DB
SyncLocalProductDB();
//showCatalog(productDB);


newProductBtn.addEventListener("click", showNewProductContainer);
cancelProductAdd.addEventListener("click", cancelNewProduct);

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
    //console.log("cliqueaste presupuesto");
}

notaVenta.addEventListener("click",notaVentaIsChecked);


function notaVentaIsChecked(){
    containerValidez.style.display = "none";
    //console.log("cliqueaste nota de venta");
}
// Fin modulo ingresar validez------------------

