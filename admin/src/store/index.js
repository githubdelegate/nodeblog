import axios from 'axios'
// import router from '../router'

axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const instance = axios.create()
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.interceptors.request.use = instance.interceptors.request.use

export default {
  api_get_checkcode () {
    return instance.get('/api/setting/checkcode')
  }
}
