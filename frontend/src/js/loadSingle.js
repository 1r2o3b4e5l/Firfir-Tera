"use strict";
const token_ = sessionStorage.getItem('token');
const foodId = sessionStorage.getItem('id-food');
console.log(foodId);
fetch(`http://localhost:3000/recipes/${foodId}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token_,
    }
})
    .then(res => res.json())
    .then(json => handler(json));
function handler(json) {
    console.log(json);
    let parent = document.getElementById('parent');
    let picture = document.createElement('img');
    picture.src = json.image;
    picture.classList.add('w-50');
    console.log(picture);
    parent.appendChild(picture);
    let wholeDiv = document.createElement('div');
    wholeDiv.classList.add("w-md-75", "bg-white");
    wholeDiv.style.margin = '5%';
    let name = document.createElement('h1');
    name.innerHTML = json.name;
    wholeDiv.appendChild(name);
    wholeDiv.classList.add("d-flex", "flex-column", "align-items-center", "justify-content-evenly");
    let description = document.createElement('p');
    description.innerHTML = json.description;
    wholeDiv.appendChild(description);
    let iconsRow = document.createElement('div');
    iconsRow.classList.add("d-flex", "justify-content-end");
    let serving = document.createElement('div');
    let iconServing = document.createElement('img');
    iconServing.style.width = '20px';
    iconServing.style.marginLeft = '5px';
    let servingText = document.createElement('p');
    servingText.innerHTML = `Enough for<br/> ${json.people} people`;
    iconServing.src = '../Images/people.png';
    serving.appendChild(iconServing);
    serving.appendChild(servingText);
    serving.classList.add("m-5");
    serving.style.display = 'flex-column';
    let preptime = document.createElement('div');
    let iconTime = document.createElement('img');
    iconTime.style.width = '20px';
    let prepTimeTest = document.createElement('p');
    prepTimeTest.innerHTML = `Ready in <br/> ${json.cookTime} minutes`;
    iconTime.src = '../Images/stopwatch.png';
    iconTime.style.marginLeft = '5px';
    preptime.appendChild(iconTime);
    preptime.appendChild(prepTimeTest);
    preptime.classList.add("m-5");
    preptime.style.display = 'flex flex-column';
    iconsRow.appendChild(serving);
    iconsRow.appendChild(preptime);
    const category = document.createElement('div');
    const categoryOne = document.createElement('p');
    if (json.fasting) {
        categoryOne.innerHTML = "Fasting";
    }
    else {
        categoryOne.innerHTML = "Not Fasting";
    }
    categoryOne.classList.add("mx-5", "bg-primary");
    const categoryTwo = document.createElement('p');
    categoryTwo.innerHTML = json.type;
    categoryTwo.classList.add("mx-5", "bg-primary");
    category.classList.add("d-flex", "flex-row");
    category.appendChild(categoryOne);
    category.appendChild(categoryTwo);
    wholeDiv.appendChild(iconsRow);
    wholeDiv.appendChild(category);
    parent.appendChild(wholeDiv);
    StepAndIng(json);
}
function StepAndIng(json) {
    const steps = JSON.parse(json.steps[0]);
    console.log(steps);
    let stepDiv = document.getElementById("steps");
    for (const step of steps) {
        const div = document.createElement('div');
        const ptag = document.createElement('p');
        ptag.innerHTML = step;
        ptag.appendChild(document.createElement('br'));
        div.appendChild(ptag);
        stepDiv.appendChild(div);
    }
    let ings = JSON.parse(json.steps[0]);
    let ingDiv = document.getElementById("ingridients");
    for (const step of ings) {
        const div = document.createElement('div');
        div.classList.add("d-flex", "flex-wrap");
        const ptag = document.createElement('p');
        ptag.innerHTML = step;
        ptag.classList.add("d-flex", "flex-wrap");
        div.appendChild(ptag);
        ingDiv.appendChild(div);
    }
}
