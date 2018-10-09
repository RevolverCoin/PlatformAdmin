import * as types from '../constants/actionTypes'

import {getAddresses} from '../core/api'

/**
 * getAddresses
 */
export function getAddressesAction() {
  return async dispatch => {

      const addresses = await getAddresses();
      let response    = await addresses.json()

      return dispatch({
        type: types.GET_ADDRESSES_RESULT,
        data: response.data,
      })
  }
}

