import './Table.scss'
import React from 'react'
import Paginator from './Paginator'

const Table = (
  { dataList,
    loading,
    onChoosePage,
    allDataCount,
    currentPage,
    error,
    onSortHandler }) => {

  if (error) {
    return (
      <h3 className='table__message'>{ error }</h3>
    )
  }

  if (loading) {
    return (
      <h3 className='table__message'>Идет загрузка</h3>
    )
  }

  if (dataList.length === 0) {
    return (
      <h3 className='table__message'>Нет данных для отображения, <br/> попробуйте создать записи в базе данных</h3>
    )
  }

  return (
    <>
      <table className='table'>
        <thead>
        <tr className='table__header'>
          <th className='table__date'>Дата</th>
          <th className='table__name' onClick={() => onSortHandler('name')}>Название</th>
          <th className='table__count' onClick={() => onSortHandler('count')}>Количество</th>
          <th className='table__distance' onClick={() => onSortHandler('distance')}>Расстояние</th>
        </tr>
        </thead>
        <tbody>
        {
          dataList.map(item => (
            <tr key={item.id}>
              <td>{item.date.substr(0, 10)}</td>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>{item.distance}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
      <div className='table__paginator'>
        <Paginator
          currentPage={currentPage}
          pageCount={Math.ceil(allDataCount / 10)}
          onChoosePage={onChoosePage}
        />
      </div>
    </>
  )
}

export default Table
