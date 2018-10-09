const url = 'http://127.0.0.1:5447'

export function getAddresses() {
    return (
      fetch(`${url}/addresses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }))
  }