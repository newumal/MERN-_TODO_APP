import React from "react";
import {ITodo} from "../../app/models/todoModel";
import {Button, List, Popconfirm, Switch, Tag, Tooltip} from "antd";
import styles from "./todoItem.module.scss"
import {CheckOutlined, CloseOutlined, DeleteOutlined} from "@ant-design/icons";
import moment from 'moment'


interface ITodoItemProps {
    todo: ITodo,
    onTodoRemove: (todo: ITodo) => void
    onTodoToggle: (todo: ITodo) => void
}

const TodoItem: React.FC<ITodoItemProps> = ({ todo, onTodoRemove, onTodoToggle}) => {
  return(
      <List.Item
          actions={[
              <Tooltip
                  title={todo.activeState ? 'Mark as uncompleted' : 'Mark as completed'}
              >
                  <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      onChange={() => onTodoToggle(todo)}
                      defaultChecked={todo.activeState}
                  />
              </Tooltip>,
              <Popconfirm
                  title="You want to delete ?"
                  onConfirm={() => {
                      onTodoRemove(todo)
                  }}
              >
                  <Button
                      className={styles.remove_todo_btn}
                      type="primary"
                      danger
                      icon={<DeleteOutlined/>}
                 />
              </Popconfirm>
          ]}
          className={styles.list_item}
          key={todo?.id}
      >
          <div className={styles.todo_item}>
              <div>
                  <Tag color={todo.activeState ? 'cyan': 'red'} className={styles.todo_tag}>
                      {todo.title}
                  </Tag>
              </div>
              <div>
                  <h4>{moment(todo.endDate).format('MM/DD/YYYY')}</h4>
              </div>
          </div>
      </List.Item>
  )
}

export default TodoItem