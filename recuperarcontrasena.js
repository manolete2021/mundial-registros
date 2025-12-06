

function recuperarContrasena(event){

    event.preventDefault()
    let email = document.getElementById('email').value;
    let nuevaContrasena = document.getElementById('nuevaContrasena').value;


    if (email === '' || nuevaContrasena === '') {
        alert("por favor complete todos los campos")
        return false;
    }

    
    let btnsubmit = event.target.querySelector('button[type="submit"]');
    btnsubmit.disabled = true;
    btnsubmit.textContent = 'Procesando.....'


    fetch('http://localhost:5000/recuperar-contrasena', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            nueva_contrasena: nuevaContrasena
        })
    }).then(response =>{
        if(response.ok){
            return response.json()
        }else{
            throw new Error('Error al recuperar contraseña')
        }
    }).then(data => {
        alert('Contraseña recuperada exitosamente.')
        window.location.href = 'login.html'
    }).catch(error => {
        console.error('Error:', error)
        alert('Error al recuperar la contraseña. Por favor intente nuevamente.')
    }).finally(() => {
        btnsubmit.disabled = false;
        btnsubmit.textContent = 'Recuperar Contraseña';
    })


    }

