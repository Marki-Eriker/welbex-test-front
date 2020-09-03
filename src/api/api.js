import axios from 'axios'

const axiosApi = axios.create({
  validateStatus: (status => { return true }),
  baseURL: '/'
})

export const dataApi = {
  loadMockData() {
    return axiosApi.post('data')
  },
  getData(queryParam) {
    if (queryParam) {
      let params = '?'
      Object.keys(queryParam).map( key => {
        if (queryParam[key] !== undefined) {
          params = params + `${key}=${queryParam[key]}&`
        }
      })
      return axiosApi.get(`data${params}`)
    }

    return axiosApi.get('data')
  }
}
