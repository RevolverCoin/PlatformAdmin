import * as types from '../constants/actionTypes'

import {
  getInfo,
  getAddresses,
  getBalance,
  send,
  support,
  getTransactions,
  getSupporting,
  getSupported,
  setType,
  removeSupport,
} from '../core/api'

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
export function sendAction(addressFrom, addressTo, amount) {
  return async dispatch => {
    // send
    await send(addressFrom, addressTo, amount)

    // reload addresses
    dispatch(getAddressesAction())
  }
}

/**
 * supportAction
 */
export function supportAction(addressFrom, addressTo) {
  return async dispatch => {

    console.log(addressFrom, addressTo)
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
    const transactions = await getTransactions(address)
    const response = await transactions.json()

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
    const supporting = await getSupporting(address)
    const sing = await supporting.json()

    const supported = await getSupported(address)
    const sed = await supported.json()

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
