import * as types from './mutation-types'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
const mutations = {
  [types.SET_SINGER](state, payload) {
    state.singer = payload
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playList = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_PLAYLIST_URL](state, {url, index}) {
    let sIndex = findIndex(state.sequenceList, state.playList[state.currentIndex])
    state.sequenceList[sIndex].url = url
    if (state.playList[index]) {
      state.playList[index].url = url
    }
  },
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  [types.SET_TOP_LIST](state, topList) {
    state.topList = topList
  },
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  },
  [types.SET_FAVORITE_LIST](state, favorite) {
    state.favoriteList = favorite
  },
  [types.SET_PLAY_HISTORY](state, history) {
    state.playHistory = history
  }
}
export default mutations