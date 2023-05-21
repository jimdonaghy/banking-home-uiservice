
let express = require("express");
let app = express();app.listen(3000, () => {
    console.log("Server running on port 3000");
});

let RESTClient = require('node-rest-client').Client;
let restClient = new RESTClient();

let response = "{}";


function asyncFetchAccounts() {
    return new Promise(resolve => {
        restClient.get("accounts-domainserv-git:8081/accounts", (data,response)=> {
         resolve(data)
       })
    })
 }

 function asyncFetchCustomers() {
    return new Promise(resolve => {
        restClient.get("customers-domainservice:8081/customers", (data,response)=> {
         resolve(data)
       })
    })
 }

 async function getData(){

    let accounts = await asyncFetchAccounts();
    let customers =  await asyncFetchCustomers();
    
    response = accounts.concat(customers);

    return response;
 }


app.get("/url", (req, res, next) => {
    
    getData().then(
        (data) => { res.send(data);
    });
    
    
});





