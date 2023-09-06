import React, { useState } from 'react';

function TodoApp() {
  
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Not Completed');
  const [filter, setFilter] = useState('All');
  const [editing, setEditing] = useState(false); 
  const [editedTodo, setEditedTodo] = useState(null);

  const addTodo = () => {
    if (taskName.trim() === '') {
      alert('Task name cannot be empty');
      return;
    }

    if (editing) {
      // If editing, update the existing todo
      const updatedTodos = todos.map((todo) => {
        if (todo.id === editedTodo.id) {
          return { ...todo, taskName, description, status };
        }
        return todo;
      });

      setTodos(updatedTodos);
      setEditing(false);
      setEditedTodo(null);
    } else {
      const newTodo = {
        id: Date.now(),
        taskName,
        description,
        status,
      };
  
        setTodos([...todos, newTodo]);
      }
        setTaskName('');
        setDescription('');
        setStatus('Not Completed');
    };

    

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateStatus = (id, newStatus) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.status = newStatus;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'All') {
      return true;
    } else if (filter === 'Completed') {
      return todo.status === 'Completed';
    } else {
      return todo.status === 'Not Completed';
    }
  });

  const handleEdit = (todo) => {
    setEditing(true);
    setEditedTodo(todo);
    setTaskName(todo.taskName);
    setDescription(todo.description);
    setStatus(todo.status);
  };


  return (
    <>
      <div className="container mt-5">
        <h3 className=' text-center text-success mb-5'>My todo</h3>
        <form id='reactForm' >
          <div className='form-group text-center'>
          <input value={taskName} onChange={(e) => setTaskName(e.target.value)} type="text" className='mr-3 mb-2' placeholder='Todo Name' required/>
          <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" className='mr-3 mb-2' placeholder='Todo Description' required/>
          <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className='mr-4 mt-md-3 todo-completion'
          >
            <option value="Not Completed">Not Completed</option>
            <option value="Completed">Completed</option>
          </select>
          <button className='btn btn-success pl-5 pr-5 add-todo' type='submit' onClick={addTodo}>
            {editing ? 'Update Todo' : 'Add Todo'}
          </button>
          </div>
        </form>
      </div>   

      
      <div className="container">
        <div className='d-flex justify-content-between'>
          <span className='font-weight-bold'>My Todo's</span>
          <span>
            <label className='font-weight-bold'>Filter :</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className='ml-2'
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
            </select>
          </span>
        </div>
      </div>
        

      <div className='container'>
        <div className="row">
          {filteredTodos.map((todo)=>(
            <div className="col-lg-4 col-md-6 col-sm-12 mb-5" key={todo.id}>
              <div className="card mt-3" id='todo-card'>
             
                <div className="card-body" >

                  <div>
                    <p>Name: {todo.taskName}</p>
                    <p>Description: {todo.description}</p>
                    <div>
                      <p>Status: {todo.status}</p>
                      <button onClick={() => updateStatus(todo.id, 'Completed')} className='btn btn-warning mr-2'>Completed</button>
                      <button onClick={() => updateStatus(todo.id, 'Not Completed')} className='btn btn-warning'>Not Completed</button>
                    </div>
                  </div>

                  <div className='float-right mt-2'>
                    <button className='btn btn-success mr-2' onClick={()=>handleEdit(todo)}>Edit</button>
                    <button className='btn btn-danger' onClick={()=>deleteTodo(todo.id)}>Delete</button>
                  </div>
                  
                </div> 

              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}

export default TodoApp;