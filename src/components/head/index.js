import {memo} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({title, hLevel=1, children}) {

  const Htag = `h${hLevel}`

  return (
    <div className='Head'>
      <div className='Head-place'>
        <Htag>{title}</Htag>
      </div>
      <div className='Head-place'>{children}</div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default memo(Head);
