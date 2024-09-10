import React from 'react'
import { CPagination, CPaginationItem } from '@coreui/react'

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const maxPagesToShow = 10
  const pages = []

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
  let endPage = startPage + maxPagesToShow - 1

  if (endPage > totalPages) {
    endPage = totalPages
    startPage = Math.max(1, endPage - maxPagesToShow + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <CPaginationItem
        key={i}
        active={i === currentPage + 1}
        onClick={() => onPageChange(i - 1)}
      >
        {i}
      </CPaginationItem>,
    )
  }

  return (
    <CPagination className="justify-content-center" aria-label="Page navigation">
      {currentPage > 0 && (
        <CPaginationItem onClick={() => onPageChange(currentPage - 1)}>
          Précédent
        </CPaginationItem>
      )}

      {startPage > 1 && (
        <>
          <CPaginationItem onClick={() => onPageChange(0)}>1</CPaginationItem>
          <CPaginationItem disabled>...</CPaginationItem>
        </>
      )}

      {pages}

      {endPage < totalPages && (
        <>
          <CPaginationItem disabled>...</CPaginationItem>
          <CPaginationItem onClick={() => onPageChange(totalPages - 1)}>
            {totalPages}
          </CPaginationItem>
        </>
      )}

      {currentPage + 1 < totalPages && (
        <CPaginationItem onClick={() => onPageChange(currentPage + 1)}>
          Suivant
        </CPaginationItem>
      )}
    </CPagination>
  )
}

export default PaginationComponent
