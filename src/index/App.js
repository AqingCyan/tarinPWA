import React, { useCallback, useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from '../common/Header'
import Journey from './Journey'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Submit from './Submit'
import { exchangeFromTo, showCitySelector } from './actions'
import './App.css'

const App = (props) => {
  const { from, to, dispatch } = props

  /**
   * 头部栏点击返回的回调方法
   */
  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  const callbacks = useMemo(() => {
    return bindActionCreators({
      // 切换始发终点站
      exchangeFromTo,
      // 点击打开选择站点的浮层
      showCitySelector,
    }, dispatch)
  }, [])

  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
      <form className="form">
        <Journey
          from={from}
          to={to}
          {...callbacks}
        />
      </form>
      <DepartDate />
      <HighSpeed />
      <Submit />
    </div>
  )
}

export default connect(
  function mapStateToProps(state) {
    return state
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch }
  },
)(App)
