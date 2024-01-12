let id_s = sessionStorage.getItem('id') ;
let theToken  = sessionStorage.getItem('token');
let roLE = sessionStorage.getItem('role');
console.log(id_s);
if (roLE == 'normal'){
    const addDish = document.getElementById('add-dish');
    const mydishes = document.getElementById('my-dishes');
    addDish?.classList.add('d-none');
    mydishes?.classList.add('d-none');
}
if (roLE == 'cook'){
    const addDish = document.getElementById('add-dish');
    const mydishes = document.getElementById('my-dishes');
    addDish?.classList.remove('d-none');
    mydishes?.classList.remove('d-none');
}

fetch(`http://localhost:3000/recipes/myrecipes/${id_s}`, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + theToken,
      },
  })
.then(res => res.json())
.then(json => display(json))

interface Json{
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

function display(json: Json[]): void {
    const contain = document.getElementById('contain');
    if (!contain) {
        return; 
    }

    contain.innerHTML = '';

    for (const iter of json) {
        const flex = document.createElement('div');
        flex.classList.add('d-flex', 'bg-white', 'm-3');

        const img = document.createElement('img');
        img.src = iter.image;
        img.classList.add('img-fluid');
        img.style.width = '5%';
        img.style.height = '10%';
        flex.appendChild(img);


        const title = document.createElement('p');
        title.innerHTML = iter.name;
        flex.appendChild(title);

      
        const description = document.createElement('p');
        description.classList.add('m-3');
        description.textContent = iter.description;
        flex.appendChild(description);

    
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-danger', 'm-3');
        button.textContent = 'Delete';
        button.onclick = () => {
            const isConfirmed = window.confirm('Are you sure you want to delete?');
            console.log(iter._id);
            if (isConfirmed) {
                fetch(`http://localhost:3000/recipes/${iter._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + theToken,
                    }
                });
                window.location.reload();
            }
        };
        flex.appendChild(button);

      
        const edit = document.createElement('button');
        edit.classList.add('btn', 'btn-warning', 'm-3');
        edit.onclick = () => {
            sessionStorage.setItem('f_id', iter._id);
            window.location.href = 'editdish.html';
        };
        edit.textContent = 'Edit';
        flex.appendChild(edit);

    
        contain.appendChild(flex);
    }
    document.body.appendChild(contain);
}

