<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'//, getSongVkey
import {ERR_OK} from 'api/config'
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
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        let {musicData} = item
        // getSongVkey(musicData.songmid).then(res => { // 获取song的vkey方法
        //   const vkey = res.req_0.data.midurlinfo[0].vkey
        //   if (musicData.songid && musicData.albummid) {
        //     ret.push(createSong(musicData, vkey))
        //   }
        // })
        const vkey = item.index % 2 === 1 ? 'C400002u0fTY2HoJJp.m4a?guid=1058760837&vkey=5E2D48351FD01F2EECE83E25539E39CD7678E7AC6217AEC5585B3CDCE9CBEA5D0F45EC3AF177898B90E6A87AF6C3F177E7A3EB6CB822A42D' : 'C400000LZuSb16dIgb.m4a?guid=1058760837&vkey=3747BC714E018BAC91C24024D4D5B72BF01129DD301E0B31DFB3F203E86CC8BCDBB2C918B9172DF05B7F6364D7FC18861A1D3FDEAD3EBE20'
        if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData, vkey))
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