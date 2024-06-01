import React, { useState } from 'react'

function TodoInput(props) {
    const [inputText,setInputText] = useState("")

    function handleChange(e){
     setInputText(e.target.value);
    }
    const handleClick=()=>{
        props.addList(inputText)
        setInputText("")
    }
  return (
    <div className="input-container">
        <input type="text"
         placeholder='Enter Your Todo'
         className="input-box-todo"
         value={inputText}
         onChange={handleChange} />
        <button className="add-btn" 
        onClick={handleClick}>+</button>
    </div>
  )
}

export default TodoInput
