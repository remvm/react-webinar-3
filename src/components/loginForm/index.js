import {memo, useCallback, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function LoginForm() {

  const store = useStore();

  const select = useSelector(state => ({
    error: state.auth.error,
  }));

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const callbacks = {
    logIn: useCallback((e) => {e.preventDefault(), store.actions.auth.login(login, password)}, [store, login, password]),
  }

  const {t} = useTranslate();

  const cn = bem('LoginForm');
  return (
    <form className={cn()} onSubmit={callbacks.logIn}>
      <label className={cn('label')}>
        {t('login.login')}
        <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
      </label>
      <label className={cn('label')}>
        {t('login.password')}
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {select.error && <span className={cn('error')}>{JSON.stringify(select.error)}</span>}
      <button type="submit">{t('login.enter')}</button>
    </form>
  );
}

LoginForm.propTypes = {

};

LoginForm.defaultProps = {

}

export default memo(LoginForm);
