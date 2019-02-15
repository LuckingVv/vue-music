import jsonp from 'common/js/jsonp'
import { commonParams, optionsPc } from './config'//, options
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