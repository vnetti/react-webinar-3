import {memo} from 'react';
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import UserInfo from "../../containers/user-info";
import {Navigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import ProfileCard from "../../components/profile-card";

function Profile() {

  const select = useSelector(state => ({
    isAuth: state.user.isAuth,
    user: state.user.data
  }))

  // Функция для локализации текстов
  const {t} = useTranslate();

  if (!select.isAuth) return <Navigate to={'/login'} />

  return (
    <PageLayout>
      <UserInfo/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <ProfileCard user={select.user} t={t}/>
    </PageLayout>
  );
}

export default memo(Profile);
