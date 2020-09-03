import React from 'react'

const Paginator = ({ currentPage, pageCount, onChoosePage }) => {

  const pageLeft = currentPage - 1 > 0
    ? (currentPage - 2 > 0 ? currentPage - 2 : currentPage - 1)
    : 1

  let pageRight = currentPage - 1 > 0
    ? (currentPage - 2 > 0 ? currentPage + 2 : currentPage + 3)
    : currentPage + 4

  if (pageRight > pageCount) { pageRight = pageCount }

  const pages = []
  for (let i = pageLeft; i <= pageRight; i++) {
    pages.push(i)
  }

  return (
    <>
      {
        pages.map(page => (
          <span
            key={page}
            className={page === currentPage ? 'active' : undefined }
            onClick={() => onChoosePage(page)}
          >
            { page }
          </span>
        ))
      }
    </>
  )
}

export default Paginator
