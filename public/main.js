"use strict";

// pop nav controls
const popup = document.querySelector(".popup_container");

function closePopup() {
    popup.style.display = "none";
    popup.style.transition = "transform .3s ease-in .3s";
    popup.style.transform = "translateY(0%)";
    document.body.style.backgroundColor = "#fff";
};

function openPopup() {
    document.body.style.backgroundColor = "rgba(0,0,0,0.23)";
    popup.style.transform = "translateY(-0.1%)";
    popup.style.bottom = "-0.1%";
    popup.style.display = "block";
};

let popup_trigger, popup_closer;

popup_trigger = document.getElementById("trigger_popup");
popup_closer = document.getElementById("close_nav");

popup_trigger.addEventListener("click", () => {
    openPopup();
});
popup_closer.addEventListener("click", () => {
    closePopup();
});


// form section
let username = document.getElementById("username");
let amount = document.getElementById("amount");

let users = document.querySelector(".users");
let addRecpBtn = document.querySelector(".add_receipent");
const form_container = document.getElementById("form_container");
let submitBtn = document.getElementById("submit_payouts");

function displayForm() {
    demo_form.style.display = "block";
    addRecpBtn.style.display = "none";
    username.value = "";
    amount.value = "";
};

function addUser(arr) {
    arr.forEach(obj => {
        let p = document.createElement("p");
        console.log(obj)
        p.textContent = `Send ${obj["name"]} - #${obj["amount"]}`;
        users.appendChild(p);
    });
};

let addUserBtn = document.querySelector(".add_user");
let demo_form = document.getElementById("demo_form");

let usersArr = [];
let arrToSend = [];

addUserBtn.addEventListener("click", (e) => {
    if(usersArr.length < 1) {
        usersArr.splice(0, 0, {name: username.value, amount: amount.value});
    } else {
        usersArr.splice(0, 1, {name: username.value, amount: amount.value});
    };
    arrToSend.push({name: username.value, amount: amount.value});
    addUser(usersArr);
    demo_form.style.display = "none";
    submitBtn.disabled = false;
    addRecpBtn.style.display = "block";
    addRecpBtn.innerHTML = "Add more receipents";
});



addRecpBtn.addEventListener("click", () => {
    displayForm();
});

// toggle function

// handle payout process
let form = document.getElementById("payout_form");
const spinner = document.getElementById("loading_indicator");

submitBtn.addEventListener("click", async (e) => {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        let payload = arrToSend;
        console.log(JSON.stringify(payload));
        let response = await fetch('/process_payout', {"content-type": "application/json", method: "POST", body: JSON.stringify(payload)});
    
        // let resp = await response.json();
        return response.json()
        .then(resp => {
            console.log(resp);
        })
        .catch(err => {
            console.log(err);
        });
    });
});
