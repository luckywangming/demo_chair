  
import axios from 'axios'
import qs from 'qs';

const instance = axios.create({
  timeout: 5000,
  headers: {'X-Custom-Header': 'application/x-www-form-urlencoded'}
})

function rsa(data) { //这里是rsa加密函数
  var {
    JSEncrypt
  } = require('jsencrypt')
  var b64map =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  var b64pad = '='

  function hex2b64(h) {
    var i
    var c
    var ret = ''
    for (i = 0; i + 3 <= h.length; i += 3) {
      c = parseInt(h.substring(i, i + 3), 16)
      ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63)
    }
    if (i + 1 == h.length) {
      c = parseInt(h.substring(i, i + 1), 16)
      ret += b64map.charAt(c << 2)
    } else if (i + 2 == h.length) {
      c = parseInt(h.substring(i, i + 2), 16)
      ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4)
    }
    while ((ret.length & 3) > 0) {
      ret += b64pad
    }
    return ret
  }
  JSEncrypt.prototype.encryptLong = function (string) {
    var k = this.getKey()
    // var maxLength = (((k.n.bitLength()+7)>>3)-11);
    var maxLength = 117

    try {
      var lt = ''
      var ct = ''

      if (string.length > maxLength) {
        lt = string.match(/.{1,117}/g)
        lt.forEach(function (entry) {
          var t1 = k.encrypt(entry)
          ct += t1
        })
        return hex2b64(ct)
      }
      var t = k.encrypt(string)
      var y = hex2b64(t)
      return y
    } catch (ex) {
      return false
    }
  }
  //公钥
  let publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgMHA+3pZIztqqp3kkAtnLXnfQUksUGRd0R3fy9g1MMMGs6VVhF6RuxdRI9ZyRUhjeEy6n5K7fPXlt7bPnjsFsfuYKcICJsnVxU4M5ptC0h94rCvb+ZvNw8uBMNcbqdCx/KSSCYQ+ujSSAo0SsOZZLn35qW5pRn3Tp+m6MtErZqwIDAQAB' // 从后台获取公钥，这里省略，直接赋值

  let encryptor = new JSEncrypt() // 新建JSEncrypt对象
  encryptor.setPublicKey(publicKey) // 设置公钥
  //console.log(data);
  let rsaData = encryptor.encryptLong(
    data
  )
  return rsaData
}
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let data = {...config.data}
  data.D = rsa(qs.stringify(config.data))
  config.data = qs.stringify(data)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});


export default instance