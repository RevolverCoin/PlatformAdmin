import { fromJS } from 'immutable'

export const INITIAL_STATE = fromJS({
  addresses: null
})

export function handleGetAddressesResult(state, data) {
  return state.set('addresses', fromJS(data))
}

