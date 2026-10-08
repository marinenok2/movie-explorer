 /* eslint-disable react/prop-types */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxPageDisplay = 5;

  if (totalPages <= maxPageDisplay) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= maxPageDisplay - 2) {
      for (let i = 1; i <= maxPageDisplay; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('. . .', totalPages);
    } else if (currentPage > totalPages - (maxPageDisplay - 2)) {
      pageNumbers.push(1, '. . .');
      for (let i = totalPages - (maxPageDisplay - 1); i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1, '. . .');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('. . .', totalPages);
    }
  }

  return (
    <nav>
      <ul className='pagination'>
        {currentPage > 1 && (
          <li className='page-item'>
            <button onClick={() => onPageChange(currentPage - 1)} className='page-link'>
              &laquo;
            </button>
          </li>
        )}
        {pageNumbers.map((number, index) => (
          <li key={index} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            {typeof number === 'number' ? (
              <button onClick={() => onPageChange(number)} className='page-link'>
                {number}
              </button>
            ) : (
              <span className='page-link'>{number}</span>
            )}
          </li>
        ))}
        {currentPage < totalPages && (
          <li className='page-item'>
            <button onClick={() => onPageChange(currentPage + 1)} className='page-link'>
              &raquo;
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
