import React, { useCallback } from 'react'
import { connect } from 'react-redux'

import Header from '../common/Header'
import Journey from './Journey'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Submit from './Submit'

import './App.css'

const App = (props) => {

  /**
   * 头部栏点击返回的回调方法
   */
  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
      <Journey />
      <DepartDate />
      <HighSpeed />
      <Submit />
    </div>
  )
}

export default connect(
  function mapStateToProps(state) {
    return {}
  },
  function mapDispatchToProps(dispatch) {
    return {}
  },
)(App)
