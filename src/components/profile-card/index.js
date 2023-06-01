import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileCard({user}) {
  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <h2>Профиль</h2>
      <div className={cn('prop')}>
        <div className={cn('label')}>Имя:</div>
        <div className={cn('value')}>{user.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Телефон:</div>
        <div className={cn('value')}>{user.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{user.email}</div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string
  }).isRequired
};

ProfileCard.defaultProps = {

}

export default memo(ProfileCard);
