import * as types from '../constants/actionTypes'

import {
  getInfo,
  getServiceInfo,
  getAddresses,
  getBalance,
  send,
  support,
  getTransactions,
  getSupporting,
  getSupported,
  setType,
  removeSupport,
  createAddress,
  getTop
} from '../core/api'

import { promiseChainify } from '../utils/utils'

/**
 * getInfo
 */
export function getInfoAction() {
  return async dispatch => {
    const response = await getInfo()

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
    const response = await getAddresses()
    
    dispatch({
      type: types.GET_ADDRESSES_RESULT,
      data: response.data,
    })
  }
}

/**
 * sendAction
 */
export function sendAction(addressFrom, addressTo, amount) {
  return async dispatch => {
    // send
    const result = await send(addressFrom, addressTo, amount)

    console.log(result)

    // reload addresses
    dispatch(getAddressesAction())
  }
}

/**
 * supportAction
 */
export function supportAction(addressFrom, addressTo) {
  return async dispatch => {
    await support(addressFrom, addressTo)

    // reload addresses
    dispatch(getAddressesAction())
  }
}

/**
 * removeSupportAction
 */
export function removeSupportAction(addressFrom, addressTo) {
  return async dispatch => {
    await removeSupport(addressFrom, addressTo)

    // reload addresses
    dispatch(getAddressesAction())
  }
}

/**
 * getTransactionsAction
 */
export function getTransactionsAction(address) {
  return async dispatch => {
    // send
    const response = await getTransactions(address)

    dispatch({
      type: types.GET_TRANSACTIONS_RESULT,
      data: response.data,
    })
  }
}

/**
 * getTransactionsAction
 */
export function getSupportsAction(address) {
  return async dispatch => {
    const sing = await getSupporting(address)
    const sed = await getSupported(address)

    dispatch({
      type: types.GET_SUPPORTS_RESULT,
      data: { sing: sing.data.supports, sed: sed.data.supports },
    })
  }
}

/**
 * setTypeAction
 */
export function setTypeAction(address, type) {
  return async dispatch => {
    await setType(address, type)

    // reload addresses
    dispatch(getAddressesAction())
  }
}

/**
 * createAddressAction
 */
export function createAddressAction() {
  return async dispatch => {
    await createAddress()

    // reload addresses
    dispatch(getAddressesAction())
  }
}

/**
 * getTop
 */
export function getTopAction() {
  return async dispatch => {
    const response = await getTop()

    dispatch({
      type: types.GET_TOP_RESULT,
      data: response.data,
    })
  }
}
