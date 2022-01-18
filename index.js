const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const paylib = require("pay-lib");
const app = express();

app.use(express.urlencoded({ extended:false }));
app.use(express.json());


app.engine("hbs", exphbs({defaultLayout: "main"}));
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.render("index");
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