import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'

import { h0 } from '../common/fp'
import './DepartDate.css'

const DepartDate = props => {
  const { time, onClick } = props

  /**
   * departDateString只获取一天的日期，而time的小时分钟秒可能不一样，但日期还是同一天，
   * 减少不必要的计算，处理掉小时分钟秒，只依赖日期是否变化再做departDateString的计算
   */
  const h0OfDepart = h0(time)
  const departDateString = useMemo(() => dayjs(time).format('YYYY-MM-DD'), [h0OfDepart])

  const departDate = new Date(h0OfDepart)
  const isToday = h0OfDepart === h0()
  const weekString = '周' + ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()] + (isToday ? '（今天）' : '')

  return (
    <div className="depart-date" onClick={onClick}>
      <input type="hidden" name="date" value={departDateString}/>
      {departDateString}&nbsp;
      <span className="depart-week">{weekString}</span>
    </div>
  )
}

DepartDate.propTypes = {
  time: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default DepartDate
