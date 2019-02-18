import jsonp from 'common/js/jsonp'
import { commonParams, optionsPc, options } from './config'//
// import axios from 'axios'

export function getSingerList() {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  const dataParam = {
    comm: {
      ct: 24,
      cv: 0
    },
    singerList: {
      module: 'Music.SingerListServer',
      method: 'get_singer_list',
      param: {
        area: -100,
        sex: -100,
        genre: -100,
        index: -100,
        sin: 0,
        cur_page: 1
      }
    }
  }

  const data = Object.assign({}, commonParams, {
    platform: 'yqq.json',
    hostUin: 0,
    loginUin: 0,
    needNewCode: 0,
    notice: 0,
    data: JSON.stringify(dataParam)
  })
  return jsonp(url, data, optionsPc)
  // return axios.get(url, {
  //   params: data
  // }).then(res => {
  //   return Promise.resolve(res.data)
  // })
}

export function getSingerDetail(singermid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq.json',
    hostUin: 0,
    loginUin: 0,
    needNewCode: 0,
    notice: 0,
    ct: 24,
    singermid: singermid,
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1
  })
  return jsonp(url, data, options)
}
// 获取歌曲的vkey
export function getSongVkey(songmid) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  const dataParam = {
    req: {
      module: 'CDN.SrfCdnDispatchServer',
      method: 'GetCdnDispatch',
      param: {
        guid: 1058760837,
        calltype: 0,
        userip: ''
      }
    },
    req_0: {
      module: 'vkey.GetVkeyServer',
      method: 'CgiGetVkey',
      param: {
        guid: 1058760837,
        songmid: [songmid],
        songtype: [0],
        uin: 0,
        loginflag: 1,
        platform: 20
      }
    },
    comm: {
      uin: 0,
      format: 'json',
      ct: 24,
      cv: 0
    }
  }

  const data = Object.assign({}, {
    '-': 'getplaysongvkey' + Math.random() * 10,
    loginUin: 0,
    hostUin: 0,
    notice: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    data: JSON.stringify(dataParam)
  })

  return jsonp(url, data)
}