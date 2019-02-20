<template>
  <div class="singer" ref="singer">
    <List-view :data="singerList" @select="selectSinger" ref="list"></List-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listView/listView'
import {mapMutations} from 'vuex'
import {playListMixin} from 'common/js/mixin'

export default {
  mixins: [playListMixin],
  data() {
    return {
      singerList: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.singer_id}`
      })
      this.setSinger(singer)
    },
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singerList = this._singerCountryMap(res.singerList.data.singerlist)
        }
      })
    },
    _singerCountryMap(list) {
      let map = {}
      list.forEach((item, index) => {
        let key = item.country
        if (!map[key]) {
          let item = []
          map[key] = item
        }
        map[key].push(new Singer(item))
      })

      let arr = []
      for (var key in map) {
        let currentKey = key === '' ? '其它' : key
        let obj = {
          title: currentKey,
          items: map[key]
        }
        arr.push(obj)
      }
      return arr
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
