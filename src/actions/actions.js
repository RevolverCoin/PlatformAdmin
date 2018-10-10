import * as types from '../constants/actionTypes'

import { getInfo, getAddresses, getBalance, send } from '../core/api'

import { promiseChainify } from '../utils/utils'


/**
 * getInfo
 */
export function getInfoAction() {
  return async dispatch => {
    const addresses = await getInfo()
    let response = await addresses.json()

    dispatch({
      type: types.GET_INFO_RESULT,
      data: response.data,
    })
  }
}

/**
 * getAddresses
 */
export function getAddressesAction() {
  return async dispatch => {
    const addresses = await getAddresses()
    let response = await addresses.json()

    dispatch({
      type: types.GET_ADDRESSES_RESULT,
      data: response.data,
    })
  }
}

/**
 * sendAction
 */
export function sendAction(fromAddress, toAddress, amount) {
  return async dispatch => {
    // send
    await send(fromAddress, toAddress, amount)
    
    // reload addresses
    dispatch(getAddressesAction())
  }
}
