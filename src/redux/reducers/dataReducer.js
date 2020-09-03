import { dataApi } from '../../api/api'

const SET_DATA = 'data/SET_DATA'
const SET_LOADING = 'data/SET_LOADING'
const SET_ERROR = 'data/SET_ERROR'
const SET_PAGE = 'data/SET_PAGE'

const initialState = {
  dataList: [],
  allDataCount: null,
  loading: false,
  error: '',
  currentPage: 1
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.data
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.data
      }
    case SET_DATA:
        return {
          ...state,
          dataList: action.data.data,
          allDataCount: action.data.count
        }
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.data
      }
    default:
      return state
  }
}

const setData = (data) => ({type: SET_DATA, data})
const setLoading = (data) => ({type: SET_LOADING, data})
const setError = (data) => ({type: SET_ERROR, data})
export const setPage = (data) => ({type: SET_PAGE, data})

export const getData = (queryParams) => async (dispatch) => {

  dispatch(setError(''))
  dispatch(setLoading(true))

  const res = await dataApi.getData(queryParams)

  if (res.status === 200) {
    dispatch(setLoading(false))
    dispatch(setData(res.data))
  } else {
    dispatch(setLoading(false))
    dispatch(setError(res.statusText))
  }

}

export const createData = () => async (dispatch) => {

  dispatch(setError(''))
  dispatch(setLoading(true))

  const res = await dataApi.loadMockData()

  if (res.status === 201) {
    dispatch(getData())
  } else {
    dispatch(setLoading(false))
    dispatch(setError(res.statusText))
  }

}

export default dataReducer


