import {useAddOrganizationMutation} from '@/features';
import {Button, Modal, Form, Input} from 'antd';
import {useState} from 'react';
import style from './style.module.scss';
import {Organization} from '@/types';

export const AddOrg = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [addOrganization] = useAddOrganizationMutation();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (values: Organization) => {
    try {
      await addOrganization(values).unwrap();
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Ошибка при добавлении организации:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type='primary' className={style.btnAdd} onClick={showModal}>
        Добавить Организацию
      </Button>

      <Modal
        title='Добавление организации'
        open={isModalVisible}
        onCancel={handleCancel}
        okText='Отправить'
        cancelText='Отмена'
        onOk={form.submit}>
        <Form name='basic' form={form} onFinish={handleOk} autoComplete='off'>
          <Form.Item
            label='Название'
            name='name'
            rules={[{required: true, message: 'Пожалуйста, введите название!'}]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='Город'
            name='city'
            rules={[{required: true, message: 'Пожалуйста, введите  город!'}]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='Телефон'
            name='phone'
            rules={[{required: true, message: 'Пожалуйста, введите Телефон'}]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='Email'
            name='email'
            rules={[
              {required: true, type: 'email', message: 'Пожалуйста, введите Email'},
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='Описание'
            name='description'
            rules={[{required: true, message: 'Пожалуйста, введите описание'}]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
