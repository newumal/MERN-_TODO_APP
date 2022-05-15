import React, {useState} from "react";
import {ITodo} from "../../app/models/todoModel";
import {Button, Col, DatePicker, Form, Input, Row} from "antd";
import {PlusCircleFilled} from "@ant-design/icons";
import styles from "./todoForm.module.scss";

interface IAddTodoFormProps {
    onFormSubmit: (todo: ITodo) =>  void
}
const TodoForm: React.FC<IAddTodoFormProps> = ({ onFormSubmit }) => {
    const [form] = Form.useForm();
    const [endDate, setEndDate] = useState<Date>();

    const onHandleFinish = () => {
      onFormSubmit({
          title: form.getFieldValue('title'),
          activeState: true,
          endDate: endDate ?? new Date()
      });

      form.resetFields();
    };
    
    const onchangeDate = (date: any, dateString: string) => {
        setEndDate(date);
        console.log(date, dateString)
    };

    return(
        <div className={styles.add_todo_form}>
            <Form
                form={form}
                onFinish={onHandleFinish}
                // layout="horizontal"
            >
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={17} lg={19} xl={20}>
                        <div  className={styles.form_content}>
                            <div className={styles.todo_title}>
                                <Form.Item
                                    name={'title'}
                                    rules={[{ required: true, message: 'This filed is required !'}]}
                                >
                                    <Input placeholder="What needs to be done ?"/>
                                </Form.Item>
                            </div>
                            <div className={styles.todo_endDate}>
                                <Form.Item>
                                    <DatePicker
                                        name={'endDate'}

                                        placeholder=" End Date"
                                        onChange={onchangeDate}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={7} lg={5} xl={4}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                        >
                            <PlusCircleFilled />
                            Add Todo
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default TodoForm
