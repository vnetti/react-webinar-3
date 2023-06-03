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
import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";

function Profile() {

  const store = useStore()

  useInit(() => {
    store.actions.profile.getProfile()
  })

  const select = useSelector(state => ({
    isAuth: state.user.isAuth,
    user: state.profile.data
  }))

  // Функция для локализации текстов
  const {t} = useTranslate();

  if (select.isAuth === false) return <Navigate to={'/login'} />

  return (
    <PageLayout>
      <UserInfo/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <Spinner active={!select.isAuth}>
        <ProfileCard user={select.user} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
