import axios from "axios";
import {ITodo} from "../../app/models/todoModel";

const API_URL = 'api/tasks';

// get all tasks form db - backend api call
const getAllTodos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

// create a todo task - backend api call
const createTodo = async (todo: ITodo) => {
    const response = await axios.post(API_URL, todo);
    return response.data;
}

// remove a todo task by given id
const removeTask = async (todo: any) => {
    const todoId = todo._id;
    const response = await axios.delete(`${API_URL}/${todoId}`);
   return response.data;
}

// change active state of the todo task
const changeToggle = async (todo: any) => {
    const todoId = todo._id;
    const response = await axios.put(`${API_URL}/${todoId}`, todo);
    return response.data;
}

const todoService = {
    getAllTodos,
    createTodo,
    removeTask,
    changeToggle
};

export default todoService;