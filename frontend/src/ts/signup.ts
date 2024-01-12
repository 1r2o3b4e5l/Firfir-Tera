interface SignUp{
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    role: string,
    title?: string,
    bio?: string,
}
document.addEventListener('DOMContentLoaded', ()=>{
    const form=document.getElementById('signup-form') as HTMLFormElement
    const btn=document.getElementById('signup') as HTMLButtonElement

    form.addEventListener('submit', async (event)=>{
        event.preventDefault()
        
        const formData=new FormData(form);
        console.log(formData);
        let jsonData: Record <string, string> = {};
        formData.forEach((value, key:any)=>{
            console.log(`${key}: ${value}`)
            jsonData[key] = value.toString();
        })
        const jsonDataString = JSON.stringify(jsonData);
        console.log(jsonDataString)
        
        try {
            const response = await fetch(`http://localhost:3000/auth/signup/${jsonData.role}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonDataString,
            });

            if (response.ok) {
                console.log('Form submitted successfully');
                const data = await response.json();
                console.log(data);
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('role', data.role[0]);
                sessionStorage.setItem('id', data.id);
                console.log(sessionStorage.getItem('id'));
                window.location.href = 'home.html'

            } else {
                console.error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    })
})