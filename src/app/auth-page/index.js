import {memo, useCallback, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from '../../components/login-form';
import UserTool from '../../components/user-tool';

function AuthPage() {
  const store = useStore();
  const navigate = useNavigate();

  const params = useParams();

  const select = useSelector(state => ({
    isAuthenticated: state.auth.isAuthenticated,
    waiting: state.article.waiting,
    error: state.auth.error,
    profile: state.profile.user,
    user: state.auth.user,
    loading: state.auth.loading
  }));

  const callbacks = {
    resetError: useCallback(() => {store.actions.auth.resetError()}, [store]),
    checkAuth: useCallback(() => {store.actions.auth.checkAuth()}, [store]),
    resetProfile: useCallback(() => {store.actions.profile.resetState()}, [store]),
    logIn: useCallback((login, password) => {store.actions.auth.login(login, password)}, [store]),
  }

  useEffect(() => {
    if (select.isAuthenticated && !select.loading && select.profile) {
      console.log(`1: ${select.profile}`)
      navigate(`/profile/${select.profile._id}`);
    } else if (select.isAuthenticated && !select.loading && !select.profile) {
      console.log(`2: ${select.user._id}`)
      navigate(`/profile/${select.user._id}`);
    }
    callbacks.checkAuth()
  }, [select.isAuthenticated, !select.loading])

  useEffect(() => {
    select.error && callbacks.resetError()
  }, [params])

  const {t} = useTranslate();
  

  return (
    <PageLayout>
      <UserTool t={t}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.loading}>
        <LoginForm t={t} error={select.error} onLogin={callbacks.logIn} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(AuthPage);
