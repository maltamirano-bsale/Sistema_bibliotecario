window.addEventListener('load', () =>{
    const api_aplaplac = 'http://localhost:3000';

    getBookRequest(api_aplaplac)

})

function getBookRequest(host){
    try {
        url = `${host}/book_request`;


        fetch(url).then(res =>{
            res.json().then(data=>{
                if(data['code'] == 200){
                    showBookRequest(data['data']);
                }
                
            });
        });

    } catch (error) {
        alert("Ha ocurrido un error al cargar los productos : ", error);
    }
}


function showBookRequest(data){
    try {
        if(data.length > 0){
            let cont_book_request = document.querySelector('.cont-solicitudes')
            let book_request = document.createElement('div');
            let html = '';

            html = `<table class="table-solicitudes">
                            <thead>
                            <tr>
                                <th>Rut</th>
                                <th>Nombre Usuario</th>
                                <th>Nombre Libro</th>
                                <th>Estado solicitud</th>
                                <th>Cambiar estado</th>
                            </tr>
                            </thead>
                            <tbody>`;
            for (let i=0; i < data.length; i++) {


                //Guardar la información del data set json en variables
                const id = data[i]['ID_SOLICITUD_LIBRO'];
                const rut = data[i]['RUT'];
                const nombre = data[i]['NOMBRE'];
                const apellido = data[i]['APELLIDO_PATERNO'];
                const materno = data[i]['APELLIDO_MATERNO'];
                const nombre_libro = data[i]['NOMBRE_LIBRO'];
                const estado = data[i]['DESCRIPCION'];
                

                html += `<tr>
                            <td>${rut}</td>
                            <td>${nombre} ${apellido} ${materno}</td>
                            <td>${nombre_libro}</td>`;


                if(estado == 'Solicitud Pendiente'){
                    html +=`<td><i class="mr-2 fas fa-book icon-libro color-estado2 "></i>${estado}</td>`
                }

                if(estado == 'Recibido'){
                    html +=`<td><i class="mr-2 fas fa-book icon-libro color-estado1 "></i>${estado}</td>`
                }
                if(estado == 'Devuelto'){
                    html +=`<td><i class="mr-2 fas fa-book icon-libro color-estado3 "></i>${estado}</td>`
                }
                if(estado == 'Fuera de Plazo'){
                    html +=`<td><i class="mr-2 fas fa-book icon-libro color-estado4 "></i>${estado}</td>`
                }
                            

                html +=`<td>
                                <select class="select-soli" id=${id}>
                                    <option value="1">Solicitud Pendiente</option>
                                    <option value="2">Recibido</option>
                                    <option value="3">Devuelto</option>
                                    <option value="4">Fuerza de Plazo</option>
                                </select>
                            </td>
                        </tr>`
    
            }

            html += `     
                        </tbody>
                    </table>`;
                   
            book_request.innerHTML = html; 
            cont_book_request.append(book_request);
        }

        UpdateBookRequest();
    } catch (error) {
        alert("Ha ocurrido un error al cargar los productos : ", error);
    }
}

function UpdateBookRequest(){

    const solicitudes = document.querySelectorAll('.select-soli');
    
    for (let i = 0; i < solicitudes.length; i++) {
        solicitudes[i].addEventListener('change', (e)=>{
            const id_solicitud = e.target.id;
            const estado = solicitudes[i].value;
            let body_request = {"estado_solicitud":estado}
            let url_put = `http://localhost:3000/book_request/${id_solicitud}`
            let args = {method: 'PUT', body: JSON.stringify(body_request), 
                    headers:{'Content-Type': 'application/json'}}

            fetch(url_put,args).then(res =>{
                res.json().then(data=>{
                    
                    if(data['success']){
                        const cont_book_request = document.querySelector('.cont-solicitudes');
                        cont_book_request.removeChild(cont_book_request.firstElementChild);
                        getBookRequest('http://localhost:3000')

                        Swal.fire(
                            'Solicitud Actualizada',
                            '',
                            'success'
                        )
                    }
                    else{
                        Swal.fire(
                            'Ocurrio un error',
                            '',
                            'warning'
                        )
                    }
                 
                });
            });


        });
        
    }
}