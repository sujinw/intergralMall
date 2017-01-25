import axios from 'axios'

var url = 'http://mall.com/index.php/admin/' //process.env.NODE_ENV !== 'production' ? '/api/' :;
export default {
  login: function (username, pwd, cb) {
    console.log(username, pwd)
    axios.get(url + 'login?pwd=' + pwd + '&username=' + username).then(function (res) {
      if (res.status >= 200 && res.status < 300) {
        // console.log(res)
        cb(res.data)
      }
    }).catch((error) => {
      // new Error('desc');
      return Promise.reject(error)
    })
  }
}
