import React, { ReactNode, useEffect, useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../footer/Footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const loginErrorState = useSelector((state: RootState) => state.auth.isError);
  const singUpErrorState = useSelector(
    (state: RootState) => state.auth.isError,
  );
  const [errorSignUp, setErrorSignUp] = useState<boolean>(false);

  useEffect(() => {
    setErrorSignUp(singUpErrorState);
  }, [singUpErrorState]);

  return (
    <div className={'app-blank'}>
      <Header
        userInfo={userInfo}
        isLoginError={loginErrorState}
        isSingUpError={errorSignUp}
      />
      <div className={'container-fluid'}>{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
