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
import UserTool from '../../components/user-tool';
import UserCard from '../../components/user-card';

function AuthPage() {
  const store = useStore();
  const navigate = useNavigate();

  const params = useParams();

  const select = useSelector(state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    waiting: state.article.waiting,
  }));

  useEffect(() => {
    !select.isAuthenticated && navigate("/login");
  }, [select.isAuthenticated])

  const {t} = useTranslate();

  return (
    <PageLayout>
      <UserTool t={t} />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <UserCard user={select.user} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(AuthPage);
