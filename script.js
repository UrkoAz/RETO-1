let usuarios = [
    {nombre: "leire", contrasena: 123, rol: "administrador"},
    {nombre: "urko", contrasena: 123, rol: "alumno"},
    {nombre: "gorka", contrasena: 123, rol: "profesor"},
    {nombre: "asua", contrasena: 123, rol: "familia"}
];


function login(v_usuario, v_contrasena, v_rol){
    var v_usuario = document.getElementById("Usuario").value;
    var v_contrasena = document.getElementById("Contraseña").value;
    var v_rol = 0;

    for (user of usuarios) {
        if (user.nombre == v_usuario && user.contrasena == v_contrasena) {
            var rol = user.rol;
        }
    }

    if (rol == "administrador") {
        window.location.href="adminweb.html";
     }
     else if (rol == "profesor") {
         window.location.href="profe.html";
     }
     else if (rol == "alumno") {
         window.location.href="alumno.html";
     }
     else if (rol == "familia"){
        window.location.href="familia.html";
     }
     else {
         alert("Esos datos no son correctos. Regístrate o cambia los datos a unos válidos");
         }
}

function Registrar(){
    let n_Usuario = prompt("Introduce un nombre de usuario:");
    let n_Contrasena = prompt("Introduce una contraseña:");
    let n_Rol = prompt("Selecciona tu rol (familia, alumno, administrador o profesor):");

    if ((n_Usuario === "") || (n_Contrasena === "") || (n_Rol === "")) {
        alert("Todos los datos son obligatorios")
    }
    else if (!(n_Rol == "familia" || n_Rol == "alumno" || n_Rol == "administrador" || n_Rol == "profesor")) {
        alert("Por favor, elige un rol válido")
    }

    while ((n_Rol === "familia") || (n_Rol === "alumno")) {
        
        let confirmar = confirm("¿Aceptas los términos y condiciones de uso?")

        if (confirmar == true) {
            usuarios.push({nombre:n_Usuario, contrasena: n_Contrasena, rol: n_Rol})
            break;
        }
        else {
            console.log("cancelado.")
            break;
        }
    }


    
}
function Enviar(){ /*función enviar para que salga una alerta en recuperarContra.html*/
    alert("Recibirá un correo electrónico con instrucciones para restablecer su contraseña. Si no llega, asegúrese de revisar su carpeta de spam");
} 

function volverAtras() {
    history.back();
}