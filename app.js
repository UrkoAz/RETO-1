var express = require('express');
var mysql = require('mysql');
var cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());

//establecer parámetros de conexión
var con = mysql.createConnection({
  host: "192.168.1.143",
  user: "equipoaa",
  password: "equipoaa",
  database: "Odoo"
});

//establecer conexión
con.connect(function(err) {
  if (err) throw err;
  console.log("Conectado.");
});

//seleccionar los datos a mostrar
app.get('/api/director/', (req, res)=>{
con.query('SELECT id, name, job_title, work_email, department_id FROM HR_EMPLOYEE WHERE ACTIVE IS TRUE', (err, filas)=>{
    if (err) throw err;
    res.send(filas);
  });
});

//seleccionar los datos de la consulta 2 a mostrar
app.get('/api/profe/', (req, res)=>{
  con.query('SELECT DISTINCT id, name, email, calendar_last_notif_ack FROM res_partner where type = "student";', (err, filas2)=>{
      if (err) throw err;
      res.send(filas2);
    });
  });

//seleccionar los datos de la consulta 3 a mostrar
app.get('/api/secretario/', (req, res)=>{
  con.query('SELECT DISTINCT id, display_name, email, street, zip FROM res_partner WHERE EMPLOYEE IS FALSE;', (err, filas3)=>{
      if (err) throw err;
      res.send(filas3);
    });
  });

//seleccionar los datos de la consulta 4 a mostrar
app.get('/api/alumno/', (req, res)=>{
  con.query('SELECT DISTINCT name, work_email from hr_employee where job_title = "Profesor";', (err, filas4)=>{
      if (err) throw err;
      res.send(filas4);
    });
  });

//seleccionar los datos de la consulta 5 a mostrar
app.get('/api/familia/', (req, res)=>{
  con.query('SELECT DISTINCT name, work_email from hr_employee where job_title = "Profesor";', (err, filas5)=>{
      if (err) throw err;
      res.send(filas5);
    });
  });

const puerto = process.env.PUERTO || 3000;
app.listen(puerto, function(){
  console.log("Servidor ok en puerto: "+puerto);
});

// API postgre
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