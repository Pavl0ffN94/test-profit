// import {useAddOrganizationMutation} from '@/features';
import {Button, Modal, Form, Input} from 'antd';
import {useState} from 'react';

export const AddOrg = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Логика для обработки отправки формы
    console.log('Form submitted');
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type='primary' onClick={showModal}>
        Добавить Организацию
      </Button>
      <Modal
        title='Добавление организации'
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Отправить'
        cancelText='Отмена'>
        <Form
          name='basic'
          initialValues={{remember: true}}
          onFinish={handleOk}
          autoComplete='off'>
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
