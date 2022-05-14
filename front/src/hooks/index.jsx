import axios from 'axios';

export const getData = async() => {
    const data = await axios.get('https://localhost:44379/api/item/findall');
    return data;
}

export const deleteItem = async(id) =>{
    await axios.delete(`https://localhost:44379/api/item/delete/${id}`);
}

export const createItem = async(item) => {
    await axios.post('https://localhost:44379/api/item/create', item);
}

export const updateItem = async(item) => {
    await axios.put('https://localhost:44379/api/item/update', item);
}