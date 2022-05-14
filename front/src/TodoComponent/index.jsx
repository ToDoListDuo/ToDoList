import { Button, Input } from 'reactstrap';
import { useState } from 'react';
import { UilTrashAlt, UilEdit} from '@iconscout/react-unicons';
import { updateItem, deleteItem } from '../hooks'

export default function TodoComponent ({data, getItems, item, key}) {
    const [inputShow, setInputShow] = useState(false);
    const [newData, setNewData] = useState(item.data);

    const activeTask = async() => {
        const newData = data.filter((task) => task.id == item.id );
        newData[0].finalizada == 0 ? newData[0].finalizada = 1 : newData[0].finalizada = 0;
        
        await updateItem(newData[0]);
        try{
            await getItems();
        }
        catch(err) {
            console.log('erro na requisição', err);
        }
    }

    const deleteTask = async() => {
        await deleteItem(item.id);
        try{
        getItems();
        }
        catch{

        }
    };

    const editTask = async() => {
        if(!item.finalizada) setInputShow(prevState => !prevState);

        if(inputShow && newData){
            data.forEach((task)=>{

            if(task.id === item.id){
                item.data = newData;
            }
            })

            await updateItem(item);
        }else{
            setTimeout(()=>{
                document.getElementById(item.id).focus();
            }, 100)
        }
    
    }


    return(
        <div className={item.finalizada ? 'todo_item completeTask' : 'todo_item'} key={key}>
            <input type="checkbox" checked={item.finalizada} onChange={() => activeTask(item)} />
                {inputShow && !item.finalizada ? <Input ID={item.id} value={newData} onChange={(e)=> setNewData(e.target.value)} className="inputEditTask"/> :
                <label>{item.data}</label>
            }
            <label>
                <Button className="actionsButtons" onClick={editTask}>
                    <UilEdit size="20" />
                </Button>
                <Button onClick={() => deleteTask()} className="actionsButtons">
                    <UilTrashAlt size="20"/>
                </Button>
            </label>
        </div>
    )
}