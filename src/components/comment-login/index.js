import {memo} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentLogin({exists, children, firstLevel = false, onClose, onSignIn, t}) {

  const cn = bem('CommentLogin')

  if (!exists) {
    return (
      <div className={cn('notExists')}>
        {firstLevel
          ? <div className={cn('firstLevel')}>
              <button className={cn('button loginButton')} onClick={onSignIn}>{t("commentForm.login")}</button>
              {t("commentForm.toWriteComment")}
            </div>
          : <div className={'anotherLevel'}>
              <button className={cn('button loginButton')} onClick={onSignIn}>{t("commentForm.login")}</button>
              {t("commentForm.toWriteAnswer")} 
              <button className={cn('button cancelButton')} onClick={onClose}>{t("commentForm.cancel")}</button>
            </div>
        }
      </div>
    )
  } else {
    return (
      <div className={cn('exists')}>
        {children}
      </div>
      
    )
  }
}

CommentLogin.propTypes = {
  exists: PropTypes.bool, 
  children: PropTypes.node, 
  firstLevel: PropTypes.bool, 
  onClose: PropTypes.func, 
  onSignIn: PropTypes.func, 
  t: PropTypes.func
}

CommentLogin.defaultProps = {
  exists: false,
  firstLevel: false, 
  onClose: () => {}, 
  onSignIn: () => {}, 
  t: () => {}
}

export default memo(CommentLogin);
