import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useInit from "../hooks/use-init";
import useStore from "../hooks/use-store";
import PrivateRoute from "../containers/private-route";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const store = useStore()

  useInit(() => {
    store.actions.user.getUser()
  }, []);

  const select = useSelector(state => ({
    isAuth: state.user.isAuth
  }))

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>} />
        <Route path={'/profile'} element={
          <PrivateRoute isAuth={select.isAuth}>
            <Profile/>
          </PrivateRoute>} />

      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
