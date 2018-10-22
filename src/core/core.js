import { fromJS } from 'immutable'

export const INITIAL_STATE = fromJS({
  info:{
    height: null,
    serviceAddress: null,
    serviceBalance: null
  },
  addresses: null,
  current: null
})

export function handleGetAddressesResult(state, data) {
  return state.set('addresses', fromJS(data))
}

export function handleGetInfoResult(state, data)
{
  return state.set('info', fromJS(data))
}

export function handleTransactionsResult(state,data)
{
  return state.set('current', fromJS(data))
} 
