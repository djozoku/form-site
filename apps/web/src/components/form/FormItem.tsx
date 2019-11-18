import React from 'react';
import { Form } from 'antd';

interface FormItemProps {
  validateStatus?: '' | 'error' | 'success' | 'warning' | 'validating';
  help?: string;
}

const FormItem: React.FC<FormItemProps> = ({ validateStatus, children, help }) => {
  return (
    <Form.Item help={help} validateStatus={validateStatus} style={{ marginBottom: 20 }}>
      {children}
    </Form.Item>
  );
};

export default FormItem;
