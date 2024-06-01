import React, { useEffect, useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList';
import "./App.css"

function App() {
  const getLocalItems = () => {
    let list = localStorage.getItem('TodoList');
    if (list) {
      list = JSON.parse(list);
      return list.map(item => typeof item === 'string' ? { text: item, completed: false } : item);
    } else {
      return [];
    }
  };

  const [ListTodo, setListTodo] = useState(getLocalItems());
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');

  const addList = (inputText) => {
    if(inputText !== "") {
      setListTodo([...ListTodo, { text: inputText, completed: false }]);
    }
  }

  const deleteListItem = (key) => {
    let newListTodo = [...ListTodo];
    newListTodo.splice(key, 1);
    setListTodo([...newListTodo]);
  }

  const toggleCompletion = (index) => {
    let newListTodo = [...ListTodo];
    newListTodo[index].completed = !newListTodo[index].completed;
    setListTodo([...newListTodo]);
  }

  const filteredList = ListTodo.filter(item => {
    if (filter === 'completed') return item.completed;
    if (filter === 'not_completed') return !item.completed;
    return true;
  });

  const sortedList = [...filteredList].sort((a, b) => {
    if (sort === 'asc') return a.text.localeCompare(b.text);
    if (sort === 'desc') return b.text.localeCompare(a.text);
    return 0;
  });

  useEffect(() => {
    localStorage.setItem('TodoList', JSON.stringify(ListTodo));
  }, [ListTodo]);

  return (
    <div className="main-container">
      <div className="center-container">
        <TodoInput addList={addList} />
        <h1 className="app-heading">TODO</h1>
        <div className="controls">
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="not_completed">Not Completed</option>
          </select>
          <select onChange={(e) => setSort(e.target.value)} value={sort}>
            <option value="default">Default</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <hr />
        {sortedList.map((listItem, i) => (
          <TodoList
            key={i}
            index={i}
            item={listItem}
            deleteItem={deleteListItem}
            toggleCompletion={toggleCompletion}
          />
        ))}
      </div>
    </div>
  )
}

export default App;
