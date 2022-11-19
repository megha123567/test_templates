const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const customer = require('./data/customer');
const qs = require('querystring');
const Handlebars = require('handlebars');
// const { template } = require('handlebars');


registerPartials();
const server = http.createServer((req, res) =>{
    const link = url.parse(req.url, true);
    const query = link.query;
    const page = link.pathname;
    
    if(page == "/"){
        customer.getAll((err, result)=>{
            var context = {data: result};
            let t = renderTemplate('index', context);
            console.log(context);
            res.end(t);
        });
    }
    else if(page == '/customer/create' && req.method == 'GET'){
        let template = renderTemplate('create', {});
        res.end(template);
    }
    else if(page == '/customer/create' && req.method == 'POST'){
        let formData = '';
        req.on('data', function(data){
            formData += data.toString()
        });
        req.on('end', function(){
            let userData = qs.parse(formData);
            customer.addOne(userData.name, userData.email, userData.age , (err, result) => {
                var context = {
                    result:{
                        success: true,
                        errors: []
                    }    
                };
                if(err){
                    console.log(err);
                    context.result.success = false;  
                }
                let t = renderTemplate('create', context);
                res.end(t);
            });
        });
    }
});

server.listen(80);

function renderTemplate(name, data){
    var filePath = path.join(__dirname, "templates", name+".hbs");
    let templateText = fs.readFileSync(filePath, "utf8");
    let template = Handlebars.compile(templateText);
    return template(data);

}

function registerPartials(){
    var filePath = path.join(__dirname, "templates", "partials", "navbar.hbs");
    let templateText = fs.readFileSync(filePath, "utf8");
    Handlebars.registerPartial("navbar", templateText);
}