import React from 'react'
import PropTypes from 'prop-types'

import './Journey.css'
import switchImg from './img/switch.svg'

const Journey = props => {
  const { from, to, exchangeFromTo, showCitySelector, } = props

  return (
    <div className="journey">
      <div
        className="journey-station"
        onClick={() => { showCitySelector(true) }}
      >
        <input
          className="journey-input journey-from"
          type="text"
          readOnly
          name="from"
          value={from}
        />
      </div>
      <div
        className="journey-switch"
        onClick={exchangeFromTo}
      >
        <img src={switchImg} width="70" height="40" alt="switch" />
      </div>
      <div
        className="journey-station"
        onClick={() => { showCitySelector(false) }}
      >
        <input
          className="journey-input journey-to"
          type="text"
          readOnly
          name="to"
          value={to}
        />
      </div>
    </div>
  )
}

Journey.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  exchangeFromTo: PropTypes.func.isRequired,
  showCitySelector: PropTypes.func.isRequired,
}


export default Journey
