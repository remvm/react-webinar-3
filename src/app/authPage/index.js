import {memo, useEffect, useMemo} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from '../../components/loginForm';
import UserTool from '../../components/user-tool';

function AuthPage() {
  const store = useStore();
  const navigate = useNavigate();

  const params = useParams();

  const select = useSelector(state => ({
    isAuthenticated: state.auth.isAuthenticated,
    waiting: state.article.waiting,
  }));

  useEffect(() => {
    select.isAuthenticated && navigate("/profile");
  }, [select.isAuthenticated])

  const {t} = useTranslate();
  

  return (
    <PageLayout>
      <UserTool t={t}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <LoginForm t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(AuthPage);
