import React, { useState } from 'react'
import { TextField , Button } from "@mui/material"



const Form = (props) => {
    const { initialTitle, initialDate, onSubmitProp } = props;
    const [title, setTitle] = useState(initialTitle);
    const [date, setDate] = useState(initialDate);
    const handleSubmit = e => {
        e.preventDefault();
        onSubmitProp({ title, date });
        setTitle("");
        setDate("");
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                 <p style={{fontSize:"20px"}}>Project:</p>
                <TextField id="outlined-basic" label="Project Title" variant="outlined" onChange={e => setTitle(e.target.value)} value={title} /> <br />
                <p style={{fontSize:"20px"}}>Due Date:</p>
                <input type="date" onChange={e => setDate(e.target.value)} value={date}></input><br />
                <Button variant="contained" type="submit" style={{marginTop:"30px"}}>Plan Project</Button>
            </form>
        </div>
    )
}

export default Form