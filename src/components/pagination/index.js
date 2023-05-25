import "./style.css";
import {cn as bem} from "@bem-react/classname";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import PaginationItem from "./pagination-item";

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
    <ul className={cn()}>
      {pageValues.map(item => {
        const isDisabled = item === currentPage
        const gap = {
          before: (item < currentPage && item !== totalPages - 1 && item !== 1) && <span>...</span>,
          after: (item > currentPage && item !== 2 && item !== totalPages) && <span>...</span>
        }
        return <PaginationItem key={item}
                               item={item}
                               onClick={onClick}
                               isDisabled={isDisabled}
                               gap={gap}/>})}
    </ul>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
}

export default Pagination