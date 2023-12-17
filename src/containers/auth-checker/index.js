import {memo, useEffect, useState} from "react";
import './style.css';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../../app/profile";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import UserTool from "../../components/user-tool";
import Head from "../../components/head";
import LocaleSelect from "../locale-select";
import Navigation from "../navigation";
import Spinner from "../../components/spinner";

function AuthChecker() {

  const store = useStore();
  const navigate = useNavigate()
  const {t} = useTranslate();

  const [load, setLoad] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await store.actions.auth.checkAuth();
        setLoad(false);
      } catch (error) {
        console.error('Error checking auth:', error);
        setLoad(false);
      }
    };

    fetchData();
  }, [store]);

  const select = useSelector(state => ({
    isAuthenticated: state.auth.isAuthenticated
  }));

  useEffect(() => {
    if (!load && !select.isAuthenticated) {
      navigate('/login');
    }
  }, [load, select.isAuthenticated, navigate]);

  if (load) {
    return (
      <PageLayout>
        <UserTool t={t} />
        <Head title={t('title')}>
          <LocaleSelect/>
        </Head>
        <Navigation/>
        <Spinner active={true}/>
      </PageLayout>
    )
  } else if (!load && select.isAuthenticated) {
    return <ProfilePage />;
  }
}

export default memo(AuthChecker);
