import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss"
export default function Pagination({onChangePage}) {
    return(
        <ReactPaginate 
        className={styles.root}
              breakLabel="..."
              nextLabel=">"
              onPageChange={event => onChangePage(event.selected + 1)}
              pageRangeDisplayed={4}
              pageCount={3}
              previousLabel="<"
              renderOnZeroPageCount={null}
            />
    )
}