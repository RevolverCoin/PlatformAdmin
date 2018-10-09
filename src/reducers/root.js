import * as types from '../constants/actionTypes'
import * as core from '../core/core'

export default (state = core.INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_ADDRESSES_RESULT:
      return core.handleGetAddressesResult(state, action.data)
    default:
      return state
  }
}