import React from 'react'
import { connect } from 'react-redux'

import MUIContainer from 'muicss/lib/react/container'
import MUIRow from 'muicss/lib/react/row'
import MUICol from 'muicss/lib/react/col'

import styled from 'styled-components'

import {getTransactionsAction} from '../actions/actions'
import { routerActions } from 'connected-react-router';


const Container = styled(MUIContainer)``
const Row = styled(MUIRow)``
const Col = styled(MUICol)``

const ContainerItem = styled(MUIContainer)`
  padding:5px 0;
  border-bottom:1px solid #eee; 
`

class TransactionsPage extends React.Component {
  constructor(props) {
    super(props)

    let pathArray = window.location.pathname.split('/')

    this.state = {
      address: pathArray[pathArray.length - 1],
    }
  }

  componentDidMount()
  {
    this.props.getTransactions(this.state.address)
  }

  render() {

    let transactions = null
    if (this.props.transactions)
    {
      transactions = this.props.transactions.map(tx=>(
        <ContainerItem key={tx.id}>
          <Row>
            <Col md='3'>Txid</Col>
            <Col md='9'><div>{tx.id}</div></Col>
          </Row>
          <Row>
            <Col md='3'>BlockHeight</Col>
            <Col md='9'><div>{tx.blockHeight}</div></Col>
          </Row>

          <Row>
            <Col md='3'>addressFrom</Col>
            <Col md='9'><div>{tx.addressFrom}</div></Col>
          </Row>
          <Row>
            <Col md='3'>addressTo</Col>
            <Col md='9'><div>{tx.addressTo}</div></Col>
          </Row>
          <Row>
            <Col md='3'>amount</Col>
            <Col md='9'><div>{tx.amount}</div></Col>
          </Row>

        </ContainerItem>
      ))
    }


    return (
      <Container fluid={true}>
        <Row>
          <Col>Address: {this.state.address}</Col>
        </Row>
        <Row>
          <Col>Transactions:</Col>
        </Row>
        <Row>

            {transactions}

        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {

  const root = state && state.root
  const transactions = root && root.get('current')
  
  return { 
    transactions: transactions && transactions.toJS()
  }
}

const mapDispatchToProps = dispatch => ({

  getTransactions(address) {
    dispatch(getTransactionsAction(address))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionsPage)

