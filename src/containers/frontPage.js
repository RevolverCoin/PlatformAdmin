import React from 'react'
import { connect } from 'react-redux'

import MUIContainer from 'muicss/lib/react/container'
import MUIRow from 'muicss/lib/react/row'
import MUICol from 'muicss/lib/react/col'

import styled from 'styled-components'

import { getAddressesAction } from '../actions/actions'

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

class FrontPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadAddresses()
  }

  render() {
    let addressesList = null

    if (this.props.addresses) {
      addressesList = this.props.addresses.map(item => (
        <Row key={item.address}>
          <Col md="8">{item.address}</Col>
          <Col md="2">{item.type}</Col>
          <Col md="2">{item.balance}</Col>
        </Row>
      ))
    }

    return (
      <Container fluid={true}>
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
            <Col md="8">Address</Col>
            <Col md="2">Type</Col>

            <Col md="2">Balances</Col>
          </Row>

          {addressesList}

        </ContainerAddresses>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const root = state && state.root
  const addresses = root && root.get('addresses')
  return { addresses: addresses && addresses.toJS() }
}

const mapDispatchToProps = dispatch => ({
  loadAddresses() {
    dispatch(getAddressesAction())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FrontPage)
