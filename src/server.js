
//to create http server we need to import http server.http is core module of node.js
var http = require('http');

//Node’s require function to use the express module. require is similar to keywords like import or include in other languages. require takes the name of a package as a string argument and returns a package
var express = require('express');

// Requires the Express module just as you require other modules and and puts it in a variable.
var app = express();

//To handle HTTP POST request in Express  install middleware module called body-parser.body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request
var bodyparser = require('body-parser');

//basically want to use JSON format
app.use(bodyparser.json());

//This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).When extended property is set to true, the URL-encoded data will be parsed with the qs library.when extended property is set to false, the URL-encoded data will instead be parsed with the querystring library.
app.use(bodyparser.urlencoded({ extended: true }));

//libarary to interact wth mongodb to managing data 
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;


//for resolving error Access to XMLHttpRequest at 'http://localhost:8000/api/getemp' from origin 'http://localhost:4200' has been blocked by CORS(CORS (Cross-Origin Resource Sharing) ) (policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
   
    next();
});

mongoose.connect('mongodb://localhost:27017/empdb',
    {
        useNewUrlParser: true
        //db=client.db('easy-notes')
    }).then(() =>
     {
        console.log('Successfully connected to DB');
    });



var employeeschema = new mongoose.Schema(
    {
        name: String,
        city: String,
        designation: String,
        salary:Number,
        education:String,
        gender:String,
        doj:Date
        
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

var Emp = mongoose.model('Emp', employeeschema);

app.get('/api/empdetails', (req, res) => 
{
    console.log('get')
    Emp.find((error, data) => 
    {
        console.log(data);
        res.send(data);
    })
    //res.json({"messsage":"welcome to easynote application "});
});

//to get single emp by id 
app.get('/api/empdetailsbyid/:id',(req,res)=>
{
   
    console.log("requested id:"+req.params.id);
    Emp.findById({_id:req.params.id},function (err, post) 
    {
        //console.log(req.params.id);
        console.log(post);
     
        //if (err) return next(err);
        res.json(post);
    })
});


app.post('/api/saveemp', (req, res) => 
{
    console.log('Rwequest body : ' + JSON.stringify(req.body));
    var newrecord = new Emp
        ({

            name: req.body.name,
            city: req.body.city,
            designation: req.body.designation,
            salary:req.body.salary,
            education:req.body.education,
            gender:req.body.gender,
            doj:req.body.doj
        })
    newrecord.save().then(post => res.json(post));
});



app.put('/api/updateempdetails/:id', (req, res) =>
 {
     debugger;
    console.log("put");
    console.log(req.params.id);
    console.log(req.body)
    Emp.findByIdAndUpdate({_id:req.params.id},
        {
            //id: req.body.id,
            name: req.body.name,
            city: req.body.city,
            designation: req.body.designation,
            salary:req.body.salary,
            education:req.body.education,
            gender:req.body.gender,
            doj:req.body.doj
        },
        function (err, data) 
        {
            if (err) res.json(err);
            else
             {
                console.log("updated data " + data);
                res.send(data);
            }
        });

    });

    app.delete('/api/deleteemp/:id', (req, res) => {
        console.log('delete');
        Emp.findByIdAndRemove({ _id: req.params.id },
            function (err, data) {
                if (err) res.json(err);
                else {
                    console.log('deleted data' + data);
                    res.send(data);
                }

            })
    })






    app.listen(5000, () => {
        console.log('server is listening to port 5000');

    });





