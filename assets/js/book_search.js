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
    navbar(id_usuario);
    getAllBooks(api_aplaplac, 'book', id_usuario);

})


function getAllBooks(host, endpoint, id_usuario){
    try {
        url = `${host}/${endpoint}`;

        fetch(url).then(res =>{
            res.json().then(data=>{
                showBooks(data['data'], id_usuario);
            });
        });

    } catch (error) {
    alert("Ha ocurrido un error al cargar los productos : ", error);
    }
}

function showBooks(data, id_usuario){
    try {
        for (let i=0; i < data.length; i++) {

            let cont_books = document.querySelector('.grilla-libros')
            let book = document.createElement('div');
            let html = '';
            
            //Guardar la información del data set json en variables
            const id_libro = data[i]['ID_LIBRO'];
            const id_estado_libro = data[i]['ID_ESTADO_SOLICITUD'];
            const nombre_libro = data[i]['NOMBRE_LIBRO'];
            const descripcion_libro = data[i]['DESCRIPCION_LIBRO'];
            const editorial = data[i]['EDITORIAL'];
            const stock = data[i]['STOCK'];
            const img = data[i]['IMAGEN'];
  
            html += `<div class="icon-box">
                        <div class="cont-img-libro">
                            <img src="${img}" alt="">
                        </div>

                        <h4 class="mt-3 title p-tittle"><a href="">${nombre_libro}</a></h4>
                        <p class="description font-weight-bold">Stock: <span class="font-weight-normal">${stock}</span></p>
                        <hr>
                        <button id=${id_libro} type="submit" class="btn-sol"">Solicitar</button>
                    </div>`;
                               
            book.innerHTML = html; 
            cont_books.append(book);       
        }

        solicitarLibro(id_usuario);
    } catch (error) {
        alert("Ha ocurrido un error al cargar los productos : ", error);
    }
}

function navbar(id_usuario){
    const nav = document.querySelector('#href-nav');
    let ul = document.createElement('ul');
    let html = `<li><a href="mis-solicitudes.html?user=${id_usuario}">Mis Solicitudes</a></li>
                <li><a href="index.html?user=${id_usuario}">Buscar Libros</a></li>      
                <li><a href="login.html">Cerrar Sesion</a></li>`;
    ul.innerHTML = html; 
    nav.append(ul);

    const api_aplaplac = 'http://localhost:3000';
    const url = `${api_aplaplac}/user/${id_usuario}`;

    fetch(url).then(res =>{
        res.json().then(data=>{
            const nombre = data['data'][0]['NOMBRE'];
            const apellido_p = data['data'][0]['APELLIDO_PATERNO'];
            const apellido_m = data['data'][0]['APELLIDO_MATERNO'];

            let p= document.querySelector('.nombre-user')
            p.textContent = `${nombre} ${apellido_p} ${apellido_m}`;
        });
    });
}
 
function solicitarLibro(id_usuario){
    let libros = document.querySelectorAll(".icon-box");
    let url = `http://localhost:3000/book_request/valid/${id_usuario}`

    for (let i = 0; i < libros.length; i++) {

        libros[i].addEventListener('click', (e)=>{
            fetch(url).then(res =>{
                res.json().then(data=>{

                    console.log("VALIDACION USUARIO");
                    console.log(data);
                    
                    if(data['usuario_validado']){
                        
                        let id_libro = e.target.id;
                        let body_request = {"id_libro":id_libro, "id_usuario":id_usuario}
                        let url_post = `http://localhost:3000/book_request`
                        let args = {method: 'POST', body: JSON.stringify(body_request), 
                                headers:{'Content-Type': 'application/json'}}
                        
                        fetch(url_post,args).then(res =>{
                            res.json().then(data=>{
                                
                                if(data['success']){
                                    Swal.fire({
                                        title: 'Perfecto!',
                                        text: "Has solicitado tu libro con exito",
                                        icon: 'success',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'ir a mis solicitudes',
                                        cancelButtonText: 'cancelar'
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          window.location.href = `http://127.0.0.1:5500/mis-solicitudes.html?user=${id_usuario}`
                                        }
                                      })
                                }
                             
                            });
                        });
                    }
                    else{
                        console.log("ERROR AL VALIDAR");
                        console.log(data['msg']);
                        if(data['msg'] == 'falta registro biblioteca'){
                            Swal.fire({
                                title: 'Ups!',
                                text: "Aun no estas registrado en la biblioteca aplaplac",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'registrarme',
                                cancelButtonText: 'cancelar'
                                }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.href = `http://127.0.0.1:5500/registro.html?user=${id_usuario}`
                                }
                                })
                        }

                        if(data['msg'] == 'falta matricula'){
                            Swal.fire(
                                'No fue posible realizar su solicitud',
                                'Nuestro sistema indica que usted no esta matriculado para el periodo academico actual, regularice su pago y vuelva a intentarlo',
                                'warning'
                            )
                        }

                    }
                });
            });
            
        });
        
    }
    

}





