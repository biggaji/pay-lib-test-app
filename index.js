const express = require("express");
const exphbs = require("express-handlebars");
const paylib = require("pay-lib");
const app = express();

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

// app.engine("hbs", exphbs({ defa}))

app.get('/', (req,res) => {
    res.send("Hello payment");
});

app.get("/disbursed", async (req,res) => {
    const receipents = [
        {
            name: "vhikky",
            amount: 20000
        },
        {
            name: "yinka",
            amount: 90000
        },
        {
            name: "dolapo",
            amount: 50000
        }
    ];

    let paymentIntent = await paylib.disburse.send(receipents);

    res.json(paymentIntent);
});

app.listen(3000, () => {
    console.log("Server payment running");
});