import React from 'react'
import { Form, Input, Button } from 'antd';

interface Iprops {
  onSaveItem: (res: any) => any
}

export default class AddItem extends React.Component <Iprops> {
  constructor(props:any) {
    super(props)
    this.state = {
      value : ''
    }
    this.onSaveItem = this.onSaveItem.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  readonly state = {
    value: ''
  }
  handleChange(e: any) {
    this.setState({
      value: e.target.value
    })
  }
  onSaveItem() {
    const element = this.state.value
    if (!element) {
      alert('内容不能为空！')
    }else{
      this.props.onSaveItem(element)
    }
    this.setState({
      value: ''
    })
  }
  render() {
    return (
      <div className="additem">
        <Form>
          <label htmlFor="newItem"></label>
          <Input id="newItem" type="text" placeholder="输入内容" style={{ width: 335 }} value={this.state.value} onChange={this.handleChange}></Input>
          <Button type="primary" className="full-right" onClick={this.onSaveItem}>保存</Button>
        </Form>
      </div>
    )
  }
}