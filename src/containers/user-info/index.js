import {memo, useCallback} from "react";
import {Link, useNavigate} from "react-router-dom";
import SideLayout from "../../components/side-layout";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";

function UserInfo() {

  const store = useStore()

  useInit(() => {
    localStorage.getItem('X-Token') && store.actions.user.getSelf()
  }, []);

  const select = useSelector(state => ({
    isAuth: state.user.isAuth,
    userName: state.user.data.name || 'Профиль',
  }))

  const data = {
    buttonTitle: select.isAuth ? 'Выход' : 'Вход'
  }

  const navigate = useNavigate()
  const callbacks = {
    onClick: useCallback(() => {
      if (select.isAuth) return store.actions.user.logout()
      return navigate('/login')
    }, [select.isAuth]),
  }

  return (
    <SideLayout side={"end"} padding={"medium"}>
        {select.isAuth ? <Link to={'/profile'}>{select.userName}</Link> : ''}
        <button onClick={callbacks.onClick}>{data.buttonTitle}</button>
    </SideLayout>
  )
}

export default memo(UserInfo);
