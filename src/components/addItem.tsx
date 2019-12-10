import React from 'react'
import { Form, Input, Button } from 'antd';
import { inject, observer } from 'mobx-react'
import _store from '../store';


@inject('store') @observer
export default class AddItem extends React.Component {
  readonly state = {
    value: ''
  }
  handleChange = (e: any) => {
    this.setState({
      value: e.target.value
    })
  }

  onSaveItem = () => {
    const val = this.state.value
    _store.addItem(val)
    this.setState({ value: '' })
  }

  handleRevoke = () => {
    const currentValue = _store.actionList.pop()
    const currentId = _store.actionId.pop()
    if (currentValue === 'addRunning' + currentId) {
      _store.revokeAdd(currentId)
    } else if (currentValue === 'deleteRunning' + currentId) {
      _store.revokeDel(_store.currentIndex)
    } else if (currentValue === 'updateRunning' + currentId) {
      const currentUpdateContent = _store.actionUpdateContent.pop()
      const content = currentUpdateContent
      _store.revokeUpdate({ content, currentId })
    }
  }
  render() {
    return (
      <div className="additem">
        <Form>
          <label htmlFor="newItem"></label>
          <Input id="newItem" type="text" placeholder="输入内容" style={{ width: 352, marginRight: 10 }} value={this.state.value} onChange={this.handleChange}></Input>
          <Button type="primary" className="full-right" onClick={this.onSaveItem} style={{ marginRight: 10 }}>保存</Button>
          <Button type="primary" className="full-right" onClick={this.handleRevoke}>撤销</Button>
        </Form>
      </div>
    )
  }
}