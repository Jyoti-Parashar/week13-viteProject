
import {task} from  './apiModal'


  //Get all todo from server
  export const getTasks = async(endpoinUrl: string, tasks:task[], renderTasks: Function): Promise<void> => {
    try {
        console.log(
            "Getting tasks...", endpoinUrl
        );
        

      //Use fetch api for response
      const response = await fetch(endpoinUrl);
      // check the response status
      if (response.status!=200) {
        throw new Error(`Some Error, Status Code:${response.status}`);
      }
      // get the data from jsaon object
      const data = await response.json();
      // console.log(data);
      tasks = data.reverse();  
     
     // render data on the screen
    renderTasks(tasks);
     
    } catch (error) {
       console.log(error);
    }
   };


   
 //add a new todo to the server
export const addTodo = async (text: string, endpoinUrl: string, tasks:task[], renderTasks: Function): Promise<void> => { 
 
       //fetch data from the server using the fetch API
       const response = await fetch(endpoinUrl, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({title: text, completed: false, createdAt: new Date() }),
       });
       //convert the response to JSON
       const data = await response.json(); 
   // console.log("Data after POST:", data);
   
   //After our POST request has completed, get the new data from the api.
   getTasks(endpoinUrl, tasks, renderTasks)
       return data;
     };