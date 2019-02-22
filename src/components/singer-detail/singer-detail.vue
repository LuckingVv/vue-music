<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'// , getSongVkey
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.singer_mid) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.singer_mid).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
          // this.songs = res.data.list
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        let {musicData} = item
        // getSongVkey(musicData.songmid).then(res => { // 获取song的vkey方法
        //   const vkey = res.req_0.data.midurlinfo[0].purl
        //   if (musicData.songid && musicData.albummid) {
        //     ret.push(createSong(musicData, vkey))
        //   }
        // })
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  created() {
    this._getSingerDetail()
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

.slide-enter,.slide-leave-to
  transform: translate3d(100%, 0, 0)
.slide-enter-active,.slide-leave-active
  transition: all 0.5s
</style>