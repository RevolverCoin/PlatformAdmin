import { fromJS } from 'immutable'

export const INITIAL_STATE = fromJS({
  info:{
    height: null,
    serviceAddress: null,
    serviceBalance: null
  },
  addresses: null,
  transactions: null,
  supports: null,
  top: null,

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
  return state.set('transactions', fromJS(data))
} 

export function handleSupportsResult(state,data)
{
  return state.set('supports', fromJS(data))
}

export function handleGetTopResult(state, data)
{
  return state.set('top', fromJS(data))
}