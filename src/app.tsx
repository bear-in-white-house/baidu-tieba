import React from 'react';
import { RecoilRoot } from 'recoil';
import { history } from 'umi';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export async function getInitialState() {
  const user: API.UserInfo = await Promise.resolve({
    userId: 'a',
    userName: 'a',
    avatar: 'a',
    isAdmin: true,
    access: {
      isPlatformAdmin: true,
      isBarSupperAdmin: true,
      isBarViceAdmin: true,
    },
  });
  return {
    currentUser: user,
  };
}

export function onRouteChange({ location }: { location: Location }) {
  console.log(location.pathname);
}

export const layout = ({
  initialState,
}: {
  initialState: { _: any; currentUser?: API.UserInfo };
}) => {
  return {
    hederRender: () => <Header />,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { currentUser } = initialState;
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!currentUser?.userId && location.pathname !== '/user/login') {
        history.push('/user/login');
      }
    },
    menuHeaderRender: undefined,
    // ...initialState?.settings,
  };
};

export function rootContainer(container: any) {
  return React.createElement(RecoilRoot, null, container);
}
