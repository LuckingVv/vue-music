<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type='text/ecmascript-6'>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getRankSongList} from 'api/rank'
import {ERR_OK, getSongVkey} from 'api/config'
import {createSong} from 'common/js/song'

export default {
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return this.topList.picUrl
    },
    ...mapGetters([
      'topList'
    ])
  },
  methods: {
    _getRankSongList() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getRankSongList(this.topList.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(({data}) => {
        const musicData = data
        getSongVkey(musicData.songmid).then(res => { // 获取song的vkey方法
          const vkey = res.req_0.data.midurlinfo[0].purl
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData, vkey))
          }
        })
      })
      return ret
    }
  },
  created() {
    this._getRankSongList()
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
.slide-enter-active, .slide-leave-active
  transition: all 0.3s

.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>