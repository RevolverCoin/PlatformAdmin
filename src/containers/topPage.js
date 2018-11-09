import React from 'react'
import { connect } from 'react-redux'

import MUIContainer from 'muicss/lib/react/container'
import MUIRow from 'muicss/lib/react/row'
import MUICol from 'muicss/lib/react/col'

import styled from 'styled-components'

import { getTopAction } from '../actions/actions'

const Container = styled(MUIContainer)``
const Row = styled(MUIRow)``
const Col = styled(MUICol)``

const ContainerItem = styled(MUIContainer)`
  padding: 5px 0;
  border-bottom: 1px solid #eee;
`

class TopPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.props.getTop()
  }

  render() {
    let data = null

    if (this.props.data) {
      data = this.props.data.map((item, id) => (
        <Row key={id}>
          <Col md='2'>{id}</Col>
          <Col md='5'>{item.address}</Col>
          <Col md='2'>{item.supportCount}</Col>
        </Row>
      ))
    }

    return (
      <Container fluid={true}>
        <Row>
          <Col  md='2'>#</Col>
          <Col  md='5'>Address</Col>
          <Col  md='2'>Supports</Col>
        </Row>
        {data}
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const root = state && state.root
  const data = root && root.get('top')

  return {
    data: data && data.toJS(),
  }
}

const mapDispatchToProps = dispatch => ({
  getTop() {
    dispatch(getTopAction())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopPage)
