import { useState, useEffect } from 'react';
import { getData, createItem } from './hooks/index';
import TodoComponent from './TodoComponent';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const getItems = async() => {
    const items = await getData();
    setData(items.data);
  }

  const newItem = async(e) => {
    const newItem = {
    data : e.target.value,
    finalizada : 0,
    };

    document.getElementsByClassName('input_item')[0].value = '';
    await createItem(newItem);
    await getItems();
}

  useEffect(()=>{
    getItems();
  },[])
  return (
    data ?
    <>
    <div class="todo">

        <div class="todo_title">
          Todo List
        </div>

        <div class="todo list">
          {data.map((item, key) => {
            return (
              <TodoComponent data={data} getItems={getItems} item={item}/>
            );
          })}
        </div>

        <div class="todo_new-item">
          <input type="text" class="input_item" onBlur={(e) => newItem(e)} placeholder="Digite e pressione enter para adicionar a tarefa" />
        </div>
      </div>
    </>: null
    
  );
}

export default App;
