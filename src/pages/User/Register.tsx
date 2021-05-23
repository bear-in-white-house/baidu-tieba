import React, { useCallback, useState } from 'react';
import { useModel, useRequest, history } from 'umi';
import { message, Divider, Button } from 'antd';
import ProForm, { ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
import { MobileOutlined, MailOutlined } from '@ant-design/icons';
import { getMessageCode, register } from '@/services/account';
import styles from './login.less';

const Register: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');
  const queryCode = useRequest(getMessageCode, {
    manual: true,
  });
  const queryRegister = useRequest(register, {
    manual: true,
    onSuccess: (data) => {
      setInitialState({
        currentUser: (data ?? {}) as API.UserInfo,
      });
    },
  });
  const onFinish = useCallback(
    async (formData: Omit<API.LoginRequest, 'loginType'>) => {
      await queryRegister.run(formData);
      message.success('注册成功, 前往用户主页');
      history.push('/user');
      return true;
    },
    [queryRegister],
  );
  return (
    <div className={styles.container}>
      <Divider orientation="center" className={styles.text}>
        注册
      </Divider>
      <ProForm
        onFinish={onFinish}
        submitter={{
          searchConfig: {
            submitText: '注册',
          },
          render: () => {
            const arr = [
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ width: '161px' }}
              >
                注册
              </Button>,
              <Button
                size="large"
                style={{ width: '161px' }}
                onClick={() => history.push('/login')}
              >
                登录
              </Button>,
            ];
            return arr;
          },
        }}
      >
        <ProFormText
          fieldProps={{
            size: 'large',
            prefix: <MobileOutlined />,
          }}
          name="phone"
          placeholder="请输入手机号"
          rules={[
            {
              required: true,
              message: '请输入手机号!',
            },
            {
              pattern: /^1\d{10}$/,
              message: '不合法的手机号格式!',
            },
          ]}
        />
        <ProFormCaptcha
          fieldProps={{
            size: 'large',
            prefix: <MailOutlined />,
            autoComplete: 'false',
          }}
          captchaProps={{
            size: 'large',
          }}
          phoneName="phone"
          name="code"
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
            {
              pattern: /^\d{4}$/,
              message: '不合法的验证码',
            },
          ]}
          placeholder="请输入验证码"
          onGetCaptcha={async (phone) => {
            await queryCode.run({ phone });
            message.success(`手机号 ${phone} 验证码发送成功!`);
          }}
        />

        <ProFormText.Password
          label=""
          name="password"
          placeholder="请输入密码"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
            {
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/,
              message: '不合法的密码',
            },
          ]}
        />
      </ProForm>
    </div>
  );
};

export default Register;
