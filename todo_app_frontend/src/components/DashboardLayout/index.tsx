import React, {useCallback, useEffect, useState} from "react";
import styles from "./dashboardLayout.module.scss";
import {Avatar, Breadcrumb, Image, Layout, Menu, Typography} from "antd";
import {
    LoginOutlined,
    SelectOutlined,
    UserOutlined
} from "@ant-design/icons";
import {ITodo} from "../../app/models/todoModel";
import TodoForm from "../TodoForm";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import TodoList from "../TodoList";
import {createAsyncTodo, getAllAsyncTodos, removeAsyncTodo, updateAsyncTodo} from "../../features/todo/todoSlice";
import {useNavigate} from "react-router-dom";

const { Header, Sider, Content, Footer } = Layout;
const { Title }= Typography

interface IDashboardLayoutProps {}

const headItems = [
    {
        key: 'profile',
        icon: <Avatar style={{ backgroundColor: "#3ea0f1", marginLeft: "10px"}} icon={<UserOutlined />} />,
        children: [
            {
                key: 'setting:1',
                label: 'Logout',
                icon: <LoginOutlined />,
                danger: true
            }
        ]
    }
]

const getItem = (label: string, key: string, icon: any) => {
    return {
        key,
        icon,
        label
    };
}


const items = [
    getItem('Tasks', '1', <SelectOutlined />),
    getItem('User', 'sub1', <UserOutlined />),
];

const DashboardLayout: React.FC<IDashboardLayoutProps> = () => {
    const [collapsed, setCollapsed] = useState(false);
    const todos: ITodo[] = useSelector((state: RootState) => state.todo.todos);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllAsyncTodos());
    }, [])

    const onCollapse = () => {
      setCollapsed(!collapsed)
    };

    const onHandleTodoRemove = useCallback((selectedTodo: any) => {
      console.log('remove todo' , selectedTodo);
      dispatch(removeAsyncTodo(selectedTodo));
    },[]);

    const onHandleTodoToggle = (selectedTodo: any) => {
        // const { _id, title, activeStat, endDate } = selectedTodo;
        // console.log('change toggle' , selectedTodo);
        // const newTodo = {
        //     _id, title, activeStat: !activeStat, endDate
        // };
        dispatch(updateAsyncTodo(selectedTodo));

    };

    const onHandleFormSubmit = (todo: ITodo) => {
      console.log('form value', todo);
      dispatch(createAsyncTodo(todo));
    };

    return(
      <div className="App">
          <Layout
              style={{
                  minHeight: '100vh'
              }}
          >
              <Header style={{ display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                  <div style={{ display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                      <Image
                          style={{ borderRadius: "2px"}}
                          width={40}
                          preview={false}
                          src="favicon.png"
                      />
                      <Title level={5} style={{ color: "white", marginLeft: "20px"}}>Task Management System</Title>
                  </div>
                  <div>
                      <Menu theme="dark" selectedKeys={[]} mode="horizontal" items={headItems}/>
                  </div>
              </Header>
              <Layout>
                  <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} theme="light">
                      <Menu theme={"light"} defaultSelectedKeys={['1']} mode="inline" items={items}/>
                  </Sider>
                  <Layout>
                      <Layout>
                          <Content style={{ padding: '10px 30px'}}>
                              <Breadcrumb>
                                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                                  <Breadcrumb.Item>Tasks</Breadcrumb.Item>
                              </Breadcrumb>
                              <div className={styles.layout_content}>
                                  <TodoForm onFormSubmit={(val) => onHandleFormSubmit(val)}/>
                                  <TodoList
                                      todos={todos}
                                      onTodoRemove={(val) =>  onHandleTodoRemove(val)}
                                      onTodoToggle={(val) =>  onHandleTodoToggle(val)}
                                  />
                              </div>
                          </Content>
                          <Footer style={{ textAlign: 'center'}}>TMS  ©2022 Created by Newumal Weerasinghe </Footer>
                      </Layout>
                  </Layout>
              </Layout>
          </Layout>

      </div>
  )
}

export default DashboardLayout