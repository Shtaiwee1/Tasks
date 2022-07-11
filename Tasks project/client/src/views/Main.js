import Form from '../components/Form'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TaskList from '../components/TaskList';
import { padding } from '@mui/system';
import {Button} from "@mui/material";
import { Link } from "react-router-dom";

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState([]); 
    const [loaded, setLoaded] = useState(false);
  useEffect(()=>{
    axios.get('http://localhost:8000/api/task')
        .then(res=>{
          setTasks(res.data);
            setLoaded(true);
        })
        .catch(err => console.error(err));
},[]);
const removeFromDom = taskId => {
  setTasks(tasks.filter(task => task._id != taskId));
}
const createTask = task => {

    console.log(task)
    axios.post('http://localhost:8000/api/task', task)
        .then(res=>{setTasks([...tasks,res.data]);console.log(res.data)})
        .catch(err=>{
          const errorResponse = err.response.data.errors; // Get the errors from err.response.data
          const errorArr = []; // Define a temp error array to push the messages in
          for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
              errorArr.push(errorResponse[key].message)//object.keys() is a built in function to convert an object to an iterable array resources:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
              //method returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would.
          }
          // Set Errors
          setErrors(errorArr);
      })       
}

const update = (id,stat)=>{
  axios.put('http://localhost:8000/api/task/'+id,{status:stat})
        .then(res=>{
          const objIndex = tasks.findIndex(obj=>obj._id === id)
          const tasks1=[...tasks.slice(0,objIndex),{...tasks[objIndex],"status":stat},...tasks.slice(objIndex+1)]
          console.log(tasks1)
          setTasks(tasks1)
        })
        .catch(err => console.error(err));
}
var newTask=[]
var inprogressTask=[]
var doneTask=[]
tasks.map(task=>{
  if(task.status==="todo"){
    newTask.push(task)
  }else if(task.status==="inprogress"){
    inprogressTask.push(task)
  }else{
    doneTask.push(task)
  }
})
        
      
  return (
    <div>
      
      <h1>Project Manager</h1>
      <div  style={{margin:"0 auto", width:"100%" , display:"flex", padding:"10px" , justifyContent:"center" }}>
        <div  style={{margin:"0 auto", width:"30%",border:"solid black 1px" }}>
          <h2 style={{backgroundColor:"#9fc5f8" , margin:"0"}}>Backlog</h2>
      <TaskList tasks={newTask} removeFromDom={removeFromDom} update={update}/>
      </div>
      <div  style={{margin:"0 auto", width:"30%",border:"solid black 1px"  }}>
      <h2 style={{backgroundColor:"#ffe599" , margin:"0"}}>In Progress</h2>
      <div >
      <TaskList tasks={inprogressTask} removeFromDom={removeFromDom} update={update}/>
      </div>
      </div>
      <div  style={{margin:"0 auto", width:"30%" ,border:"solid black 1px" , display:"inline-block" }}>
      <h2 style={{backgroundColor:"#b6d7a8" , margin:"0" }}>Completed</h2>
      <TaskList tasks={doneTask} removeFromDom={removeFromDom} update={update}/>
      </div>
      </div>
      <div><Link style={{ textDecoration: "none", marginRight: "1rem" , backgroundColor:"#9fc5f8",padding:"12px",borderRadius:"12px" ,position:"absolute",bottom:15,left:15 ,color:"black" }} to="/projects/new">+ Add a New Project</Link></div>
    </div>
  )
}

export default Main