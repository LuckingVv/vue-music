export default class Singer {
  constructor(item) {
    this.country = item.country
    this.singer_id = item.singer_id
    this.singer_mid = item.singer_mid
    this.name = item.singer_name
    this.avatar = `http://y.gtimg.cn/music/photo_new/T001R300x300M000${this.singer_mid}.jpg?max_age=2592000`
  }
}