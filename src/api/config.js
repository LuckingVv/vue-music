import jsonp from 'common/js/jsonp'

export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

// 配置jsonp库的通用的options
export const options = {
  // 通过qq得到了回掉函数的参数名
  param: 'jsonpCallback'
}

// PC端的回掉函数
export const optionsPc = {
  // 通过qq得到了回掉函数的参数名
  param: 'callback'
}

export const ERR_OK = 0

// 获取歌曲的vkey
export function getSongVkey(songmid) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  const dataParam = {
    req_0: {
      module: 'vkey.GetVkeyServer',
      method: 'CgiGetVkey',
      param: {
        guid: '1058760837',
        songmid: [songmid],
        songtype: [0],
        uin: '0',
        loginflag: 1,
        platform: '20'
      }
    },
    comm: {
      uin: 0,
      format: 'json',
      ct: 24,
      cv: 0
    }
  }

  const data = Object.assign({}, commonParams, {
    '-': 'getplaysongvkey' + Math.random(),
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: JSON.stringify(dataParam)
  })

  return jsonp(url, data)
  // return axios.get(url, {
  //   params: data
  // }).then(res => {
  //   return Promise.resolve(res.data)
  // })
}