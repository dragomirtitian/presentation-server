import express from 'express';
import bodyParser from 'body-parser';
import data from './data.json'

const app = express();
app.use(bodyParser.urlencoded())
app.use(bodyParser.json());

app.get("/products", (req, res) => 
{
    let products = data.products;
    let search: string = req.query["search"];
    if(search) {
        products = products.filter(p => p.productName.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1);
    }
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
})


app.put("/product/:id", (req, res) => 
{
    let products = data.products;
    let id = +req.params["id"]
    let product = products.find(p => p.productId === id);
    if(!product) {
        res.status(404); 
        res.send("Product not found");
    } else {
        Object.assign(product, req.body);
        res.json(product);
    }
})

app.listen(3333);

setTimeout(() => import('./test'), 1000);