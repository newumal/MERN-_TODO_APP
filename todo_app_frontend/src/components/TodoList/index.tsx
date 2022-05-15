import React from "react";
import {ITodo} from "../../app/models/todoModel";
import {List} from "antd";
import TodoItem from "../TodoItem";
import {useAppDispatch} from "../../app/hooks";

interface ITodoListProps {
    todos: ITodo[],
    onTodoRemove: (todo: ITodo) => void,
    onTodoToggle: (todo: ITodo) => void,
}

const TodoList: React.FC<ITodoListProps> = ({ todos, onTodoToggle, onTodoRemove}) => {
  return(
      <List
          locale={{
              emptyText: "There's nothing any Task assigned :(",
          }}
          dataSource={todos}
          renderItem={(todo) => (
              <TodoItem
                  todo={todo}
                  onTodoRemove={onTodoRemove}
                  onTodoToggle={onTodoToggle}
              />
          )}
          pagination={{
              position: 'bottom',
              pageSize: 10
          }}
      />
  )
}

export default TodoList