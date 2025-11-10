var http = require('http');
var express = require("express");
var RED = require("node-red");

// Crear una app Express
var app = express();

// Crear el servidor
var server = http.createServer(app);

// Definir los ajustes de Node-RED
var settings = {
    httpAdminRoot: "/",
    httpNodeRoot: "/api",
    userDir: process.env.NODE_RED_USER_DIR || "./data", // Usará el disco persistente
    functionGlobalContext: { }
};

// Iniciar el runtime de Node-RED
RED.init(server, settings);

// Servir el editor
app.use(settings.httpAdminRoot, RED.httpAdmin);

// Servir los nodos HTTP
app.use(settings.httpNodeRoot, RED.httpNode);

var port = process.env.PORT || 8080;

server.listen(port, function() {
    RED.start();
    console.log("Node-RED escuchando en puerto " + port);
});
