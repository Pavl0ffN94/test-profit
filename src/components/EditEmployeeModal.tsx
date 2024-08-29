import {useEffect} from 'react';
import {Modal, Form, Input, Button} from 'antd';

import {Employee} from '@/types';
import {useUpdateEmployeeMutation} from '@/features';

interface EditEmployeeModalProps {
  visible: boolean;
  onClose: () => void;
  employee: Employee | null;
  organizationId: string;
}

export const EditEmployeeModal = ({
  visible,
  onClose,
  employee,
  organizationId,
}: EditEmployeeModalProps) => {
  const [form] = Form.useForm();
  const [updateEmployee] = useUpdateEmployeeMutation();

  useEffect(() => {
    if (employee) {
      form.setFieldsValue({
        firstName: employee.firstName,
        lastName: employee.lastName,
        position: employee.position,
        email: employee.email,
        phone: employee.phone,
      });
    }
  }, [employee, form]);

  const handleSubmit = async values => {
    try {
      if (employee) {
        await updateEmployee({
          organizationId,
          employeeId: employee.id,
          patch: values,
        }).unwrap();
      }
      onClose();
    } catch (error) {
      console.error('Failed to update employee:', error);
    }
  };

  return (
    <Modal
      title='Редактировать сотрудника'
      open={visible}
      onCancel={onClose}
      footer={null}>
      <Form form={form} layout='vertical' onFinish={handleSubmit}>
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
  );
};
