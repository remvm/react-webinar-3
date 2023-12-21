import {memo, useCallback, useMemo} from 'react';
import useStore from '../../hooks/use-store';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import List from '../../components/list';
import CommentCard from '../../components/comment-card';
import { useDispatch } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import Head from '../../components/head';
import {useSelector as useSelectorRedux} from 'react-redux';
import CommentForm from '../../components/comment-form';
import commentFormActions from '../../store-redux/comment-form/actions'
import useSelector from '../../hooks/use-selector';
import shallowEqual from 'shallowequal';
import { useLocation, useNavigate } from 'react-router-dom';

function CommentsList(params) {

  const store = useStore();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()

  const activeForm = useSelectorRedux(state => state.commentForm);

  const select = useSelector(state => ({
    sessionExists: state.session.exists,
    currentUser: state.session.user
  }), shallowEqual);

  const callbacks = {
    openAnswerForm: useCallback(id => {dispatch(commentFormActions.open(id))
      }, [store]),
    closeForm: useCallback((e) => {e.preventDefault(), dispatch(commentFormActions.close())
      }, [store]),
    onSubmit: useCallback((articleId, text, parent) => {dispatch(commentsActions.submit(articleId, text, parent))
      }, [store]),
    onSignIn: useCallback(() => {navigate('/login', {state: {back: location.pathname}});
      }, [location.pathname])
  }  

  const list = {
    comments: useMemo(() => ([
      ...treeToList(listToTree(params.comments?.items ? params.comments.items : [], params.article._id), (item, level) => (
        {...item, level}
      ))
    ]), [params.comments, select.sessionExists]),
  };

  
  const renders = {
    item: useCallback(item => (
      <CommentCard  item={item} 
                    onAnswer={() => callbacks.openAnswerForm(item._id)} 
                    t={params.t} 
                    activeForm={activeForm}
                    onSubmit={callbacks.onSubmit} 
                    closeForm={callbacks.closeForm}
                    article={params.article}
                    sessionExists={select.sessionExists}
                    currentUser={select.currentUser}
                    onSignIn={callbacks.onSignIn}
      />
    ), [callbacks.openAnswerForm, params.t, activeForm, select.sessionExists]),
  };

  return (
    <>
      <Head title={params.t("comment.title") + `(${params.comments?.count})`} hLevel={2} />
      <List list={list.comments} renderItem={renders.item}/>
        <CommentForm  onSubmit={callbacks.onSubmit} 
                      closeForm={callbacks.closeForm} 
                      item={params.article} 
                      t={params.t}
                      article={params.article}
                      activeForm={activeForm}
                      sessionExists={select.sessionExists}
                      firstLevel={true}
                      onSignIn={callbacks.onSignIn}
        />
    </>
  )
}

export default memo(CommentsList);
