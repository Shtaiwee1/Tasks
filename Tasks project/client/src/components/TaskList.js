import React from 'react'
import axios from 'axios';
import {Button} from '@mui/material'
import dateFormat from 'dateformat';

const TaskList = (props) => {
    const deleteTask = id => {
        axios.delete('http://localhost:8000/api/task/' + id)
            .then(res=>{
                props.removeFromDom(id);
                
            })
          
        
    }
  return (
    <div>
        {props.tasks.map((task, index) => 
        <div key={index} style={{border:"1px solid black"  , margin:"5px"}}>
        <p>{task.title} </p>
        Due:<p>{dateFormat(task.date , "dd"+'/'+"mm"+'/'+"yyyy")} </p>
        <Button   onClick={(e)=>task.status === "todo"?props.update(task._id,"inprogress")  :task.status === "inprogress"?props.update(task._id,"done"):deleteTask(task._id)} style={task.status==="todo"?{backgroundColor:"#fde398" , color:"black" , margin:"5px"}:task.status==="inprogress"?{backgroundColor:"#b6d7a8", color:"black" , margin:"5px"}:{backgroundColor:"#ea9999", color:"black" , margin:"5px"}}>
        {task.status === "todo"?"Start Project":task.status === "inprogress"?"move to Completed":"Remove Project"}</Button></div>)}
    </div>
  )
}

export default TaskList