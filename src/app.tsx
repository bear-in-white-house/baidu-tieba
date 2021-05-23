import React from 'react';
import { RecoilRoot } from 'recoil';
import { history } from 'umi';
import { getUserInfo } from '@/services/account';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export async function getInitialState() {
  const data = await getUserInfo();
  return {
    currentUser: data.data as API.UserInfo,
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
    // hederRender: () => <Header />,
    footerRender: () => <Footer />,
    hederRender: undefined,
    onPageChange: () => {
      const { currentUser } = initialState ?? {};
      const { location } = history;
      const { pathname, search } = location;
      // 如果没有登录，重定向到 login
      if (!currentUser?.userId && !['/login', '/register'].includes(pathname)) {
        history.push(`/login?callback=${pathname + search}`);
      }
    },
    menuHeaderRender: () => <Header />,
    // ...initialState?.settings,
  };
};

export function rootContainer(container: any) {
  return React.createElement(RecoilRoot, null, container);
}
