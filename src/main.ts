import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {addTodo, getTasks} from  './api'
import {task} from  './apiModal'
import {endpoinUrl} from './apiModal'

/**State */

// API URL
//export const endpoinUrl="http://localhost:3000/tasks"
const btnsubmit = document.getElementById("addTodo")! as HTMLButtonElement;
const txtaddtextcontrol=document.getElementById("newTask") as HTMLInputElement;


let tasks:task[] = []

//update to do

//UPdating, requires the id and the data you intend to update.
const updateTodo = async (text: string) => {
  //fetch data from the server using the fetch API
  //example url for a specific task: http://localhost:3000/tasks/9a7e
  const response = await fetch(endpoinUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({  title:text, completed: false, createdAt: new Date() }),
  });

  //convert the response to JSON
  const data = await response.json();
  // console.log({ data });

  //after the update has completed getTasks
  //return the data
  return data;
};


//add event listener to the add todo button

btnsubmit.addEventListener('click',async (event) => {
  console.log("btn submit event:", event);
  
event.preventDefault()
  const text = txtaddtextcontrol.value;
 // console.log(text);

  if (!text) {
    alert("Please enter a todo");
    return;
  }

  //add the todo to the server
  try {
    await addTodo( text, endpoinUrl, tasks, renderTasks);
   
  } catch (error) {
    console.log(error);
  } finally {
    //clear the input field regardless of the outcome
  //  $("#newTask").val("");
  txtaddtextcontrol.value="";
  } 
});


async function renderTasks( tasks:task[]) {
console.log("Rendering tasks....", tasks);



  //get the table element
  const showTable = document.getElementById("showTable") as HTMLTableElement

  // set the table html
  showTable.innerHTML = "";
  for (const task of tasks) {


  //  console.log("loop through tasks",task)
    const row = document.createElement("tr") as HTMLTableRowElement
    row.innerHTML =
      `
        <td>${task.id}</td>
        <td>${task.title}</td>
        <td>${task.completed}</td>
        <td>${task.createdAt}</td>
        <td><button id="btn-Delete" class="btn btn-danger">Delete</button>
        <td><button id="btn-Warning-${task.id}" class="btn btn-warning">Edit</button>
       
    `
    // find delete button with query selector and add event listener to delete the row
    row.querySelector("#btn-Delete")!.addEventListener("click", async () => {
      //const response = 
      await fetch("http://localhost:3000/tasks/" + task.id, { method: "DELETE" });
            
     //const data = await response.json();
     


      //update the state(short term memory)

      const indexTodelete = tasks.indexOf(task);
      tasks.splice(indexTodelete, 1);

      // re-render
   
      renderTasks(tasks);


    })

//add an event listener on click of each unique edit button
row.querySelector(`#btn-Warning-${task.id}`)!.addEventListener("click", async () => {
console.log("Clicking the edit button...", task.id);

//Can run unique functions or code on each edit button specifically
});

    showTable.appendChild(row)
   
    //End of the loop...
  }

}
getTasks(endpoinUrl, tasks, renderTasks);






