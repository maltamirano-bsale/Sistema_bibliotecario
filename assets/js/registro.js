window.addEventListener('load', () =>{
    const api_aplaplac = 'http://localhost:3000';

    let infoLogin = window.location.href;
    let id_usuario = infoLogin.charAt(infoLogin.length - 1)
    let id_usuario2 = infoLogin.charAt(infoLogin.length - 2)

    if(parseInt(id_usuario) >= 0 && parseInt(id_usuario2) >= 0 ){
        id_usuario = infoLogin.charAt(infoLogin.length - 2) + infoLogin.charAt(infoLogin.length - 1)
    }
    else{
        id_usuario = infoLogin.charAt(infoLogin.length - 1)
    }

    document.querySelector('#registro').addEventListener('click', (e)=>{
        e.preventDefault();

        registerUser(api_aplaplac, id_usuario);
    });

})

function registerUser(host, id_usuario){
    try {
        url = `${host}/library_registration`;
        let body_request = {"id_usuario":id_usuario}
        let args = {method: 'POST', body: JSON.stringify(body_request), 
                headers:{'Content-Type': 'application/json'}}

        fetch(url, args).then(res =>{
            res.json().then(data=>{
                console.log(data);
                if(data['success']){

                    Swal.fire({
                        title: 'Perfecto!',
                        text: "Ya eres miembro de la biblioteca Aplaplac! Ahora podras buscar y solicitar tus libros preferidos",
                        icon: 'success',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'buscar libros',
                        }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = `http://127.0.0.1:5500/index.html?user=${id_usuario}`
                        }
                        })
                }
                else{
                    if(data['message'] == 'usuario ya cuenta con registro de biblioteca'){
                        Swal.fire(
                            'Ups!',
                            'ya cuentas con registro de biblioteca',
                            'warning'
                        )

                    }     
                }
            });
        });

    } catch (error) {
    alert("Ha ocurrido un error al cargar los productos : ", error);
    }
}
