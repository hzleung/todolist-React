import React from 'react'
import { Form, Input, Button } from 'antd';
import { inject, observer } from 'mobx-react'
import _store from '../store';


@inject('store') @observer
export default class AddItem extends React.Component {
  readonly state = {
    value: '',
    val: ''
  }
  handleChange = (e: any) => {
    this.setState({
      value: e.target.value
    })
  }

  onSaveItem = () => {
    const val = this.state.value
    this.state.val = val
    _store.addItem(val)
    this.setState({ value: '' })
  }

  handleRevoke = () => {
    _store.deleteItem(_store.id)
    const content = _store.content
    const taskId = _store.taskId
    _store.revokeUpdate({content, taskId})
    _store.revokeDel(taskId)
  }
  render() {
    return (
      <div className="additem">
        <Form>
          <label htmlFor="newItem"></label>
          <Input id="newItem" type="text" placeholder="输入内容" style={{ width: 252,marginRight: 10 }} value={this.state.value} onChange={this.handleChange}></Input>
          <Button type="primary" className="full-right" onClick={this.onSaveItem} style={{ marginRight: 10 }}>保存</Button>
          <Button type="primary" className="full-right" onClick={this.handleRevoke}>撤销</Button>
        </Form>
      </div>
    )
  }
}