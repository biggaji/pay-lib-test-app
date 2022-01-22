if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
};

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

app.post('/process_payout', async (req,res) => {
    // pass payload to paylib
    paylib.disburse.send(req.body)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    });
});
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Payment server running on port " + PORT);
});