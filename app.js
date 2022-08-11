/* El objeto Storage (API de almacenamiento web) nos permite almacenar datos de manera local en el navegador y sin necesidad de realizar alguna conexión a una base de datos. En este artículo te mostraré cómo utilizarlo mediante JavaScript.
localStorage y sessionStorage son propiedades que acceden al objeto Storage y tienen la función de almacenar datos de manera local, 
la diferencia entre éstas dos es que localStorage almacena la información de forma indefinida o hasta que se decida limpiar los datos del navegador y sessionStorage almacena información mientras la pestaña donde se esté utilizando siga abierta, 
una vez cerrada, la información se elimina.
*/

document.getElementById('formTask').addEventListener('submit', guardarTarea);

function guardarTarea(e) {
  let titulo = document.getElementById('title').value; // aqui obtengo el valor del campo title del formulario
  let descripcion = document.getElementById('description').value; // aqui obtengo el valor del campo description del formulario
  console.log(titulo,descripcion)

  let task = { // este objeto json es que que guardara todas las tareas que vayamos ingresando en el formulario y tendra solo dos campos el titulo y la descripcion que son los atributos y dentro de cada atributo tendra el valor o la infromacion correspondiente a su campo que ponemos en el formulario
    title:titulo, 
    description:descripcion
  };

  /* Uso del localStorage: Esta funcion permite alamcenar datos dentro de la memeoria del mismo servidor
    localStorage.setItem('tareas',JSON.stringify(tasks)) // este metodo permite alamcenar datos y usa dos parametros, el primero es el nombre de como vamos a llamar a esos datos y el segundo viene a ser el valor pero es recomensdable cambiar esa informacion que viene en objeto json a string
    localStorage.getItem('tareas') // este metodo permite recuperar los datos alamcenados y usa  un parametro que es el nombre de los datos que quermeos obtener*/


  if(localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTareas();
  document.getElementById('formTask').reset(); // esto es para que se reinicie el formualrio o se resetee cada vez que ejecutamos el metodo submit
  e.preventDefault(); // este metodo sirve para evitar que se vuelva a cargar la pagina y se pierda la infromacion del servidor
}


// Funcion para borrar tareas
function borrarTarea(title) {
  console.log(title)
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].title == title) {
      tasks.splice(i, 1);
    }
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTareas();
}



// Funcion para obtener y mostrar tareas
function getTareas() {

  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
  for(let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let description = tasks[i].description;
    tasksView.innerHTML += `<div class="card mb-3">
        <div class="card-body">
          <p>${title} - ${description}
          <a href="#" onclick="borrarTarea('${title}')" class="btn btn-danger ml-5">Borrar</a>
          </p>
        </div>
      </div>`;
  }
}

getTareas();
