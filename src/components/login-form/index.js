import {memo, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LoginForm({t, error, onLogin}) {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const cn = bem('LoginForm');
  return (
    <form className={cn()} onSubmit={() => onLogin(login, password)}>
      <label className={cn('label')}>
        {t('login.login')}
        <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
      </label>
      <label className={cn('label')}>
        {t('login.password')}
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <span className={cn('error')}>{JSON.stringify(error)}</span>}
      <button type="submit">{t('login.enter')}</button>
    </form>
  );
}

LoginForm.propTypes = {
  t: PropTypes.func, 
  error: PropTypes.string, 
  onLogin: PropTypes.func
};

LoginForm.defaultProps = {
  t: () => {}, 
  error: '', 
  onLogin: () => {}
}

export default memo(LoginForm);
