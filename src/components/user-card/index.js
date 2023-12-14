import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function UserCard({user, t}) {
  const cn = bem('UserCard');
  if (user && user.result ) {
    return (
      <div className={cn()}>
        <h2>{t('profile.title')}</h2>
        <div className={cn('prop')}>
          <div className={cn('label')}>
            {t('profile.name')}:
            <span>{user.result.profile.name}</span>
          </div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>
            {t('profile.phone')}:
            <span>{user.result.profile.phone}</span>
          </div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>
            email:
            <span>{user.result.email}</span>
          </div>
        </div>
      </div>
    );
  }
}

UserCard.propTypes = {
  user: PropTypes.object
};

UserCard.defaultProps = {
  user: {}
}

export default memo(UserCard);
