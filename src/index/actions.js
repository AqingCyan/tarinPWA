export const ACTION_SET_FROM = 'SET_FROM'
export const ACTION_SET_TO = 'SET_TO'
export const ACTION_SET_IS_CITY_SELECT_VISIBLE = 'SET_IS_CITY_SELECT_VISIBLE'
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY = 'SET_CURRENT_SELECTING_LEFT_CITY'
export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA'
export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA'
export const ACTION_SET_IS_DATE_SELECT_VISIBLE = 'SET_IS_DATE_SELECT_VISIBLE'
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED'
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE'

export const setFrom = (from) => (
  {
    type: ACTION_SET_FROM,
    payload: from,
  }
)

export const setTo = (to) => (
  {
    type: ACTION_SET_TO,
    payload: to,
  }
)

export const setIsLoadingCityData = (isLoadingCityData) => (
  {
    type: ACTION_SET_IS_LOADING_CITY_DATA,
    payload: isLoadingCityData,
  }
)

export const setCityData = (cityData) => (
  {
    type: ACTION_SET_CITY_DATA,
    payload: cityData,
  }
)

export const toggleHighSpeed = () => (
  (dispatch, getState) => {
    const { highSpeed } = getState()
    dispatch({
      type: ACTION_SET_HIGH_SPEED,
      payload: !highSpeed,
    })
  }
)

export const showCitySelector = (currentSelectLeftCity) => (
  (dispatch) => {
    dispatch({
      type: ACTION_SET_IS_CITY_SELECT_VISIBLE,
      payload: true,
    })
    dispatch({
      type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
      payload: currentSelectLeftCity,
    })
  }
)

export const hideCitySelector = () => (
  {
    type: ACTION_SET_IS_CITY_SELECT_VISIBLE,
    payload: false,
  }
)

export const setSelectedCity = (city) => (
  (dispatch, getState) => {
    const { currentSelectingLeftCity } = getState()
    if (currentSelectingLeftCity) {
      dispatch(setFrom(city))
    } else {
      dispatch(setTo(city))
    }
    dispatch(hideCitySelector())
  }
)

export const showDateSelector = () => (
  {
    type: ACTION_SET_IS_DATE_SELECT_VISIBLE,
    payload: true,
  }
)

export const hideDateSelector = () => (
  {
    type: ACTION_SET_IS_DATE_SELECT_VISIBLE,
    payload: false,
  }
)

export const exchangeFromTo = () => (
  (dispatch, getState) => {
    const { from, to } = getState()
    dispatch(setFrom(to))
    dispatch(setTo(from))
  }
)

export function setDepartDate(departDate) {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: departDate,
  };
}

export const fetchCityData = () => {
  return (dispatch, getState) => {
    const { isLoadingCityData } = getState()
    if (isLoadingCityData) {
      return
    }
    const cache = JSON.parse(localStorage.getItem('city_data_cache') || '{}')
    if (Date.now() < cache.expires) {
      dispatch(setCityData(cache.data))
      return
    }
    dispatch(setIsLoadingCityData(true))
    fetch('/rest/cities?_' + Date.now())
      .then(res => res.json())
      .then(cityData => {
        dispatch(setCityData(cityData))
        localStorage.setItem('city_data_cache', JSON.stringify({
          expires: Date.now() + 60 * 1000,
          data: cityData,
        }))
        dispatch(setIsLoadingCityData(false))
      }).catch(() => {
      dispatch(setIsLoadingCityData(false))
    })
  }
}
