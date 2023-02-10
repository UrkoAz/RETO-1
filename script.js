let usuarios = [
    {nombre: "jorge", contrasenya: 123, rol: "admin"},
    {nombre: "javier", contrasenya: 123, rol: "profe"},
    {nombre: "pedro", contrasenya: 123, rol: "alumno"},
];


function iniciarSesion (v_usuario, v_contrasenya, v_rol){
    var v_usuario = document.getElementById("").value;
    var v_contrasenya = document.getElementById("").value;
    var v_rol = document.getElementById("").value;


    if (rol == "admin") {
        window.location.href="admin.html";
     }
     else if (rol == "profe") {
         window.location.href="profe.html";
     }
     else if (rol == "alumno") {
         window.location.href="alumno.html";
     }
     else {
         document.getElementById("texto").innerHTML = "Registrate e inténtalo otra vez.";
         }
}