import { memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { Link } from "react-router-dom";
import useSelector from "../../store/use-selector";
import './style.css';

const Navigation = ({ onPageChange }) => {

  const select = useSelector(state => ({
    currentPage: state.catalog.currentPage
  }));

  const handlePageClick = () => {
    onPageChange(1),
    select.currentPage = 1;
  };

  const cn = bem('Navigation');

  return (
    <div className={cn()}>
      <span
        className={cn('main')}
        onClick={() => handlePageClick()}
      >
        <Link to={`/`}>
          Главная
        </Link>
      </span>
    </div>
        
  );
};

Navigation.propTypes = {
  onPageChange: PropTypes.func
};

Navigation.defaultProps = {
  onPageChange: () => {}
};

export default memo(Navigation);
