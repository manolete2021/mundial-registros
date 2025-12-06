

function registrar(event){

    event.preventDefault()
    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let contrasena = document.getElementById('password').value;


    if (nombre === '' || email === '' || contrasena === '') {
        alert("por favor complete todos los datos")
        return false;
    }

    
    let btnsubmit = event.target.querySelector('button[type="submit"]');
    btnsubmit.disabled = true;
    btnsubmit.textContent = 'Registrando.....'


    fetch('http://localhost:5000/registro', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre:nombre, email:email, contrasena:contrasena})
    }).then(response =>{
        if(response.ok){
            return response.json()
        }else{
            throw new Error('Error al registrar')
        }
    }).then(data => {
        alert('Registro exitoso')
        window.location.href = 'login.html'
    }).catch(error => {
        console.error('Error:', error)
        alert('Error al registrar. Por favor intente nuevamente.')
    }).finally(() => {
        btnsubmit.disabled = false;
        btnsubmit.textContent = 'Registrarse';
    })


    }

