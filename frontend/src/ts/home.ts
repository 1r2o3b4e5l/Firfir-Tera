const token = sessionStorage.getItem('token');
const role = sessionStorage.getItem('role');
const cook_id = sessionStorage.getItem('cook-id');

console.log(token);


if (role == 'normal'){
    const addDish = document.getElementById('add-dish');
    const mydishes = document.getElementById('my-dishes');
    addDish?.classList.add('d-none');
    mydishes?.classList.add('d-none');
}
if (role == 'cook'){
    const addDish = document.getElementById('add-dish');
    const mydishes = document.getElementById('my-dishes');
    addDish?.classList.remove('d-none');
    mydishes?.classList.remove('d-none');
}

//show on load
fetch(`http://localhost:3000/recipes`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    })
        .then(res => res.json()) 
        .then((data:any) => { 
            const randomIndex = Math.floor(Math.random() * data.length);
            showRandom(data[randomIndex])
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
        .then((data:any) => { 
            const randomIndex = Math.floor(Math.random() * data.length);
            showRandom(data[randomIndex])
        });
}, 2500)


  function showRandom(json:any){
    console.log(json)
    const parent:any = document.getElementById("random");
    parent.addEventListener('click' , () => {
        const id:string= json._id
        sessionStorage.setItem('id-food', id); // Fix: Use correct syntax for setting an item in sessionStorage
        window.location.href = 'singledish.html'
    })
    const title:any = document.getElementById('title');
    title.innerHTML = json.name;
    const img:any=document.getElementById('img');
    const description:any=document.getElementById('description');
    img.src = json.image;
    img.style.width = "50%"
    img.style.height = "50%"
    description.innerHTML=json.description;
  }