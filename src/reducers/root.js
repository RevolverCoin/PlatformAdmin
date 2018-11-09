import * as types from '../constants/actionTypes'
import * as core from '../core/core'

export default (state = core.INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_ADDRESSES_RESULT:
      return core.handleGetAddressesResult(state, action.data)
    case types.GET_INFO_RESULT:
      return core.handleGetInfoResult(state, action.data)

    case types.GET_TRANSACTIONS_RESULT:
      return core.handleTransactionsResult(state, action.data)

    case types.GET_SUPPORTS_RESULT:
      return core.handleSupportsResult(state, action.data)

    case types.GET_TOP_RESULT:
      return core.handleGetTopResult(state, action.data)
      
    default:
      return state
  }
}
