import axios from 'axios'

const instance = axios.create({
})
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

export default {
  api_get_checkcode () {
    return instance.get('/api/setting/checkcode')
  }
}
