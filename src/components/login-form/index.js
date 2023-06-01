import {memo, useCallback, useState} from "react";
import {cn as bem} from '@bem-react/classname';
import Input from "../input";
import PropTypes from "prop-types";
import './style.css';

function LoginForm(props) {
  const cn = bem('LoginForm');

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const callbacks = {
    onChangeLogin: useCallback((value) => setLogin(value), []),
    onChangePassword: useCallback((value) => setPassword(value), [])
  }

  return (
    <div className={cn()}>
      <h2>Вход</h2>
      <div className={cn('row')}>
        <span>Логин</span>
        <Input value={login} onChange={callbacks.onChangeLogin}/>
      </div>
      <div className={cn('row')}>
        <span>Пароль</span>
        <Input value={password} onChange={callbacks.onChangePassword} type="password"/>
      </div>
      {props.error ? <div className={cn('row')}>
        <p className={cn('error')}>{props.error}</p>
      </div> : ''}
      <div className={cn('row')}>
        <input onClick={() => props.onClick(login, password)} type="button" value="Войти"/>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  onClick: PropTypes.func,
  error: PropTypes.arrayOf(PropTypes.string)
};

LoginForm.defaultProps = {
  onClick: () => {},
}

export default memo(LoginForm);
