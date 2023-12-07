import { memo, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { Link } from "react-router-dom";
import useSelector from "../../store/use-selector";

const Pagination = ({ totalItems, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const select = useSelector(state => ({
    currentPageGlobal: state.catalog.currentPage
  }));

  useEffect(() => {
    setCurrentPage(1);
  }, [totalItems]);

  useEffect(() => {
    if (select.currentPageGlobal === 1) {
      setCurrentPage(1);
    }
  }, [select.currentPageGlobal]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };
  

  if (totalPages <= 1) {
    return null;
  }

  const generatePageArray = () => {
    const visiblePages = [];
    
    visiblePages.push(1);

    if (currentPage == totalPages) {
      visiblePages.push(totalPages-2)
    }

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        visiblePages.push(i);
      }
    }

    if (currentPage == 1) {
      visiblePages.push(3)
    }

    visiblePages.push(totalPages);

    if (visiblePages[1] > 2) {
      visiblePages.splice(1, 0, '...');
    }

    if (totalPages - visiblePages[visiblePages.length - 2] > 1) {
      visiblePages.splice(visiblePages.length - 1, 0, '...');
    }

    return visiblePages;
  };

  const visiblePages = generatePageArray();

  return (
    <div className="Pagination">
      {visiblePages.map((page, index) => (
        typeof page == 'number' ?
        <span
          key={index}
          className={page === currentPage ? 'active' : 'nonactive'}
          onClick={() => handlePageClick(page)}
        >
          {page === currentPage ?
            <>{page}</> :
            <Link to={`/${page === 1 ? '' : page}`}>
              {page}
            </Link>     
          }
        </span> :
        <span key={index} 
          className={'cover'}>
          {page}
        </span>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number,
  onPageChange: PropTypes.func
};

Pagination.defaultProps = {
  totalItems: 0,
  onPageChange: () => {}
};

export default memo(Pagination);
