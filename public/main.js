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