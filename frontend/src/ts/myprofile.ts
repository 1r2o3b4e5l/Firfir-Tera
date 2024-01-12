const urlToken: string = sessionStorage.getItem('token') as string ;
const cookId: string = sessionStorage.getItem('id') as string;
const ROLE = sessionStorage.getItem('role');
console.log(cookId, urlToken);

if (ROLE == 'normal'){
  const addDish = document.getElementById('add-dish');
  const mydishes = document.getElementById('my-dishes');
  addDish?.classList.add('d-none');
  mydishes?.classList.add('d-none');
}
if (ROLE == 'cook'){
  const addDish = document.getElementById('add-dish');
  const mydishes = document.getElementById('my-dishes');
  addDish?.classList.remove('d-none');
  mydishes?.classList.remove('d-none');
}


interface Profile{
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    
}

fetch(`http://localhost:3000/user/${cookId}`,{
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + urlToken,
  }
  
})

  .then((response) => response.json())
  .then((json) => handle(json));

let container = document.getElementById('container');
let nameVarElement: HTMLParagraphElement;
let fathersNameVarElement: HTMLParagraphElement;
let emailVarElement: HTMLParagraphElement;

function handle(json:Profile) {
  console.log(json);
  let nameWithContainer = document.getElementById('nameWithContainer') as HTMLDivElement;

  let labelElement = document.createElement('p');
  labelElement.innerHTML = "First Name: ";
  labelElement.classList.add('m-3', 'p-3');

  nameVarElement = document.createElement('p');
  nameVarElement.innerHTML = json.firstName;
  nameVarElement.classList.add('m-3', 'bg-secondary', 'p-3', 'text-white');
  nameVarElement.contentEditable = "true";

  nameWithContainer.appendChild(labelElement);
  nameWithContainer.appendChild(nameVarElement);
  console.log(nameWithContainer);

  // Fathers name
  let fathersNameWithContainer = document.getElementById('fathersNameContainer') as HTMLDivElement;

  let fathersNameLabelElement = document.createElement('p');
  fathersNameLabelElement.innerHTML = "Last Name: ";
  fathersNameLabelElement.classList.add('m-3', 'p-3');

  fathersNameVarElement = document.createElement('p');
  fathersNameVarElement.innerHTML = json.lastName;
  fathersNameVarElement.classList.add('m-3', 'container', 'bg-secondary', 'p-3', 'text-white');
  fathersNameVarElement.contentEditable = "true";

  fathersNameWithContainer.appendChild(fathersNameLabelElement);
  fathersNameWithContainer.appendChild(fathersNameVarElement);

  // Email
  let emailWithContainer = document.getElementById('emailContainer') as HTMLDivElement;
  let emailLabelElement: HTMLParagraphElement;
  emailLabelElement = document.createElement('p');
  emailLabelElement.innerHTML = "Email: ";
  emailLabelElement.classList.add('m-3', 'p-3');

  emailVarElement = document.createElement('p');
  emailVarElement.innerHTML = json.email;
  emailVarElement.classList.add('m-3', 'container', 'bg-secondary', 'p-3', 'text-white');
  emailVarElement.contentEditable = "true";

  emailWithContainer.appendChild(emailLabelElement);
  emailWithContainer.appendChild(emailVarElement);

  // Role
  let roleWithContainer = document.getElementById('role') as HTMLDivElement;

  let roleLabelElement = document.createElement('p');
  roleLabelElement.innerHTML = "Role: ";
  roleLabelElement.classList.add('m-3', 'p-3');

  let roleVarElement = document.createElement('p');
  roleVarElement.innerHTML = json.role;
  roleVarElement.classList.add('m-3', 'p-3');

  roleWithContainer.appendChild(roleLabelElement);
  roleWithContainer.appendChild(roleVarElement);
}

function saveChanges() {
  let firstName = nameVarElement.innerHTML;
  let lastName = fathersNameVarElement.innerHTML;
  let email = emailVarElement.innerHTML;
  console.log(email)

  let user = {
    "firstName":firstName,
    "lastName":lastName,
    "email":email
  };
  console.log(user);
  
  fetch(`http://localhost:3000/user/${cookId}`, {
    method: 'PATCH',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + urlToken,
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));

    let al = alert("Changes saved")
    window.location.href = 'home.html'
}

function deleteProfile() {
  fetch(`http://localhost:3000/user/${cookId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + urlToken,

    },
  });
  window.location.href = 'index.html';
}

function logout(){
  sessionStorage.removeItem('id');
  location.href='index.html';
}
