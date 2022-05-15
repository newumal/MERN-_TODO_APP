import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ITodo} from "../../app/models/todoModel";
import todoService from "./todoService";

interface ITodoReducerInterface {
    todos: ITodo[],
    status: 'idle' | 'loading' | 'failed'
}

const initialState: ITodoReducerInterface = {
    todos: [],
    status: 'idle',
}

// get all todos
export const getAllAsyncTodos: any= createAsyncThunk('todo/getAllTodos', async () => {
    return await todoService.getAllTodos();
});

// create a todo
export const createAsyncTodo: any = createAsyncThunk('todo/createTodo', async (todo: ITodo, thunkAPI) => {
    try {
        return await todoService.createTodo(todo);
    }catch (error: any) {
        const message = ( error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

// remove a task given by id
export const removeAsyncTodo: any = createAsyncThunk('todo/removeTodo', async (todo: any, thunkAPI) => {
    try {
        return await todoService.removeTask(todo);
    }catch (error: any) {
        const message = ( error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// update task by id
export const updateAsyncTodo: any = createAsyncThunk('todo/updateTodo', async (todo: any, thunkAPI) => {
    try {
        return await todoService.changeToggle(todo);
    }catch (error: any) {
        const message = ( error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});


export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllAsyncTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllAsyncTodos.fulfilled, (state, action) => {
                state.status = 'idle';
                state.todos = action.payload
            })
            .addCase(getAllAsyncTodos.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(createAsyncTodo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createAsyncTodo.fulfilled, (state, action) => {
                state.status = 'idle';
                state.todos = state.todos.concat({
                    ...action.payload,
                })
            })
            .addCase(createAsyncTodo.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(removeAsyncTodo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeAsyncTodo.fulfilled, (state, action) => {
                state.status = 'idle';
                state.todos = state.todos.filter((todo: any) => todo._id !== action.payload._id)

            })
            .addCase(removeAsyncTodo.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(updateAsyncTodo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateAsyncTodo.fulfilled, (state, action) => {
                state.status = 'idle';
                state.todos = state.todos.map((todo: any) =>
                    todo._id === action.payload._id
                    ? { ...todo, activeState: !todo.activeState }
                        : todo
                )
            })
            .addCase(updateAsyncTodo.rejected, (state) => {
                state.status = 'failed';
            })
    }

});

export default todoSlice.reducer;