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
        const vkey = item.index % 2 === 1 ? 'C400002u0fTY2HoJJp.m4a?guid=1058760837&vkey=13C9BD40D8DA27C66F69D9C61B3102E63075BBA1D189A868521DFED56C7117FBAED623E956151FB2A3CA899D9AAB35866F0B1619B1188851' : 'C400000LZuSb16dIgb.m4a?guid=1058760837&vkey=4793E3D42AA2096CA81CD32CE5652605717D2522C5753874D5F83E925619AC3AECE9080C15F8004DB76FC12840430AD3739E0933095A52C4'
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