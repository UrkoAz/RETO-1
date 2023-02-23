let usuarios = [
    {nombre: "leire", contrasena: 123, rol: "adminweb"},
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


    if (rol == "adminweb") {
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

function Enviar(){ /*función enviar para que salga una alerta en recuperarContra.html*/
    alert("Recibirá un correo electrónico con instrucciones para restablecer su contraseña. Si no llega, asegúrese de revisar su carpeta de spam");
} 

function volverAtras() {
    history.back();
}