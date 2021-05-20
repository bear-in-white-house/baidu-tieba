import React from 'react';

export default ({ children }) => {
  console.log('rukou');

  return <React.StrictMode>{children}</React.StrictMode>;
};
