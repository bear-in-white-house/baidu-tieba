import { request } from 'umi';
import format from '@/utils/format';

export const getMessageCode = (params: { phone: string }, options?: any) => {
  return request(`/api/account/getMessageCode`, {
    params: format(params, 'toLine'),
    options,
  });
};

export const login = async (params: API.LoginRequest, options?: any) => {
  const data = await request(`/api/account/login/`, {
    method: 'post',
    data: format(params, 'toLine'),
    options,
  });
  data.data = format(data.data, 'toHump');
  return data;
};

export const register = async (params: API.LoginRequest, options?: any) => {
  const data = await request(`/api/account/register/`, {
    method: 'post',
    data: format(params, 'toLine'),
    options,
  });
  data.data = format(data.data, 'toHump');
  return data;
};

export const getUserInfo = async (params = {}, options?: any) => {
  const data = await request(`/api/account/userInfo/`, {
    params,
    options,
  });
  data.data = format(data.data, 'toHump');
  return data;
};
