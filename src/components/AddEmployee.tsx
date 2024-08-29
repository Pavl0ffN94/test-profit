import {useAddEmployeeMutation} from '@/features';
import {Button, Form, Input, Modal} from 'antd';
import {useState} from 'react';
import style from './style.module.scss';

export const AddEmployee = ({orgId}: {orgId: string}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [addEmployee] = useAddEmployeeMutation();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async values => {
    try {
      await addEmployee({orgId, employee: values}).unwrap();
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Ошибка при добавлении сотрудника:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type='primary' className={style.btnAdd} onClick={showModal}>
        Добавить Сотрудника
      </Button>

      <Modal
        title='Добавление Сотрудника'
        open={isModalVisible}
        onCancel={handleCancel}
        okText='Отправить'
        cancelText='Отмена'
        onOk={form.submit}>
        <Form name='basic' form={form} onFinish={handleOk} autoComplete='off'>
          <Form.Item
            label='Имя'
            name='firstName'
            rules={[{required: true, message: 'Пожалуйста, введите имя!'}]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='Фамилия'
            name='lastName'
            rules={[{required: true, message: 'Пожалуйста, введите фамилию!'}]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='Должность'
            name='position'
            rules={[{required: true, message: 'Пожалуйста, введите должность!'}]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Пожалуйста, введите корректный email!',
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='Телефон'
            name='phone'
            rules={[{required: true, message: 'Пожалуйста, введите номер телефона!'}]}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
