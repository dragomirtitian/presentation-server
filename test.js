"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
(async function () {
    try {
        var r = await node_fetch_1.default("http://localhost:3333/products?search=cart");
        console.log(await r.json());
        console.log(r);
    }
    catch (e) {
        console.log(e);
    }
})();
(async function () {
    try {
        var r = await node_fetch_1.default("http://localhost:3333/product/1111");
        console.log(r);
        console.log(await r.json());
    }
    catch (e) {
        console.log(e);
    }
})();
//# sourceMappingURL=test.js.map