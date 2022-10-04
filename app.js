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
    Swal.fire({
        title: 'Listo!',
        text: 'Cliente agregado correctamente!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
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

// Funcion para mostrar pestaña de agregar cliente
const newClientContainer = document.getElementById("newClientContainer");
const showNewClientContainer = () =>{
    newClientContainer.style.display="block"
}
//Funcion para seleccionar el cliente en el resultado de busqueda
const selectedClient = document.getElementById("selectedClient"); //div donde se mostrara el cliente seleccionado
const selectedClientBtn = document.getElementsByClassName("selectedClientBtn"); // btn para seleccionar cliente

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
            <p>Dirección: <span class="clientData">${clientDBFilter[arrSelectedClientBtn.indexOf(btn)].dir}</span></p>
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
            <p>Dirección: <span class="clientData">${el.dir}</span></p>
            <p>Localidad: <span class="clientData">${el.city}</span></p>
            <button class="selectedClientBtn">Seleccionar</button>`;
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

//------ Productos para base de datos---------------
const p1 = new Product("xiaomi", "note 10 pro", "128gb + 8gb", 10, 75000, 21);
const p2 = new Product("xiaomi", "11t", "128gb + 8gb", 12, 95000, 21);
const p3 = new Product("xiaomi", "note 10 pro", "256gb + 8gb", 16, 85000, 21);
const p4 = new Product("samsung", "s22 ultra", "256gb + 12gb", 15, 120000, 21);
const p5 = new Product("samsung", "s22", "128gb + 8gb", 9, 105000, 21);
const p6 = new Product("motorola", "e40", "128gb + 8gb", 10, 65000, 21);
const p7 = new Product("motorola", "g51", "128gb + 4gb", 11, 83000, 21);
const p8 = new Product("apple", "iphone 13", "128gb + 8gb", 12, 250000, 21);
const p9 = new Product("apple", "iphone 13 pro max", "128gb + 8gb", 8, 325000, 21);
const p0 = new Product("apple", "iphone 14", "256gb + 8gb", 5, 350000, 21);
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

const searchProduct = document.getElementById("searchProduct"); //input de busqueda
const resultSearch = document.getElementById("resultSearch");//section donde se agregaran los productos a mostrar


//Funcion para mostrar container Nuevo Producto
const showNewProductContainer = () =>{
    newProductContainer.style.display="block"
}

//Funcion para limpiar campos de input de productos
const clearProductForm = () =>{
    productBrand.value = "";
    productModel.value = "";
    productDesc.value = "";
    productStock.value ="";
    productPrice.value ="";
    productIva.value ="";
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
    clearProductForm();
    Swal.fire({
        title: 'Listo!',
        text: 'Producto agregado correctamente!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    showCatalog(productDB);

}

const cancelNewProduct = () =>{
    newProductContainer.style.display="none"
    clearProductForm();
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
    }else{
        productDB.push(p1,p2,p3,p4,p5,p6,p7,p8,p9,p0);
    }
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
    console.log(productDBFilter);
    if(productDBFilter.length === 0){
        resultSearch.innerHTML = "<p>Lo sentimos no hay resultados</p>";
    }else{
        showCatalog(productDBFilter);
        //addProductCarrito(productDBFilter);
        
    };
    searchProduct.value==="" && showCatalog(productDBFilter);
    /* if(searchProduct.value===""){
        resultSearch.innerHTML = "";
    }; */ 
};

//Funcion para mostrar elementos agregados al carrito
const carritoContainer = document.getElementById("carritoContainer");
const carritoTable = document.getElementById("carritoTable");

const updateCarritoTable = (arrCarrito) =>{
        carritoTable.innerHTML = `<tr>
        <th>Cantidad</th>
        <th>Marca</th>
        <th>Modelo</th>
        <th>Descripción</th>
        <th>Precio</th>
        <th>IVA</th>
    </tr>`;
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
            console.log(carrito[0].calcularIva())
            console.log(carrito[0].calcularIvaTotal())
            console.log(carrito[0].calcularTotal())
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
showCatalog(productDB);


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
    console.log("cliqueaste presupuesto");
}

notaVenta.addEventListener("click",notaVentaIsChecked);


function notaVentaIsChecked(){
    containerValidez.style.display = "none";
    console.log("cliqueaste nota de venta");
}
// Fin modulo ingresar validez------------------

//Practica con fetch

/* fetch("/json/productDB.json")
.then(response => response.json())
.then(datos => {
    for (const obj of datos) {
        console.log(obj);
    }
}) */

const traerDatos = async (url) => {
   const response = await fetch(url);
   const data = await response.json();
   for (const obj of data) {
        console.log(obj);
   }
}

traerDatos("/json/productDB.json");