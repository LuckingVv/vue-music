import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    '_': Math.random(),
    platform: 'h5',
    uin: 0,
    notice: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export function getSearch(w, p, zhida, perpage) {
  const url = '/api/soso/fcgi-bin/search_for_qq_cp'

  const data = Object.assign({}, commonParams, {
    '_': Math.random(),
    picmid: 1,
    platform: 'h5',
    w,
    zhidaqu: 1,
    catZhida: zhida ? 1 : 0,
    p,
    uin: 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage,
    n: perpage,
    needNewCode: 1,
    remoteplace: 'txt.mqq.all',
    notice: 0,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}