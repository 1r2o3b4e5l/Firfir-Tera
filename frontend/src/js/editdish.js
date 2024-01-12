"use strict";
let recipeid = sessionStorage.getItem('f_id');
let tokenId = sessionStorage.getItem('token');
const rolE = sessionStorage.getItem('role');
if (rolE == 'normal') {
    const addDish = document.getElementById('add-dish');
    const mydishes = document.getElementById('my-dishes');
    addDish === null || addDish === void 0 ? void 0 : addDish.classList.add('d-none');
    mydishes === null || mydishes === void 0 ? void 0 : mydishes.classList.add('d-none');
}
if (rolE == 'cook') {
    const addDish = document.getElementById('add-dish');
    const mydishes = document.getElementById('my-dishes');
    addDish === null || addDish === void 0 ? void 0 : addDish.classList.remove('d-none');
    mydishes === null || mydishes === void 0 ? void 0 : mydishes.classList.remove('d-none');
}
let recipeName;
let description;
let servingText;
let prepTimeTest;
let categoryTwo;
let stepDiv;
let ingDiv;
fetch(`http://localhost:3000/recipes/${recipeid}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenId,
    },
})
    .then(res => res.json())
    .then(json => handler(json));
function handler(json) {
    let parent = document.getElementById('parent');
    let picture = document.createElement('img');
    picture.src = json.image;
    picture.classList.add('w-50');
    parent.appendChild(picture);
    let wholeDiv = document.createElement('div');
    wholeDiv.classList.add("w-25", "bg-white");
    wholeDiv.style.margin = '5%';
    recipeName = document.createElement('h1');
    recipeName.innerHTML = json.name;
    recipeName.contentEditable = "true";
    recipeName.classList.add('bg-secondary', 'border-primary', 'p-2', 'text-white');
    wholeDiv.appendChild(recipeName);
    wholeDiv.classList.add("d-flex", "flex-column", "align-items-center", "justify-content-evenly");
    description = document.createElement('p');
    description.innerHTML = json.description;
    description.contentEditable = "true";
    description.classList.add('bg-secondary', 'container', 'border-primary', 'p-2', 'text-white');
    wholeDiv.appendChild(description);
    let iconsRow = document.createElement('div');
    iconsRow.classList.add("d-flex", "justify-content-end");
    let serving = document.createElement('div');
    let iconServing = document.createElement('img');
    iconServing.style.width = '20px';
    iconServing.style.marginLeft = '5px';
    servingText = document.createElement('p');
    servingText.innerHTML = json.people.toString();
    servingText.contentEditable = "true";
    iconServing.src = '../Images/people.png';
    serving.appendChild(iconServing);
    serving.appendChild(servingText);
    serving.classList.add("m-5");
    serving.style.display = 'flex-column';
    let preptime = document.createElement('div');
    let iconTime = document.createElement('img');
    iconTime.style.width = '20px';
    prepTimeTest = document.createElement('p');
    prepTimeTest.innerHTML = json.cookTime.toString();
    prepTimeTest.contentEditable = "true";
    iconTime.src = '../Images/stopwatch.png';
    iconTime.style.marginLeft = '5px';
    preptime.appendChild(iconTime);
    preptime.appendChild(prepTimeTest);
    preptime.classList.add("m-5");
    preptime.style.display = 'flex flex-column';
    iconsRow.appendChild(serving);
    iconsRow.appendChild(preptime);
    let category = document.createElement('div');
    let categoryOne = document.createElement('p');
    categoryOne.innerHTML = "Fasting?";
    let fastingCheckBox = document.createElement('input');
    fastingCheckBox.type = 'checkbox';
    fastingCheckBox.classList.add("mx-2");
    fastingCheckBox.checked = json.fasting;
    categoryOne.appendChild(fastingCheckBox);
    categoryOne.classList.add("mx-5", "bg-primary", "d-flex", "flex-row");
    categoryTwo = document.createElement('p');
    categoryTwo.innerHTML = json.type;
    categoryTwo.classList.add("mx-5", "bg-primary");
    categoryTwo.contentEditable = "true";
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
    stepDiv = document.getElementById("steps");
    for (const step of steps) {
        const div = document.createElement('div');
        const ptag = document.createElement('p');
        ptag.innerHTML = step;
        ptag.contentEditable = "true";
        ptag.classList.add('bg-secondary', 'container', 'border-primary', 'p-2', 'text-white');
        ptag.appendChild(document.createElement('br'));
        div.appendChild(ptag);
        stepDiv.appendChild(div);
    }
    const ings = JSON.parse(json.ingredients[0]);
    console.log(ings);
    ingDiv = document.getElementById("ingridients");
    for (const step of ings) {
        const div = document.createElement('div');
        div.classList.add("d-flex", "flex-wrap");
        const ptag = document.createElement('p');
        ptag.contentEditable = "true";
        ptag.classList.add('bg-secondary', 'container', 'border-primary', 'p-2', 'text-white');
        ptag.innerHTML = step;
        ptag.classList.add("d-flex", "flex-wrap");
        div.appendChild(ptag);
        ingDiv.appendChild(div);
    }
}
function sendPatch() {
    const newName = recipeName.innerHTML;
    const newDesc = description.innerHTML;
    const newPeople = parseInt(servingText.innerHTML);
    const newCookTime = parseInt(prepTimeTest.innerHTML);
    const newFasting = document.querySelector('input[type="checkbox"]').checked;
    const newType = categoryTwo.innerHTML;
    const newSteps = [];
    for (const step of stepDiv.children) {
        newSteps.push(step.children[0].textContent || '');
    }
    const newIngs = [];
    for (const step of ingDiv.children) {
        newIngs.push(step.children[0].textContent || '');
    }
    const data = {
        name: newName,
        description: newDesc,
        people: newPeople,
        cookTime: newCookTime,
        fasting: newFasting,
        type: newType,
        steps: JSON.stringify(newSteps),
        ingredients: JSON.stringify(newIngs)
    };
    const dataString = JSON.stringify(data);
    console.log(dataString, recipeid, tokenId);
    const thing = `http://localhost:3000/recipes/${recipeid}`;
    console.log(thing);
    fetch(thing, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + tokenId,
            'Content-Type': 'application/json',
        },
        body: dataString,
    }).then(res => {
        if (res.ok) {
            window.location.href = 'mydishes.html';
        }
        else {
            console.log(res);
        }
    });
}
