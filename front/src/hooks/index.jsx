import axios from 'axios';

export const getData = async() => {
    const data = await axios.get('https://localhost:44379/api/item/findall');
    return data;
}

export const deleteItem = (id) =>{
    axios.delete(`https://localhost:44379/api/item/delete/${id}`);
    window.location.reload();
}

export const createItem = (item) => {
    axios.post(`https://localhost:44379/api/item/create`, item);
    window.location.reload();
}