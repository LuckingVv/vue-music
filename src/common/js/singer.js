export default class Singer {
  constructor(item) {
    this.country = item.country
    this.singer_id = item.singer_id
    this.name = item.singer_name
    this.avatar = `http://y.gtimg.cn/music/photo_new/T001R150x150M000${item.singer_mid}.jpg?max_age=2592000`
  }
}