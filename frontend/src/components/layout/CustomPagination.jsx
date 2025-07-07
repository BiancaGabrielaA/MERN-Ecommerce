import React from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import ReactPaginate from "react-paginate"

const CustomPagination = ({ resPerPage, filteredProductsCount }) => {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const pageCount = Math.ceil(filteredProductsCount / resPerPage);

    const navigate = useNavigate();
    const setCurrentPageNo = ({ selected }) => {
        const pageNumber = selected + 1;
        const params = new URLSearchParams(window.location.search);
        params.set("page", pageNumber);
        navigate(`?${params.toString()}`);
    }

    return (
        <div>
            {pageCount > 1 && (
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next"
                    onPageChange={setCurrentPageNo}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="Prev"
                    forcePage={page - 1}
                    containerClassName="pagination"
                    activeClassName="active"
                    disabledClassName="disabled"
                />
            )}
        </div>
    )
}

export default CustomPagination;
