/*Req N°6 - El código incluye al menos 3 tareas iniciales en el arreglo*/
const tasks = [
    {
      id: "1234",
      task: "Tarea inicial N°1",
      state: 0
    },
    {
        id: "5678",
        task: "Tarea inicial N°2",
        state: 0
      },
    {
        id: "9012",
        task: "Tarea inicial N°3",
        state: 0
      }
];
/* referenciando elementos del DOM*/
const idTaskList = document.getElementById("idTaskList");
const taskList = document.getElementById("taskList");
const done = document.getElementById("done");
const erase = document.getElementById("delete");
const taskInput = document.querySelector("#newTask");
const btnAdd = document.querySelector("#addTask");
const btnErase = document.querySelector("#eraseTask");
const doneVar = document.getElementById("doneVar");
const totalVar = document.getElementById("totalVar");

/************************************************************************************************
*  Función que recorre el arreglo "tasks" evaluando si el atributo task.state (estado)          *
*  es igual a 1 (true).                                                                         *
*      Si es igual a 1, da formato "text-decoration: line-through" a la propiedad tasks.task,   *
*      que corresponde a una tarea ya en estado "realizado"                                     *
*  si no                                                                                        *
*      imrpime el valor de la propiedad tasks.task sin formato (tarea en estado "NO realizado") *
*                                                                                               *
*  Retorna un arreglo de objetos con el html listo para ser renderizado en el D.O.M.            *
*************************************************************************************************/
templateTasks = () => {    
    let htmlId = "";
    let htmlTask = "";
    let htmlDone = "";
    let htmlDelete = "";
    let countItem = 0;
    let counterItemDone = 0;
    const renderList = [];
    tasks.forEach(task => {
       if (task.state == 1) {
            htmlId     += `<li>${task.id}</li>`;
            htmlTask   += `<li style="text-decoration: line-through;">${task.task}</li>`;
            htmlDone   += `<li><input type="checkbox" id="stateTask" onChange="getDoneTask(${task.id})"></li>`;
            htmlDelete += `<li><button id="eraseTask" onClick="deleteTask(${task.id})"; style ="color: red;"><strong>X</strong></button></li>`;
            /*Req N°5 - Contar el total de tareas reaizadas - Se eligió esta forma sin filtrar y luego contar, para aprovechar la iteración forEach*/
            counterItemDone += 1;  
        } else {      
            htmlTask += `<li>${task.task}</li>`;
            htmlId += `<li>${task.id}</li>`;
            htmlDone += `<li><input type="checkbox" id="stateTask" onChange="getDoneTask(${task.id});"></li>`;
            htmlDelete += `<li><button id="eraseTask" onClick="deleteTask(${task.id})"; style ="color: red;"><strong>X</strong></button></li>`;  
        }
        /*Req N°3 - Contar el total de tareas*/
        countItem  += 1;
    });
    taskInput.value = "";
    renderList.push({id: htmlId, task:htmlTask, state:htmlDone, deleteBtn:htmlDelete, counterItem:countItem, counterItemDone: counterItemDone});
    return renderList;
};

/************************************************************************************************
*  Función que recorre el arreglo recibido en variable "html", realizando render en el D.O.M.   *
*                                                                                               *
*  Retorna undefined                                                                            *
*************************************************************************************************/
renderTasks = () => {
    const html = templateTasks();
    html.forEach(template => {
        idTaskList.innerHTML = template.id;
        taskList.innerHTML = template.task;
        done.innerHTML = template.state;
        erase.innerHTML = template.deleteBtn;
        totalVar.innerHTML = template.counterItem;
        doneVar.innerHTML = template.counterItemDone;
    });
    taskInput.value = "";
};

/*******************************************************************************************************
*  Función anónima que incorpora nueva tarea al arreglo tasks con todos los campos asociados           *
*  validando que el evento click del boton, no permita incorporar tareas si el input es vacío          *
*  Si input es != vacio                                                                                *
*       agrega tarea y devuelve llamado a función de renderización para actualizar valores del D.O.M.  *
*  Si no                                                                                               *
*       despliega mensaje y sale de la función sin renderización ni actualización de valores del D.O.M.*
********************************************************************************************************/
btnAdd.addEventListener("click", () => {
    if (newTask.value != ""){
        let id = Date.now();
        id = id.toString();
        id = id.substr(9,4);
        /*Req N°1 - Se agrega tarea al arreglo*/
        tasks.push({ id: id, task: newTask.value, state: 0});
        return renderTasks();
    } else {
        alert("Agregue una tarea a la lista");
        return false;
    }
});

/**************************************************************************************************
*  Función que elimina una tarea del arreglo tasks eliminando todo el registro asociado basandose *
*  en el indice (index) al recorrer el arreglo de objetos.                                        *
*                                                                                                 *
*  Si el valor del ID de tarea (task.id) es igual al ID recibido en el parámetro ID, entonces     *
*       la variable "index" recibe de la f(x) findIndex, el valor de posición de task.id en el    *
*       arreglo y la utiliza para ubicar esa propiedad en esa posición del objeto, para luego     *
*       eliminarla con splice.                                                                    *
*                                                                                                 *
*  Retorna llamado a la función de renderización para actualizar valores del D.O.M.               *                                                 *
***************************************************************************************************/
deleteTask = (id) => {
    const index = tasks.findIndex((task) => task.id == id);
    /*Req N°2 - Borrar tarea al hacer click en botón que acompaña a la tarea*/
    tasks.splice(index,1);
    return renderTasks();
};

/**************************************************************************************************
*  Función que actualiza valor de atributo task.state (estado) a 1 en una tarea del arreglo tasks *
*                                                                                                 *
*  Si el valor del ID de tarea (task.id) es igual al ID recibido en el parámetro ID, entonces     *
*       la variable "index" recibe de la f(x) findIndex, el valor de posición de task.id en el    *
*       arreglo y la utiliza para ubicar esa propiedad en esa posición del objeto, para luego     *
*       cambiar su valor a 1 en esta posición. Luego retorna llamado a la función de              *
*       renderización para actualizar valores del D.O.M.                                          *
*  Si no                                                                                          *
*       despliega mensaje y sale de la función sin renderización ni actualización de valores      *
*       del D.O.M.                                                                                *
***************************************************************************************************/
/*Req N°4 - Marcar una tarea como completada al hacer click en un botón*/
getDoneTask = (id) => {
    const index = tasks.findIndex((task) => (task.id == id));
    if (tasks[index].state !=1) {
        tasks[index].state = 1;
        return renderTasks();
    } else {
        alert("No puede volver a marcar la tarea");
        return renderTasks();
    } 
};
renderTasks();