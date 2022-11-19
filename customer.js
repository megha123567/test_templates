const db = require('./db');

function getAll(callback){
    const sql = "SELECT id, name, email, age FROM customers"
    db.executeQuery(sql, [], callback)
}
function addOne(name, email, age, callback){
    const sql = "INSERT INTO customers (name, email, country, age) VALUES (?, ?, 'IN', ?)";
    db.executeQuery(sql, [name,email,age], callback);
}

module.exports.getAll = getAll;
module.exports.addOne = addOne;