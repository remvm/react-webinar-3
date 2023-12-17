import {memo, useCallback, useEffect} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Link } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

function UserTool({t}) {

  const store = useStore()

  const select = useSelector(state => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
  }));

  const callbacks = {
    logOut: useCallback(() => {
      store.actions.auth.logout();
      store.actions.profile.resetState();
    }, [store]),
  };
  

  const cn = bem('UserTool');

  if (!select.isAuthenticated) {
    return  <div className={cn()}>
              <Link className={cn('linkIn')} to={'/login'}><button>{t('user.enter')}</button></Link>
            </div>;
  }

  if (select.loading) {
    return <div className={cn()}>{t('user.loading')}...</div>;
  } 

  if (select.isAuthenticated && !select.loading && select.user && select.user && select.user.profile) {
    return (
      <div className={cn()}>
          <Link className={cn('userLink')} to={`/profile/${select.user._id}`}>{select.user.profile.name}</Link>
          <button onClick={callbacks.logOut}>{t('user.out')}</button>  
      </div>
    )
  }
}

export default memo(UserTool);
