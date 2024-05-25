import React, { ReactNode } from 'react';

const BlankLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={'app-blank'}>{children}</div>;
};

export default BlankLayout;
