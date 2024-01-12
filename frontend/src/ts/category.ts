
const to_ken = sessionStorage.getItem('token');
const Role = sessionStorage.getItem('role');

if (Role == 'normal'){
  const addDish = document.getElementById('add-dish');
  const mydishes = document.getElementById('my-dishes');
  addDish?.classList.add('d-none');
  mydishes?.classList.add('d-none');
}
if (Role == 'cook'){
  const addDish = document.getElementById('add-dish');
  const mydishes = document.getElementById('my-dishes');
  addDish?.classList.remove('d-none');
  mydishes?.classList.remove('d-none');
}

function display (type:boolean){
    fetch(`http://localhost:3000/recipes/category/${type}`, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + to_ken,
      },
  })
    .then(res => res.json())
    .then(json => show(json)) 
  
  }

interface Json{
    _id: string,
    name: string,
    description:string,
    cookTime:number,
    people: number,
    ingredients:string[],
    steps: string[],
    fasting: boolean,
    type:string,
    image: string
}
  const contain = document.createElement('div');
  contain.classList.add('mb-5');

  function show (json: Array<Json>){
    console.log(json)
    contain.innerHTML = '';
    const arr:Array<Json> = json
    console.log(arr);
    for (let iter of arr){
      const flex = document.createElement('div');
      flex.classList.add('d-flex','bg-white','m-3');
      const img = document.createElement('img');
      img.src = iter.image;
      img.classList.add('img-fluid');
      img.style.width = '10%';
      img.style.height = '10%';
      flex.appendChild(img);
      const description = document.createElement('p');
      description.classList.add('m-3');
      description.textContent = iter.description;
      flex.appendChild(description);
      const idValue = iter._id;
      sessionStorage.setItem('id-food', idValue);
      flex.onclick = () => {
      
        window.location.href = 'singledish.html'
      }
      contain.appendChild(flex);      
    }
    document.body.appendChild(contain);
    
  }