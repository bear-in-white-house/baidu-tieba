import React, { useCallback, useState } from 'react';
import { useModel, useRequest, history, useLocation } from 'umi';
import { message, Divider, Radio, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { MobileOutlined, MailOutlined } from '@ant-design/icons';
import ProForm, { ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
import qs from 'query-string';
import { getMessageCode, login } from '@/services/account';
import styles from './login.less';

const Login: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');
  const [loginType, setLoginType] = useState<'password' | 'code'>('code');
  const onChange = useCallback((e: RadioChangeEvent) => {
    setLoginType(e.target.value);
  }, []);
  const queryCode = useRequest(getMessageCode, {
    manual: true,
  });
  const queryLogin = useRequest(login, {
    manual: true,
    onSuccess: (data) => {
      setInitialState({
        currentUser: (data ?? {}) as API.UserInfo,
      });
    },
  });
  const { search } = useLocation();
  const onFinish = useCallback(
    async (formData: Omit<API.LoginRequest, 'loginType'>) => {
      await queryLogin.run({
        loginType,
        ...formData,
      });
      const searchParams = qs.parse(search);
      if (searchParams.callback) {
        message.success('登录成功, 前往登录前页面');
        history.push(searchParams.callback as string);
      } else {
        message.success('登录成功, 前往用户主页');
        history.push('/user');
      }
      return true;
    },
    [queryLogin, loginType, history, search],
  );
  return (
    <div className={styles.container}>
      <Divider orientation="center" className={styles.text}>
        登录
      </Divider>
      <Radio.Group
        onChange={onChange}
        value={loginType}
        style={{ width: 331, marginBottom: 10 }}
      >
        <Radio.Button value="password" style={{ width: 166 }}>
          密码登录
        </Radio.Button>
        <Radio.Button value="code" style={{ width: 165 }}>
          短信登录
        </Radio.Button>
      </Radio.Group>
      <ProForm
        onFinish={onFinish}
        submitter={{
          searchConfig: {
            submitText: '登录',
          },
          render: () => {
            const arr = [
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ width: '161px' }}
              >
                登录
              </Button>,
              <Button
                size="large"
                style={{ width: '161px' }}
                onClick={() => history.push('/register')}
              >
                注册
              </Button>,
            ];
            return arr;
          },
          submitButtonProps: {
            size: 'large',
            style: {
              width: '100%',
            },
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
        {loginType === 'code' ? (
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
        ) : (
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
        )}
      </ProForm>
    </div>
  );
};

export default Login;
