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

  export function getServiceInfo() {
    return (
      fetch(`${url}/service/info`, {
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

export function send(addressFrom, addressTo, amount) {
  return (
    fetch(`${url}/blockchain/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({addressFrom, addressTo, amount}),
    }))
}

export function support(addressFrom, addressTo) {
  return (
    fetch(`${url}/support`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({addressFrom, addressTo}),
    }))
}

export function removeSupport(addressFrom, addressTo) {
  return (
    fetch(`${url}/support`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({addressFrom, addressTo}),
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

export function getSupporting(address)
{
  return (
    fetch(`${url}/address/supporting/${address}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }))
}
export function getSupported(address)
{
  return (
    fetch(`${url}/address/supported/${address}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }))

}


export function setType(address, type) {
  return (
    fetch(`${url}/address/${address}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({type}),
    }))
}

export function createAddress() {
  return (
    fetch(`${url}/address/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({type: 'Supporter'}),
    }))
}

