require('dotenv').config()
const bodyParser = require('body-parser')

let express = require('express');
let app = express();

app.use(function logger(req, res, next) {
    // Do something
    // Call the next function in line:
    console.log('I run for all routes');
    var string =  req.method + " " + req.path + " - " + req.ip;
    console.log(string)
    next();
    });

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
},function(req, res){
    res.send({time: req.time});
}
)

app.get('/:word/echo', function(req, res){
    res.send({echo: req.params.word})
})

// app.get('/name', function(req, res){
//     res.send({name: req.query.first + " " + req.query.last})
// })

app.route('/name').get(function(req, res){
    res.send({name: req.query.first + " " + req.query.last})
}).post(function(req, res){
    res.send({name: req.body.first + " " + req.body.last})

})

app.get('/', kpcHandler);

app.get('/json', kpcJsonHandler);

function kpcJsonHandler(req, res) {
    
    if (process.env.MESSAGE_STYLE == 'uppercase'){
        jsonMsg = { "message": "HELLO JSON" }
    } else {
        jsonMsg = { "message": "Hello json" }
    }
    res.json(jsonMsg)
}
function kpcHandler(req, res) {
    absolutePath = __dirname + '/views/index.html';

    res.sendFile(absolutePath);
    app.use('/public', express.static(__dirname + '/public'))
}


 module.exports = app;
