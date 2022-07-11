import React, { useState } from 'react'
import Form from './Form'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
import {Button} from '@mui/material'

const NewTask = () => {
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const createTask = task => {
        axios.post('http://localhost:8000/api/task', task)
            .then(res => {
                console.log("Response", res);
                navigate("/");
            })
            .catch(err => {
                const errorResponse = err.response.data.errors; 
                const errorArr = []; 
                for (const key of Object.keys(errorResponse)) { 
                    errorArr.push(errorResponse[key].message)
                }
                
                setErrors(errorArr);
            })
    }
    return (
        <div>
            <h1 style={{margin:"60px"}}>Project Manager</h1>
            <Link to="/" style={{textDecoration:"none" , position:"absolute" , top:30,right:30}}><Button variant="outlined">Back To Dashboard</Button></Link>
            <p style={{marginRight:"200px" , fontSize:"20px"}}>Plan a New Project</p>
            <div style={{ border:"2px solid black", display:"inline-block" , padding:"70px"}}>
                
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <Form onSubmitProp={createTask} initialDate="" initialTitle=""  />
            </div>
        </div>
    )
}

export default NewTask