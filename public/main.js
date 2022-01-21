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
    addRecpBtn.innerHTML = "Add more receipent";
});



addRecpBtn.addEventListener("click", () => {
    displayForm();
});

// toggle function

// handle payout process
const spinner = document.getElementById("spinner");
const back_trigger = document.getElementById("back_nav");
const response_cont = document.querySelector(".response_container");
const success_response_cont = document.querySelector(".success_response");
const error_response_cont = document.querySelector(".error_response");
let payout_summary = document.getElementById("payout_receivers");
let error_reason = document.getElementById("reason");
let retryPayoutBtn = document.getElementById("retry_payout");

submitBtn.addEventListener("click", () => {

    spinner.style.display = "flex";

    let payload = arrToSend;
    fetch('/process_payout', { headers : { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(payload)})
    .then(resp => {
            return resp.json();
        })
        .then(data => {
            setTimeout(() => {
                spinner.style.display = "none";
            }, 3000);
            response_cont.style.display = "block";
        if(typeof data === "string") {
            // it is an error message
            // display it
            error_reason.innerHTML = `Reason: ${data}`;
            error_response_cont.style.display = "block";
        } else {
            // it is an object with the data
            // display it
            // generate summary
            success_response_cont.style.display = "block";
            data.forEach(receipent => {
                let p = document.createElement("p");
                p.className = "summary_logs";
                p.textContent = `${receipent["name"]} recieved #${receipent["amount"]}`;
                payout_summary.appendChild(p);
            });
            popup_closer.addEventListener("click", () => {
                location.reload();
            });
            back_trigger.style.visibility = "hidden";
        };
    })
    .catch(err => {
        spinner.style.display = "none";
        console.log("Error",err);
        // show error message
    });
});