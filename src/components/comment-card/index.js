import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import CommentForm from '../comment-form';
import formatDateTime from '../../utils/date-format';


function CommentCard(params) {

  const level = params.item.level > 4 ? 4 : params.item.level
  const formLevel = params.activeForm.parentLevel + 1 > 4 ? 4 : params.activeForm.parentLevel + 1

  const cn = bem('CommentCard');
  return (
    <div className={cn()}>
      <div style={{marginLeft: `${level * 30}px`}}>
        <div className={cn('head')}>
          <div className={cn('name', {'currentUser': params.item.author.profile.name === params.currentUser?.profile?.name})}>
            {params.item.author.profile.name}
          </div>
          <div className={cn('date')}>{formatDateTime(params.item.dateCreate)}</div>
        </div>
        <div className={cn('text')}>{params.item.text}</div>
        <button className={cn('button')} onClick={() => {params.onAnswer()}}>{params.t('comment.answer')}</button>
      </div>
      <div style={{marginLeft: `${formLevel * 30}px`}}>
        {((params.lastChild && params.lastChild._id === params.item._id) || !params.lastChild) &&
          <CommentForm  activeForm={params.activeForm} 
                        item={params.item}
                        onSubmit={params.onSubmit} 
                        closeForm={params.closeForm}
                        t={params.t}
                        article={params.article}
                        sessionExists={params.sessionExists}
                        onSignIn={params.onSignIn}
                        lastChild={params.lastChild}
          />        
        }
      </div>
    </div>
  );
}

CommentCard.propTypes = {
    item: PropTypes.object, 
    activeForm: PropTypes.object,
    article: PropTypes.object,
    sessionExists: PropTypes.bool,
    currentUser: PropTypes.object,
    onAnswer: PropTypes.func,
    onSubmit: PropTypes.func,
    closeForm: PropTypes.func,
    onSignIn: PropTypes.func,
    t: PropTypes.func
};

CommentCard.defaultProps = {
  item: {}, 
  activeForm: {},
  article: {},
  sessionExists: false,
  currentUser: {},
  onAnswer: () => {},
  onSubmit: () => {},
  closeForm: () => {},
  onSignIn: () => {},
  t: (text) => text
}

export default memo(CommentCard);
