import "./style.css";
import {cn as bem} from "@bem-react/classname";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

function Pagination({currentPage, totalPages, onClick}) {

  const cn = bem('Pagination');

  const [pageValues, setPageValues] = useState([1, 2, 3, totalPages]);

  useEffect(() => {
    currentPage - 1 <= 1 ?
      setPageValues([1, 2, 3, totalPages]) :
      (currentPage - 1 >= 2 && currentPage + 1 < totalPages) ?
        setPageValues([1, currentPage - 1, currentPage, currentPage + 1, totalPages]) :
        currentPage + 1 >= totalPages && setPageValues([1, totalPages - 2, totalPages - 1, totalPages])
  }, []);

  return (
    <div className={cn()}>
      {pageValues.map(item => {
        const gap = <span className={cn('buttonGap')}>...</span>
        const isGapBefore = item < currentPage && item !== totalPages - 1 && item !== 1
        const isGapAfter = item > currentPage && item !== 2 && item !== totalPages

        return <>
          {isGapBefore ? gap : ''}
          <button key={item}
                  className={cn('button')}
                  disabled={item === currentPage}
                  onClick={() => onClick(item)}>{item}</button>
          {isGapAfter ? gap : ''}
        </>})}
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
}

export default Pagination