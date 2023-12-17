import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import AuthPage from './auth-page';
import { useEffect } from 'react';
import useStore from '../hooks/use-store';
import AuthChecker from '../containers/auth-checker';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  
  useEffect(() => {
    store.actions.auth.checkAuth()
  }, [store]);

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<AuthPage/>}/>
        <Route path={'/profile/:id'} element={<AuthChecker />}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
