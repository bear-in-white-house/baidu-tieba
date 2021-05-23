import { atom } from 'recoil';

export const userInfoAtom = atom<API.UserInfo>({
  key: 'userInfo',
  default: {},
});
