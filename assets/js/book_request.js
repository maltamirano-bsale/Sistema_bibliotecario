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

    navbar(id_usuario)

    getBookRequestCount(api_aplaplac, 'book_request/count', parseInt(id_usuario))
    getBookRequest(api_aplaplac, 'book_request', parseInt(id_usuario));

})


function getBookRequest(host, endpoint, id_usuario){
    try {
        url = `${host}/${endpoint}/${id_usuario}`;

        fetch(url).then(res =>{
            res.json().then(data=>{
                showBookRequest(data['data']);
            });
        });

    } catch (error) {
    alert("Ha ocurrido un error al cargar los productos : ", error);
    }
}

function getBookRequestCount(host, endpoint, id_usuario){
    try {
        url = `${host}/${endpoint}/${id_usuario}`;

        fetch(url).then(res =>{
            res.json().then(data=>{
               
                let send_data = 0

                if(data['count'] > 0){
                    send_data = data['data']
                }

                showBookRequestCount(send_data);
            });
        });

    } catch (error) {
    alert("Ha ocurrido un error al cargar los productos : ", error);
    }
}

function showBookRequest(data){
    try {
        if(data.length > 0){
            for (let i=0; i < data.length; i++) {

                let cont_book_request = document.querySelector('.cont-mis-soli')
                let book_request = document.createElement('div');
                let html = '';

                //Guardar la información del data set json en variables
                const nombre_libro = data[i]['NOMBRE_LIBRO'];
                const estado = data[i]['DESCRIPCION'];
                const img = data[i]['IMAGEN'];
                const fecha_solicitud = data[i]['FECHA_DE_SOLICITUD'].substring(-1, 10)
                let fecha_entrega;
                let fecha_devolucion;
    
                if(data[i]['FECHA_DE_ENTREGA'] != null){
                    fecha_entrega = data[i]['FECHA_DE_ENTREGA'].substring(-1, 10)
                }
                else{
                    fecha_entrega = 0
                }
                    
                
                if(data[i]['FECHA_DE_DEVOLUCION'] != null){
                    fecha_devolucion = data[i]['FECHA_DE_DEVOLUCION'].substring(-1, 10)
                }
                else{
                    fecha_devolucion = 0
                }
                    
      
                html += `<div class="row cont-lib-soli">
                            <div class="img-libro-cat">
                                <img class="w-100" src="${img}" alt="">
                            </div>
    
                            <div class="col-8">
                            <hr>
                            <p>${nombre_libro}</p>
                            <hr>`
                          
                switch (estado) {
                    case 'Solicitud Pendiente':
                    html += `
                        <div class="display-flex estado-libro mb-2">
                            <i class="color-estado2 fas fa-book icon-libro "></i>
                            <p>${estado}</p>
                        </div>`
                    break;
    
                    case 'Recibido':
                    html += `
                        <div class="display-flex estado-libro mb-2">
                            <i class="color-estado1 fas fa-book icon-libro "></i>
                            <p>${estado}</p>
                        </div>`
                    break;
    
                    case 'Devuelto':
                    html += `
                        <div class="display-flex estado-libro mb-2">
                            <i class="color-estado3 fas fa-book icon-libro "></i>
                            <p>${estado}</p>
                        </div>`
                    break;
    
                    case 'Fuera de Plazo':
                    html += `
                        <div class="display-flex estado-libro mb-2">
                            <i class="color-estado4 fas fa-book icon-libro "></i>
                            <p>${estado}</p>
                        </div>`
                    break;
                }
    
                html += `<p class="description font-weight-bold m-0">Fecha de solicitud: <span class="font-weight-normal">${fecha_solicitud}</span></p>
                        <p class="description font-weight-bold m-0">Fecha de entrega: <span class="font-weight-normal">${fecha_entrega}</span></p>
                        <p class="description font-weight-bold m-0">Fecha de devolucion: <span class="font-weight-normal">${fecha_devolucion}</span></p>
                                
                        </div>
                    </div>`;
                   
                book_request.innerHTML = html; 
                cont_book_request.append(book_request);
               
            }
        }
        else{
            let cont_book_request = document.querySelector('.cont-no-soli')
            let message = document.createElement('div');
            let html = `<p class="no-soli text-center">aun no tienes solicitudes de libros</p>
            <i class="icon-no-soli fas fa-book-open"></i>`;

            message.innerHTML = html; 
            cont_book_request.append(message);

        }
        
    } catch (error) {
        alert("Ha ocurrido un error al cargar los productos : ", error);
    }
}

function showBookRequestCount(data){
    try {

        let cont_book_request = document.querySelector('#count-container')
        let book_request_count = document.createElement('div');
        let html = '';
        
        let count1 = 0
        let count2 = 0
        let count3 = 0
        let count4 = 0

        for (let i = 0; i < data.length; i++) {

            if(data[i]['ESTADO'] == 'Solicitud Pendiente'){
                count1 = data[i]['CANTIDAD'];
            }
        
            else if(data[i]['ESTADO'] == 'Recibido'){
                count2 = data[i]['CANTIDAD'];
            }
        
            else if(data[i]['ESTADO'] == 'Devuelto'){
                count3 = data[i]['CANTIDAD'];
            }
              
            else if(data[i]['ESTADO'] == 'Fuera de Plazo'){
                count4 = data[i]['CANTIDAD'];
            }
            
        }
       
        html += `
            <div class="row counters">
                <div class="col-lg-3 col-6 text-center cont-counter hover-cont-counter1">
                    <i class="h1 fas fa-book icon-libro color-estado2"></i>
                    <p class="m-0">Solicitudes Pendientes</p>
                    <span data-toggle="counter-up">${count1}</span>      
                </div>

                <div class="col-lg-3 col-6 text-center cont-counter hover-cont-counter2">
                    <i class="h1 fas fa-book icon-libro color-estado1"></i>
                    <p class="m-0">Libros Recibidos</p>
                    <span data-toggle="counter-up">${count2}</span>       
                </div>

                <div class="col-lg-3 col-6 text-center cont-counter hover-cont-counter3">
                    <i class="h1 fas fa-book icon-libro color-estado3"></i>
                    <p class="m-0">Libros Devueltos</p>
                    <span data-toggle="counter-up">${count3}</span>           
                </div>

                <div class="col-lg-3 col-6 text-center cont-counter hover-cont-counter4">
                    <i class="h1 fas fa-book icon-libro color-estado4"></i>
                    <p class="m-0">Libros Fuera de Plazo</p>
                    <span data-toggle="counter-up">${count4}</span>     
                </div>
            </div>`;
                    
        book_request_count.innerHTML = html; 
        cont_book_request.append(book_request_count);
           
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
 



