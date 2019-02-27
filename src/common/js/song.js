import {getLyric} from 'api/song'
import {ERR_OK, getSongVkey} from 'api/config'
import {Base64} from 'js-base64'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
    // url: `http://dl.stream.qqmusic.qq.com/`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

export function getSongUrl(item) {
  return new Promise((resolve, reject) => {
    getSongVkey(item.mid).then(res => { // 获取song的vkey方法
      if (res.req_0.code === ERR_OK) {
        const vkey = res.req_0.data.midurlinfo[0].vkey
        const filename = res.req_0.data.midurlinfo[0].filename
        const url = `http://dl.stream.qqmusic.qq.com/${filename}?guid=1058760837&vkey=${vkey}&uin=0&fromtag=66`
        resolve(url)
      } else {
        reject(new Error('no url'))
      }
    })
  })
}