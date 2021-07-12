window.addEventListener('load', () =>{
    const api_aplaplac = 'http://localhost:3000';

    document.querySelector('#login').addEventListener('click', (e)=>{
        e.preventDefault();

        const email = document.querySelector('#email').value;
        const pass = document.querySelector('#pass').value;

        validUser(api_aplaplac, `valid_user/${email}/${pass}`);
    });

})

function validUser(host, endpoint){
    try {
        url = `${host}/${endpoint}`;

        fetch(url).then(res =>{
            res.json().then(data=>{
                if(data['status']){

                    const id_usuario = data['data'][0]['ID_USUARIO'];

                    window.location.href = `http://127.0.0.1:5500/mis-solicitudes.html?user=${id_usuario}`
                }
                else{
                    console.log("error");
                }
            });
        });

    } catch (error) {
    alert("Ha ocurrido un error al cargar los productos : ", error);
    }
}






