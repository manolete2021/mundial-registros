

function login(event){

    event.preventDefault()
    let email = document.getElementById('email').value;
    let contrasena = document.getElementById('password').value;


    if (email === '' || contrasena === '') {
        alert("por favor complete los datos")
        return false;
    }

    
    let btnsubmit = event.target.querySelector('button[type="submit"]');
    btnsubmit.disabled = true;
    btnsubmit.textContent = 'Iniciando sesion.....'


    fetch('http://localhost:5000/login', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email:email,contrasena:contrasena})
    }).then(response =>{
        if(response.ok){
            return response.json()
        }else{
            throw new Error('Error al iniciar sesión')
        }
    }).then(data => {
            // Guardar token y nombre del usuario en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.usuario.nombre);
        localStorage.setItem('userEmail', data.usuario.email);
        localStorage.setItem('userId', data.usuario.id);
        
        alert('Inicio de sesión exitoso')
        window.location.href = 'home.html'
    }).catch(error => {
        console.error('Error:', error)
    }).finally(() => {
        btnsubmit.disabled = false;
        btnsubmit.textContent = 'Iniciar Sesión';
    })


    






    }

function recuperarContrasena(){
    window.location.href = 'recuperarcontrasena.html'
}

