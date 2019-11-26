import express from 'express';
import bodyParser from 'body-parser';
import data from './data.json'

const app = express();
app.use(bodyParser.urlencoded())
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
  });

  
app.get("/products", (req, res) => 
{
    if(Math.random() > 0.8) {
        res.status(500);
        res.send("ERROR");
        return;
    }
    let products = data.products;
    let search: string = req.query["search"];
    if(search) {
        products = products.filter(p => p.productName.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1);
    }
    res.contentType("application/json");
    res.json(products);
})

app.get("/product/:id", (req, res) => 
{
    let products = data.products;
    let id = +req.params["id"]
    let product = products.find(p => p.productId === id);
    if(!product) {
        res.status(404); 
        res.send("Product not found");
    } else {
        res.json(product);
    }
})


app.post("/product", (req, res) => 
{
    let products = data.products;
    products.push(req.body);
    res.status(200);
    res.end();
})

app.get("/product", (req, res) => 
{
    let products = data.products;
    let product: typeof products[number] = req.body;
    if(!product.productId){
        product.productId = 1 + products.reduce((m, p) => Math.max(p.productId, m), 0);
    }
    products.push(req.body);
    res.status(200);
    res.end();
})

app.delete("/product/:id", (req, res) => 
{
    let products = data.products;
    let id = +req.params["id"]
    data.products = data.products.filter(p => p.productId !== id);
    res.status(200);
    res.end();
});
app.put("/product/:id", (req, res) => 
{
    let products = data.products;
    let id = +req.params["id"]
    let product = products.find(p => p.productId === id);
    if(!product) {
        res.status(404); 
        res.send("Product not found");
    } else {
        console.log(product)
        Object.assign(product, req.body);
        console.log(req.body)
        res.json(product);
    }
})

app.listen(3333);

setTimeout(() => import('./test'), 1000);