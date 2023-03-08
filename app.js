var express = require('express');
var mysql = require('mysql');
var cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());

//establecer parámetros de conexión
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Odoo"
});

//establecer conexión
con.connect(function(err) {
  if (err) throw err;
  console.log("Conectado.");
});

//seleccionar los datos a mostrar
app.get('/api/adminweb/', (req, res)=>{
con.query('SELECT ID_EMPRESA, NOMBRE_EMPRE, DIR_EMPR, TLF_EMPR FROM EMPRESA', (err, filas)=>{
    if (err) throw err;
    res.send(filas);
  });
});

//seleccionar los datos de la consulta 2 a mostrar
app.get('/api/profe/', (req, res)=>{
  con.query('SELECT ID_DEP, NOMBRE_DEP, NUM_DEP, NUM_TRAB, ID_EMPRESA FROM DEPARTAMENTO', (err, filas2)=>{
      if (err) throw err;
      res.send(filas2);
    });
  });

//seleccionar los datos de la consulta 3 a mostrar
app.get('/api/secretario/', (req, res)=>{
  con.query('SELECT DISTINCT id, display_name, email, street, zip FROM res_partner WHERE EMPLOYEE IS FALSE;', (err, filas2)=>{
      if (err) throw err;
      res.send(filas2);
    });
  });

const puerto = process.env.PUERTO || 3000;
app.listen(puerto, function(){
  console.log("Servidor ok en puerto: "+puerto);
});

/*var express = require('express');

const { Client } = require('pg');

var app = express();
app.use(express.json());

const client = new Client({
  host: 'localhost',
  user: 'Equipo A',
  password: 'Equipoa..',
  database: 'Odoo'
});

client.connect();

app.get('inetpub/wwwroot/app', (req, res)=>{
client.query('SELECT login FROM res_users WHERE ACTIVE IS TRUE;', (err, res) => {
    console.log(err ? err.stack : res.rows);
    client.end();
  });
});

const puerto = process.env.PUERTO || 3000;
app.listen(puerto, function(){
  console.log("Servidor ok en puerto: "+puerto);
});*/