import React from 'react'

function TodoList(props) {
  const Delete = () => {
    props.deleteItem(props.index);
  }

  const ToggleCompletion = () => {
    props.toggleCompletion(props.index);
  }

  return (
    <li className={`list-item ${props.item.completed ? 'completed' : ''}`}>
      {props.item.text}
      <span className='icons'>
        <i className={`fa ${props.item.completed ? 'fa-times-circle' : 'fa-check-circle'}`} onClick={ToggleCompletion}></i>
        <i className="fa-solid fa-trash-can icon-delete" onClick={Delete}></i>
      </span>
    </li>
  )
}

export default TodoList;
