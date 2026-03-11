"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customer_1 = require("./customer");
var customer = new customer_1.Customer("John", "Doe", 30);
customer.greet();
console.log(customer.getAge());
