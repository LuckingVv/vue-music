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
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({}, {
      callback: 'musicJsonCallback',
      loginUin: 0,
      format: 'jsonp',
      platform: 'yqq',
      needNewCode: 0,
      cid: 205361747,
      uin: 0,
      guid: 5931742855,
      songmid: songmid,
      filename: `C400${songmid}.m4a`
  })

  return jsonp(url, data)
}