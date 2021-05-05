import React from 'react';
import _ from 'lodash'
import { Link } from 'react-router-dom';

const Pagination = (props) => {
    const { itemsCount, pageSize, currentPage, onPageChange } = props
    const pagesCount = Math.ceil(itemsCount / pageSize)
    const pages = _.range(1, pagesCount + 1)
    if (pages.length === 1)
        return null
    return (
        <nav>
            <ul className="pagination">
                {
                    pages.map(page => (
                        <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
                            <Link to="#" className="page-link" onClick={() => onPageChange(page)}>{page}</Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pagination; 