const express = require("express");
const cors = require("cors");
const { response } = require('express');
const stripe = require("stripe")("sk_test_51HQDHOG0TvrggPXhLMQQ3oKUGgEbtbOzlDdicEAzdf4dNrSTxhOXUqg5TMuOEKWBSsp5WobQ2Q1oIZldzwYwqCkH00ahp3WrjO")

// API

// App config
const app = express();

// middlewares
app.use(cors({origin: true}));
app.use(cors())
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("hello world"))

app.post("/payments/create",(request, response) => {
    const total = request.query.total;

    console.log("Payment Request Recieved BOOM!! for this amount ", total);

    stripe.paymentIntents.create({
        amount: parseInt(total), // in subunits of currency
        currency:"inr"
    })
	.then((paymentIntent) => {
		response.status(201).send({
        		clientSecret: paymentIntent.client_secret
		    })

	} )
	.catch((err) => console.log(err))


})

// listen command
app.listen(7000, () => {
	console.log("server")
})


