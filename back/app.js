let express = require("express");
let bodyParser = require("body-parser");
let mysql = require("mysql");
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","POST,GET,OPTIONS");
    res.header("Access-Control-Allow-Headers","Content-Type");
    res.header("Content-Type", "application/json");
    next();
});

var connection = mysql.createConnection({
    //host:'localhost',
    host:'127.0.0.1',   //无网络的情况下可连接 
    user:'root',
    password:'root',
    port:'3306',
    database:'zhuyang'
})
connection.connect();

app.get('/search/selectData',function(req,res,next){
    connection.query('select * from search_list',(err,response)=>{
        if(err) throw err;
        var sortValue = response.sort((size1,size2)=>{
            return size2.id-size1.id;
        })
        res.send(sortValue);
    });
})

app.post('/search/addData',function(req,res,next){
    console.log(req.body);
    connection.query('INSERT INTO search_list(name,content) VALUE(?,?)',["",req.body.inputData],(err,response)=>{
        if(err) throw err;
        console.log("增加一条数据")
    })
    res.send({msg:"success"});
});

app.post('/search/delectData',function(req,res,next){
    console.log(req.body);
    connection.query(`DELETE FROM search_list WHERE id=${req.body.d_id}`,(err,response)=>{
        if(err) throw err;
        console.log("删除一条数据")
    })
    res.send({msg:"success"});
});

app.listen(8888);