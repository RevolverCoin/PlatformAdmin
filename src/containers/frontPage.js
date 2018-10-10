import React from 'react'
import { connect } from 'react-redux'

import MUIContainer from 'muicss/lib/react/container'
import MUIRow from 'muicss/lib/react/row'
import MUICol from 'muicss/lib/react/col'

import styled from 'styled-components'

import { getAddressesAction, sendAction, getInfoAction } from '../actions/actions'

const Container = styled(MUIContainer)``
const ContainerAddresses = styled(MUIContainer)`
  background-color: #eee;
`

const ContainerBlock = styled(MUIContainer)`
  background-color: #bbb;
  margin-top: 20px;
  margin-bottom: 20px;
`

const Row = styled(MUIRow)``
const Col = styled(MUICol)``

const AddressRow = styled(Row)`
  border-bottom: 1px solid #333;
`

const Input = styled.input`
  width: 100%;
`

class FrontPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fromAddress: '',
      toAddress: '',
      amount: 0,
    }

    this.onSend = this.onSend.bind(this)

    this.handleFromAddressChange = this.handleFromAddressChange.bind(this)
    this.handleToAddressChange = this.handleToAddressChange.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
  
    this.interval = null;
  }

  componentDidMount() {
    this.props.loadAddresses()

    this.interval = setInterval( ()=>{

      this.props.getInfo()

    }, 5000);
  }

  componentWillUnmount() {
    if (this.interval)
      clearInterval(this.interval)
  }

  componentDidUpdate(prevProps) {
    if (this.props.blockHeight !== prevProps.blockHeight) {
      this.props.loadAddresses()
    }
  }

  onSend() {
    this.props.send(this.state.fromAddress, this.state.toAddress, this.state.amount)
  }

  handleFromAddressChange(event) {
    this.setState({ fromAddress: event.target.value })
  }

  handleToAddressChange(event) {
    this.setState({ toAddress: event.target.value })
  }

  handleAmountChange(event) {
    let value = event.target.value
    this.setState({ amount: value })
  }

  render() {
    let addressesList = null

    if (this.props.addresses) {
      addressesList = this.props.addresses.map(item => (
        <AddressRow key={item.address}>
          <Col md="6">{item.address}</Col>
          <Col md="6">{item.balance}</Col>
        </AddressRow>
      ))
    }

    return (
      <Container fluid={true}>
        <Row>
          <Col md="7">
            <ContainerBlock>
              <Row>
                <Col md="2">Block</Col>
                <Col md="2">#{this.props.blockHeight}</Col>
              </Row>
              <Row>
                <Col md="2">Total Supply</Col>
                <Col md="2">{this.props.totalSupply}</Col>
              </Row>
            </ContainerBlock>

            <ContainerAddresses>
              <Row>
                <Col md="6">Address</Col>
                <Col md="6">Balances</Col>
              </Row>

              {addressesList}
            </ContainerAddresses>
          </Col>
          <Col md="5">
            <h2>Send</h2>
            <Container>
              <Row>
                <Col md="3">From</Col>
                <Col md="9">
                  <Input value={this.state.fromAddress} onChange={this.handleFromAddressChange} />
                </Col>
              </Row>
              <Row>
                <Col md="3">To</Col>
                <Col md="9">
                  <Input value={this.state.toAddress} onChange={this.handleToAddressChange} />
                </Col>
              </Row>
              <Row>
                <Col md="3">Amount</Col>
                <Col md="9">
                  <Input value={this.state.amount} onChange={this.handleAmountChange} />
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  <button onClick={this.onSend}>Send</button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const root = state && state.root
  const addresses = root && root.get('addresses')

  const info = root && root.get('info')

  const height = info && info.get('height')

  return { 
    addresses: addresses && addresses.toJS(),
    blockHeight: height
  }
}

const mapDispatchToProps = dispatch => ({
  loadAddresses() {
    dispatch(getAddressesAction())
  },

  send(fromAddress, toAddress, amount) {
    dispatch(sendAction(fromAddress, toAddress, amount))
  },

  getInfo() {
    dispatch(getInfoAction())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FrontPage)
