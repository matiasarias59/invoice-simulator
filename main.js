//Funcion para ingresar datos de cliente
const ingresarDatoCliente = (dato) => {
    let input = prompt("Ingrese el " + dato + " del cliente");
    while(input == ""){
        alert("No puede dejar este campo vacio");
        input = ingresarDatoCliente(dato);
    }
    return input;  
}