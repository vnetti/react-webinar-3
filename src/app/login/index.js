import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/login-form";
import UserInfo from "../../containers/user-info";
import {Navigate, useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function Login() {

  const store = useStore();

  const select = useSelector(state => ({
    isAuth: state.user.isAuth,
    errorMessage: state.user.error.message
  }))

  // Функция для локализации текстов
  const {t} = useTranslate();

  const navigate = useNavigate()

  const callbacks = {
    onLogin: useCallback(() => navigate('/login'), []),
    signIn: useCallback((login, password) => store.actions.user.login(login, password),[])
  }

  if (select.isAuth) return <Navigate to={'/profile'}/>

  return (
    <PageLayout>
      <UserInfo/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <LoginForm error={select.errorMessage} onClick={callbacks.signIn} t={t}/>
    </PageLayout>
  );

}

export default memo(Login);
