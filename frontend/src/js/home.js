"use strict";
const token = sessionStorage.getItem('token');
const role = sessionStorage.getItem('role');
const cook_id = sessionStorage.getItem('cook-id');
console.log(token);
if (role == 'normal') {
    const addDish = document.getElementById('add-dish');
    const mydishes = document.getElementById('my-dishes');
    addDish === null || addDish === void 0 ? void 0 : addDish.classList.add('d-none');
    mydishes === null || mydishes === void 0 ? void 0 : mydishes.classList.add('d-none');
}
if (role == 'cook') {
    const addDish = document.getElementById('add-dish');
    const mydishes = document.getElementById('my-dishes');
    addDish === null || addDish === void 0 ? void 0 : addDish.classList.remove('d-none');
    mydishes === null || mydishes === void 0 ? void 0 : mydishes.classList.remove('d-none');
}
//show on load
fetch(`http://localhost:3000/recipes`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    },
})
    .then(res => res.json())
    .then((data) => {
    const randomIndex = Math.floor(Math.random() * data.length);
    showRandom(data[randomIndex]);
});
//change based on time interval
setInterval(() => {
    fetch(`http://localhost:3000/recipes`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    })
        .then(res => res.json())
        .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        showRandom(data[randomIndex]);
    });
}, 2500);
function showRandom(json) {
    console.log(json);
    const parent = document.getElementById("random");
    parent.addEventListener('click', () => {
        const id = json._id;
        sessionStorage.setItem('id-food', id); // Fix: Use correct syntax for setting an item in sessionStorage
        window.location.href = 'singledish.html';
    });
    const title = document.getElementById('title');
    title.innerHTML = json.name;
    const img = document.getElementById('img');
    const description = document.getElementById('description');
    img.src = json.image;
    img.style.width = "50%";
    img.style.height = "50%";
    description.innerHTML = json.description;
}
