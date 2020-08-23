/**
 * 只获取一天的日期，去除小时分钟秒
 * @param timestamp
 * @returns {number}
 */
export const h0 = (timestamp = Date.now()) => {
  const target = new Date(timestamp)
  target.setHours(0)
  target.setMinutes(0)
  target.setSeconds(0)
  target.setMilliseconds(0)
  return target.getTime()
}
