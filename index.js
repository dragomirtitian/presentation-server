"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const data_json_1 = __importDefault(require("./data.json"));
const app = express_1.default();
app.use(body_parser_1.default.urlencoded());
app.use(body_parser_1.default.json());
app.get("/products", (req, res) => {
    let products = data_json_1.default.products;
    let search = req.query["search"];
    if (search) {
        products = products.filter(p => p.productName.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1);
    }
    res.json(products);
});
app.get("/product/:id", (req, res) => {
    let products = data_json_1.default.products;
    let id = +req.params["id"];
    let product = products.find(p => p.productId === id);
    if (!product) {
        res.status(404);
        res.send("Product not found");
    }
    else {
        res.json(product);
    }
});
app.post("/product", (req, res) => {
    let products = data_json_1.default.products;
    products.push(req.body);
});
app.put("/product/:id", (req, res) => {
    let products = data_json_1.default.products;
    let id = +req.params["id"];
    let product = products.find(p => p.productId === id);
    if (!product) {
        res.status(404);
        res.send("Product not found");
    }
    else {
        Object.assign(product, req.body);
        res.json(product);
    }
});
app.listen(3333);
setTimeout(() => Promise.resolve().then(() => __importStar(require('./test'))), 1000);
//# sourceMappingURL=index.js.map