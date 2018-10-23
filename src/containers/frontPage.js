import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import MUIContainer from 'muicss/lib/react/container'
import MUIRow from 'muicss/lib/react/row'
import MUICol from 'muicss/lib/react/col'

import styled from 'styled-components'

import { 
  getAddressesAction, 
  sendAction, 
  getInfoAction, 
  supportAction, 
  setTypeAction,
  removeSupportAction,
  createAddressAction
} from '../actions/actions'

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
      supportFromAddress: '',
      supportToAddress: '',
      setTypeAddress: '',
      setTypeSelect: 'Supporter'
    }

    this.onSend = this.onSend.bind(this)
    this.onSupport = this.onSupport.bind(this)
    this.onSetType = this.onSetType.bind(this)
    this.onRemoveSupport = this.onRemoveSupport.bind(this)
    this.onCreateAddress = this.onCreateAddress.bind(this)

    this.handleInputChange = this.handleInputChange.bind(this)

    this.interval = null
  }

  componentDidMount() {
    this.props.loadAddresses()

    this.interval = setInterval(() => {
      this.props.getInfo()
    }, 5000)
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval)
  }

  componentDidUpdate(prevProps) {
    if (this.props.blockHeight !== prevProps.blockHeight) {
      this.props.loadAddresses()
    }
  }

  onSend() {
    this.props.send(this.state.fromAddress, this.state.toAddress, this.state.amount)
  }

  onSupport() {
    this.props.support(this.state.supportFromAddress, this.state.supportToAddress)
  }

  onRemoveSupport() {
    this.props.removeSupport(this.state.supportFromAddress, this.state.supportToAddress)
  }

  onSetType() {
    this.props.setType(this.state.setTypeAddress, this.state.setTypeSelect)
  }

  onCreateAddress()
  {
    this.props.createAddress()
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    let addressesList = null

    if (this.props.addresses) {
      addressesList = this.props.addresses.map(item => (
        <AddressRow key={item.address}>
          <Col md="5">
            <Link to={'/address/' + item.address}>{item.address}</Link>
          </Col>
          <Col md="2">{item.type}</Col>
          <Col md="2">{item.balance}</Col>
          <Col md="3">
            {item.sing}/{item.sed}
          </Col>
        </AddressRow>
      ))
    }

    return (
      <Container fluid={true}>
        <Row>
          <Col md="7">
            <ContainerBlock>
              <Row>
                <Col md="3">Block</Col>
                <Col md="8">#{this.props.blockHeight}</Col>
              </Row>
              <Row>
                <Col md="3">Total Supply</Col>
                <Col md="8">{this.props.blockHeight * 2}</Col>
              </Row>
              <Row>
                <Col md="3">Service Address</Col>
                <Col md="8">
                  <div>{this.props.serviceAddress}</div>
                </Col>
              </Row>
              <Row>
                <Col md="3">Service Balance</Col>
                <Col md="8">{this.props.serviceBalance}</Col>
              </Row>
            </ContainerBlock>

            <ContainerAddresses>
              <Row>
                <Col md="5">Address</Col>
                <Col md="2">Type</Col>
                <Col md="2">Balance</Col>
                <Col md="3">Sing/Sed</Col>
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
                  <Input
                    name="fromAddress"
                    value={this.state.fromAddress}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="3">To</Col>
                <Col md="9">
                  <Input
                    name="toAddress"
                    value={this.state.toAddress}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="3">Amount</Col>
                <Col md="9">
                  <Input
                    name="amount"
                    value={this.state.amount}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  <button onClick={this.onSend}>Send</button>
                </Col>
              </Row>
            </Container>

            {/* *************************************************** */}
            {/* Support */}
            {/* *************************************************** */}
            <h2>Support</h2>
            <Container>
              <Row>
                <Col md="3">From</Col>
                <Col md="9">
                  <Input
                    name="supportFromAddress"
                    value={this.state.supportFromAddress}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="3">To</Col>
                <Col md="9">
                  <Input
                    name="supportToAddress"
                    value={this.state.supportToAddress}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Row>

              <Row>
                <Col md="3">
                  <button onClick={this.onSupport}>Support</button>
                </Col>
                <Col md="3">
                  <button onClick={this.onRemoveSupport}>Remove Support</button>
                </Col>
              </Row>
            </Container>

            {/* *************************************************** */}
            {/* Change Type */}
            {/* *************************************************** */}
            <h2>Type</h2>
            <Container>
              <Row>
                <Col md="3">Address</Col>
                <Col md="9">
                  <Input
                    name="setTypeAddress"
                    value={this.state.setTypeAddress}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="3">Type</Col>
                <Col md="9">
                  <select name='setTypeSelect' value={this.state.setTypeSelect} onChange={this.handleInputChange}>
                    <option value="Supporter">Supporter</option>
                    <option value="Author">Author</option>
                    <option value="Generator">Generator</option>
                  </select>
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  <button onClick={this.onSetType}>Set Type</button>
                </Col>
              </Row>
            </Container>


            {/* *************************************************** */}
            {/* Create Address */}
            {/* *************************************************** */}
            <h2>Create Address</h2>
            <Container>
              <Row>
                <Col md="12">
                  <button onClick={this.onCreateAddress}>CreateAddress</button>
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
  const serviceAddress = info && info.get('serviceAddress')
  const serviceBalance = info && info.get('serviceBalance')

  return {
    addresses: addresses && addresses.toJS(),
    blockHeight: height && height - 1,
    serviceAddress,
    serviceBalance,
  }
}

const mapDispatchToProps = dispatch => ({
  loadAddresses() {
    dispatch(getAddressesAction())
  },

  send(addressFrom, addressTo, amount) {
    dispatch(sendAction(addressFrom, addressTo, amount))
  },

  support(addressFrom, addressTo) {
    dispatch(supportAction(addressFrom, addressTo))
  },
  
  removeSupport(addressFrom, addressTo) {
    dispatch(removeSupportAction(addressFrom, addressTo))
  },

  getInfo() {
    dispatch(getInfoAction())
  },

  setType(address, type) {
    dispatch(setTypeAction(address, type))
  },
  
  createAddress() {
    dispatch(createAddressAction())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FrontPage)
