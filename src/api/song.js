import {commonParams} from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url = '/api/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  const data = Object.assign({}, commonParams, {
    '-': 'MusicJsonCallback_lrc',
    songmid: mid,
    pcachetime: new Date(),
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}