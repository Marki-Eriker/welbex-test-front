import './App.scss'
import React from 'react'
import { createData, getData, setPage } from './redux/reducers/dataReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from './components'

const { useState } = require('react')

const { useEffect } = require('react')

const App = () => {

  const dispatch = useDispatch()
  const {
    loading,
    error,
    dataList,
    allDataCount,
    currentPage
  } = useSelector(state => state.data)

  const [query, setQuery] = useState({})

  useEffect(() => {
    dispatch(getData(query))
  }, [query])

  const createDataHandler = () => {
    dispatch(createData())
  }

  const onFilterHandler = (e) => {
    e.preventDefault()
    console.log(e.currentTarget.field.value)
    setQuery({
      ...query,
      field: e.currentTarget.field.value,
      condition: e.currentTarget.condition.value,
      value: e.currentTarget.value.value,
      pageNumber: 1
    })
    dispatch(setPage(1))
  }

  const onClearFilter = () => {
    setQuery({
      ...query,
      field: undefined,
      condition: undefined,
      value: undefined
    })
  }

  const onSortHandler = (field) => {
    if (query.sort === field) {
      if (query.sortDirection === 'ASC') {
        setQuery({...query, sortDirection: 'DESC'})
        return
      } else {
        setQuery({...query, sortDirection: undefined, sort: undefined})
        return
      }
    }
    setQuery({...query, sortDirection: 'ASC', sort: field})
  }

  const onChoosePage = (page) => {
    setQuery({...query, pageNumber: page})
    dispatch(setPage(page))
  }


  return (
    <div className='app'>
      <div className='card'>
        <div className='card__title'>

          <form className='card__form' onSubmit={onFilterHandler}>
            <button type='submit' disabled={loading}>Фильтровать</button>
            <select name='field' id='' required>
              <option value=''>Поле...</option>
              <option value='name'>Название</option>
              <option value='count'>Количество</option>
              <option value='distance'>Расстояние</option>
            </select>
            <select name='condition' id='' required>
              <option value=''>Условие...</option>
              <option value='equal'>Равно</option>
              <option value='contain'>Содержит</option>
              <option value='greater'>Больше</option>
              <option value='less'>Меньше</option>
            </select>
            <input name='value' type='text' placeholder='Значение' required/>
            <button type='reset' onClick={onClearFilter} disabled={loading}>Сброс</button>
          </form>

          <button onClick={createDataHandler} disabled={loading}>Создать записи в БД</button>
        </div>
        <div className='card__table'>
          <Table
            data={dataList}
            loading={loading}
            error={error}
            dataList={dataList}
            currentPage={currentPage}
            allDataCount={allDataCount}
            onChoosePage={onChoosePage}
            onSortHandler={onSortHandler}
          />
        </div>
      </div>
    </div>
  )
}

export default App
