import React, { useEffect, useState } from 'react'
import "./locker-creation.css"
import { useNavigate } from 'react-router-dom'

const LockerCreation = () => {

    const navigate = useNavigate();

    const rend1 = parseInt(localStorage.getItem("rows") || "0", 10);
    const rend2 = parseInt(localStorage.getItem("columns") || "0", 10);
    
    useEffect(() => {
        if (rend1 > 0 && rend2 > 0) {
            navigate("/grids");
        }
    }, [rend1, rend2, navigate]);

    const [rows, setRows]=useState("")
    const [columns, setColumns]=useState("")

    const handleSubmit=(e)=>{
        e.preventDefault()
        localStorage.setItem("rows", rows)
        localStorage.setItem("columns", columns)
        navigate("/grids")
    }

  return (
    <div className='landing'>
        <div className='creation'>
            <form onSubmit={handleSubmit}>
                <h2>create your locker</h2>
                <input type='text' required placeholder='Number of rows' onChange={e=>setRows(e.target.value)} id='rows' name='rows' value={rows} />
                <input type='text' required placeholder='Number of columns' onChange={e=>setColumns(e.target.value)} id='columns' name='columns' value={columns} />
                <button type='submit'>Create Locker</button>
            </form>
        </div>
    </div>
  )
}

export default LockerCreation