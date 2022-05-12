import { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { getData, deleteItem, createItem} from './hooks/index';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const newItem = (e) => {
      const newItem = {
        id : Math.floor(Math.random() * 10),
        data : e.target.value,
        finalizada : 0,
      }

      createItem(newItem);
  }

  useEffect(()=>{
    const getItems = async() => {
      const items = await getData();
      setData(items.data);
    }
    getItems();
  }, []);
  return (
    data ?
    <div class="todo">

      <div class="todo_title">
        Todo List
      </div>

      <div class="todo list">
        {data.map((item)=>{
          return (
            <div className="todo_item" id={item.finalizada ? 'finalizada' : ''} key={item.id}>
              <input type="checkbox" checked={item.finalizada}/>
               {item.data}
               <Button onClick={()=> deleteItem(item.id)} className="buttonDelete">X</Button>
            </div>
          )
        })}
      </div>

      <div class="todo_new-item" >
        <input type="text" class="input_item" onBlur={(e)=> newItem(e)} placeholder="Digite e pressione enter para adicionar a tarefa" />
      </div>
    </div> : null
  );
}

export default App;
