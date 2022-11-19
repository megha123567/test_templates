const mysql = require('mysql2');

const connectionDetails = {
    host: 'localhost',
    user: 'root',
    password: 'Megha@2001',
    database: 'experion1'
}

function getConnection(){
    return mysql.createConnection(connectionDetails);
}

function executeQuery(query, parameters, callback){
    let connection = getConnection();
    connection.connect();
    connection.query(query, parameters, callback);
    connection.commit();
    connection.end();
}

module.exports.executeQuery = executeQuery;