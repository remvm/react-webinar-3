import { memo} from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import useSelector from "../../store/use-selector";

const MainPageLink = ({ onPageChange }) => {

  const select = useSelector(state => ({
    currentPage: state.catalog.currentPage
  }));

  const handlePageClick = () => {
    onPageChange(1),
    select.currentPage = 1;
  };

  return (
        <span
          className={'MainPageLink'}
          onClick={() => handlePageClick()}
        >
          <Link to={`/`}>
            Главная
          </Link>
        </span>
  );
};

MainPageLink.propTypes = {
  onPageChange: PropTypes.func
};

MainPageLink.defaultProps = {
  onPageChange: () => {}
};

export default memo(MainPageLink);
