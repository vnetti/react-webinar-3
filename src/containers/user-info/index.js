import {memo, useCallback} from "react";
import {Link, useNavigate} from "react-router-dom";
import SideLayout from "../../components/side-layout";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

function UserInfo() {

  const store = useStore()

  const select = useSelector(state => ({
    isAuth: state.user.isAuth,
    userName: state.user.data.name || 'Профиль',
  }))

  // Функция для локализации текстов
  const {t} = useTranslate();

  const data = {
    buttonTitle: select.isAuth ? t('user-info.logout') : t('user-info.login')
  }

  const navigate = useNavigate()
  const callbacks = {
    onClick: useCallback(() => {
      if (select.isAuth) return store.actions.user.logout()
      return navigate('/login')
    }, [select.isAuth]),
  }

  return (
    <SideLayout side={"end"} paddingY={"small"} paddingX={"medium"} gap={"medium"} border={'solid'} borderB={"1"} borderColor={"gainsboro"}>
        {select.isAuth ? <Link to={'/profile'}>{select.userName}</Link> : ''}
        <button onClick={callbacks.onClick}>{data.buttonTitle}</button>
    </SideLayout>
  )
}

export default memo(UserInfo);
