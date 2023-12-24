import {memo, useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import TextArea from '../text-area';
import CommentLogin from '../comment-login';

function CommentForm(params) {

  const [data, setData] = useState({
    text: '',
  });
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const callbacks = {
    onChange: useCallback((value, name) => {
      setData(prevData => ({...prevData, [name]: value}));
      setAttemptedSubmit(false);
    }, []),
  }

  const submitData = {
    "text": data.text,
    "parent": {
      "_id": params.lastChild?._id === params.item._id ? params.activeForm?.id : params.item._id,
      "_type": params.item._id === params.article._id ? "article" : "comment"
    }
  }

  const regex = /[a-zA-Zа-яА-Я0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
  const validText = regex.test(data.text)

  const cn = bem('Form');

  if (params.lastChild?._id === params.item._id || params.activeForm?.id === params.item._id || (params.article._id === params.item._id && params.activeForm.id ===  '')) {
    return (
      <CommentLogin exists={params.sessionExists} 
                    firstLevel={params.firstLevel} 
                    onClose={params.closeForm}
                    onSignIn={params.onSignIn}
                    t={params.t}
      >
        <form className={cn({'firstLevel': params.firstLevel})} 
              onSubmit={(e) => {e.preventDefault(), setAttemptedSubmit(true), validText && params.onSubmit(submitData)}}
        >
          <div className={cn('title')}>
            {params.firstLevel ? params.t('commentForm.title') : params.t('commentForm.answerTitle')}
          </div>
          <TextArea placeholder={params.t('commentForm.placeholder')} 
                    name='text' 
                    value={data.text} 
                    onChange={callbacks.onChange}
                    autoFocus={params.autoFocus}
          />
          {attemptedSubmit  && !validText &&
            <div className={cn('error')}>Введите текст</div>
          }
          <div className={cn('controlBar')}>
            <button className={cn('button')} type='submit'>{params.t("commentForm.submit")}</button>
            {!params.firstLevel &&
              <button className={cn('button')} onClick={params.closeForm} type='cancel'>{params.t("commentForm.cancel")}</button>
            }
          </div>
        </form>
      </CommentLogin>
    )
  } else {
    return <div className={cn({'firstLevel': params.firstLevel})}></div>
  }
}

CommentForm.propTypes = {
    item: PropTypes.object, 
    activeForm: PropTypes.object,
    article: PropTypes.object,
    sessionExists: PropTypes.bool,
    onSubmit: PropTypes.func,
    closeForm: PropTypes.func,
    onSignIn: PropTypes.func,
    t: PropTypes.func
}

CommentForm.defaultProps = {
  item: {}, 
  activeForm: {},
  article: {},
  sessionExists: false,
  onSubmit: () => {},
  closeForm: () => {},
  onSignIn: () => {},
  t: () => {}
}

export default memo(CommentForm);
