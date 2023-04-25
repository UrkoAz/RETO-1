let usuarios = [
    {nombre: "dani", contrasena: 123, rol: "director"},
    {nombre: "zigor", contrasena: 123, rol: "alumno"},
    {nombre: "gorka", contrasena: 123, rol: "profesor"},
    {nombre: "egiluz", contrasena: 123, rol: "familia"},
    {nombre: "julio", contrasena: 123, rol: "secretario"}
];


function login(v_usuario, v_contrasena, v_rol){
    try{
    var v_usuario = document.getElementById("Usuario").value;
    var v_contrasena = document.getElementById("Contraseña").value;
    var v_rol = 0;

    for (user of usuarios) {
        if (user.nombre == v_usuario && user.contrasena == v_contrasena) {
            var rol = user.rol;
        }
    }

    if (rol == "director") {
        window.location.href="xml/director.xml";
     }
     else if (rol == "profesor") {
         window.location.href="xml/profe.xml";
     }
     else if (rol == "alumno") {
         window.location.href="xml/alumno.xml";
     }
     else if (rol == "familia"){
        window.location.href="xml/familia.xml";
     }
     else if (rol == "secretario"){
        window.location.href="xml/secretario.xml";
     }
     else {
         alert("Esos datos no son correctos. Regístrate o cambia los datos a unos válidos");
         }
    } catch (error){
        console.log(error.message); // -> console is not defined
    }
}

function Registrar(){
    try{
    let n_Usuario = prompt("Introduce un nombre de usuario:");
    let n_Contrasena = prompt("Introduce una contraseña:");
    let n_Rol = prompt("Selecciona tu rol (familia, alumno, director, profesor o secretario):");

    if ((n_Usuario === "") || (n_Contrasena === "") || (n_Rol === "")) {
        alert("Todos los datos son obligatorios")
    }
    else if (!(n_Rol == "familia" || n_Rol == "alumno" || n_Rol == "director" || n_Rol == "profesor" || n_Rol == "secretario")) {
        alert("Por favor, elige un rol válido")
    }

    while ((n_Rol === "familia") || (n_Rol === "alumno")) {
        
        let confirmar = confirm("¿Aceptas los términos y condiciones de uso?")

        if (confirmar == true) {
            usuarios.push({nombre:n_Usuario, contrasena: n_Contrasena, rol: n_Rol})
            break;
        }
        else {
            alert("Cancelado.")
            break;
        }
    }
    if (n_Rol === "profesor") {
        let contraProfe = "profe";

        let introContraProfe = prompt("Introduce la contraseña de profesores:")

        while (!(introContraProfe != contraProfe) || (introContraProfe === "")) {
            alert("La contraseña no es correcta.")
            break;
        }

        while (introContraProfe === contraProfe) {

        let confirmar = confirm("¿Aceptas los términos y condiciones de uso?")

        if (confirmar == true) {
            usuarios.push({nombre:n_Usuario, contrasena: n_Contrasena, rol: n_Rol})
            break;
        }
        else {
            alert("Cancelado.")
            break;
            }
        }
    }

    if (n_Rol === "secretario") {
        let contraSecre = "secre";

        let introContraSecre = prompt("Introduce la contraseña del secretario:")

        while (!(introContraSecre != contraSecre) || (introContraSecre === "")) {
            alert("La contraseña no es correcta.")
            break;
        }

        while (introContraSecre === contraSecre) {

        let confirmar = confirm("¿Aceptas los términos y condiciones de uso?")

        if (confirmar == true) {
            usuarios.push({nombre:n_Usuario, contrasena: n_Contrasena, rol: n_Rol})
            break;
        }
        else {
            alert("Cancelado.")
            break;
            }
        }
    }

    if (n_Rol === "director") {
        let contraDir = "dir";

        let introContraDir = prompt("Introduce la contraseña del director:")

        while (!(introContraDir != contraDir) || (introContraDir === "")) {
            alert("La contraseña no es correcta.")
            break;
        }

        while (introContraDir === contraDir) {

        let confirmar = confirm("¿Aceptas los términos y condiciones de uso?")

        if (confirmar == true) {
            usuarios.push({nombre:n_Usuario, contrasena: n_Contrasena, rol: n_Rol})
            break;
        }
        else {
            alert("Cancelado.")
            break;
            }
        }
    }

    } catch (error){
        console.log(error.message); // -> console is not defined
    }
}

function Enviar(){ /*función enviar para que salga una alerta en recuperarContra.html*/
    try{
        var email = document.getElementById("email").value;
        if (email != "") {
        alert("Recibirá un correo electrónico a " + email + " con instrucciones para restablecer su contraseña. Si no llega, asegúrese de revisar su carpeta de spam");
        } else{
            alert("Por favor, ingrese una dirección de correo electrónico válida.");
        }
    } catch (error){
        console.log(error.message); // -> console is not defined
    }
} 

function volverAtras() {
    try{
    history.back();
    
    } catch (error){
        console.log(error.message); // -> console is not defined
    }
}