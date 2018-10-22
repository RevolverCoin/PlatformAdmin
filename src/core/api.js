const url = 'http://127.0.0.1:5447'


export function getInfo() {
  return (
    fetch(`${url}/blockchain/info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }))
}


export function getAddresses() {
    return (
      fetch(`${url}/blockchain/state`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }))
  }

export function getBalance(address) {
  return (
    fetch(`${url}/blockchain/${address}/balance`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }))
}

export function send(fromAddress, toAddress, amount) {
  return (
    fetch(`${url}/blockchain/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({fromAddress, toAddress, amount}),
    }))
}

export function getTransactions(address)
{
  return (
    fetch(`${url}/blockchain/${address}/transactions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }))

}