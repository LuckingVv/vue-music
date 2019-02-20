<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type='text/ecmascript-6'>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getRankSongList} from 'api/rank'
import {ERR_OK} from 'api/config'
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
        const vkey = musicData.index % 2 === 1 ? 'C400002u0fTY2HoJJp.m4a?guid=1058760837&vkey=5E2D48351FD01F2EECE83E25539E39CD7678E7AC6217AEC5585B3CDCE9CBEA5D0F45EC3AF177898B90E6A87AF6C3F177E7A3EB6CB822A42D' : 'C400000LZuSb16dIgb.m4a?guid=1058760837&vkey=3747BC714E018BAC91C24024D4D5B72BF01129DD301E0B31DFB3F203E86CC8BCDBB2C918B9172DF05B7F6364D7FC18861A1D3FDEAD3EBE20'
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData, vkey))
        }
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