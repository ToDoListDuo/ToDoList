import { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { getData, deleteItem, createItem, updateItem} from './hooks/index';
import { UilTrashAlt } from '@iconscout/react-unicons';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const newItem = async(e) => {
      const newItem = {
        data : e.target.value,
        finalizada : 0,
      }

      document.getElementsByClassName('input_item')[0].value = '';
      await createItem(newItem);
      await getItems();
  }

  const activeTask = async(item) => {
    const newData = data.filter((task) => task.id == item.id );
    newData[0].finalizada == 0 ? newData[0].finalizada = 1 : newData[0].finalizada = 0
    
    await updateItem(newData[0])
    try{
      await getItems();
    }
    catch(err) {
      console.log('erro na requisição', err)
    }
  }

  const getItems = async() => {
    const items = await getData();
    setData(items.data);
  }

  const deleteTask = async(item) => {
      await deleteItem(item)
      try{
        getItems()
      }
      catch{

      }
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
          {data.map((item) => {
            return (
              <div className="todo_item" id={item.finalizada ? 'finalizada' : ''} key={item.id}>
                <input type="checkbox" checked={item.finalizada} onChange={() => activeTask(item)} />
                {item.data}
                <Button onClick={() => deleteTask(item.id)} className="buttonDelete">
                  <UilTrashAlt size="20"/>
                </Button>
              </div>
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
