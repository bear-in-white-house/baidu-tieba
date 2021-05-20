import React from 'react';

import { history } from 'umi';

import Footer from '@/components/Footer';

export async function getInitialState() {
  const data = await Promise.resolve('a');
  return data;
}
