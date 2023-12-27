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
import getLastChild from '../../utils/getLastChild';

function CommentsList(params) {

  const store = useStore();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const selectRedux = useSelectorRedux(state => ({
    activeForm: state.commentForm,
    lastChild: state.commentForm.lastChild
  }), shallowEqual);

  const select = useSelector(state => ({
    sessionExists: state.session.exists,
    currentUser: state.session.user
  }), shallowEqual);

  const callbacks = {
    openAnswerForm: useCallback((id, lastChild, parentLevel) => {dispatch(commentFormActions.open(id, lastChild, parentLevel))
      }, [store]),
    closeForm: useCallback((e) => {e.preventDefault(), dispatch(commentFormActions.close())
      }, [store]),
    onSubmit: useCallback((text, parent) => {dispatch(commentsActions.submit(text, parent))
      }, [store]),
    onSignIn: useCallback(() => {navigate('/login', {state: {back: location.pathname}});
      }, [location.pathname])
  }  

  const list = {
    comments: useMemo(() => ([
      ...treeToList(listToTree(params.comments?.items ? params.comments.items : [], params.article._id), (item, level) => (
        {...item, level}
      ))
    ]), [params.comments, select.sessionExists, selectRedux.activeForm]),
  };
  
  const renders = {
    item: useCallback(item => (
      <CommentCard  item={item} 
                    onAnswer={() => {callbacks.openAnswerForm(item._id, getLastChild(item), item.level)}} 
                    t={params.t} 
                    activeForm={selectRedux.activeForm}
                    onSubmit={callbacks.onSubmit} 
                    closeForm={callbacks.closeForm}
                    article={params.article}
                    sessionExists={select.sessionExists}
                    currentUser={select.currentUser}
                    onSignIn={callbacks.onSignIn}
                    lastChild={selectRedux.lastChild}
      />
    ), [callbacks.openAnswerForm, params.t, selectRedux.activeForm, select.sessionExists, selectRedux.lastChild]),
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
                      activeForm={selectRedux.activeForm}
                      sessionExists={select.sessionExists}
                      firstLevel={true}
                      onSignIn={callbacks.onSignIn}
        />
    </>
  )
}

export default memo(CommentsList);
