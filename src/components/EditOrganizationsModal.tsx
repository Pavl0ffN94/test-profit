import {useEffect} from 'react';
import {Modal, Form, Input, Button} from 'antd';

import {Organization} from '@/types';
import {useUpdateOrganizationMutation} from '@/features';

interface EditOrganizationModalProps {
  visible: boolean;
  onClose: () => void;
  organization: Organization | null;
}

export const EditOrganizationModal = ({
  visible,
  onClose,
  organization,
}: EditOrganizationModalProps) => {
  const [form] = Form.useForm();
  const [updateOrganization] = useUpdateOrganizationMutation();

  useEffect(() => {
    if (organization) {
      form.setFieldsValue({
        name: organization.name,
        city: organization.city,
        phone: organization.phone,
        email: organization.email,
        description: organization.description,
      });
    }
  }, [organization, form]);

  const handleSubmit = async (values: Organization) => {
    try {
      if (organization) {
        const {id, ...restValues} = values;
        await updateOrganization({
          id: id,
          ...restValues,
        }).unwrap();
      }
      onClose();
    } catch (error) {
      console.error('Failed to update organization:', error);
    }
  };

  return (
    <Modal
      title='Редактировать организацию'
      open={visible}
      onCancel={onClose}
      footer={null}>
      <Form form={form} layout='vertical' onFinish={handleSubmit}>
        <Form.Item
          label='Название'
          name='name'
          rules={[{required: true, message: 'Пожалуйста, введите название!'}]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Город'
          name='city'
          rules={[{required: true, message: 'Пожалуйста, введите город!'}]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Телефон'
          name='phone'
          rules={[{required: true, message: 'Пожалуйста, введите номер телефона!'}]}>
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
          label='Описание'
          name='description'
          rules={[{required: true, message: 'Пожалуйста, введите описание!'}]}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
