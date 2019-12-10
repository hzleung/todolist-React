import React from "react";
import { inject, observer } from 'mobx-react'
import _store from '../store';
import { Row, Col, Checkbox, Button, Modal, Input } from 'antd';
// import { string } from "prop-types";
const { TextArea } = Input;

interface Iprops {
  key: any
  task: any
  taskId: any,
  status: number
}

interface ITodoItemState {
  content: string
  visible: boolean
}

@inject('store') @observer
export default class TodoItem extends React.Component<Iprops, ITodoItemState> {
  state: ITodoItemState = {
    content: '',
    visible: false
  }
  // delete item
  onDeleteItem = () => {
    const { taskId } = this.props;
    _store.deleteItem(taskId)
  }

  confirm = () => {
    const { taskId } = this.props
    const { content } = this.state
    _store.updateItem({content, taskId})
    this.setState({
      visible: false,
      content: ''
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  // update item
  updateItem = () => {
    this.setState({
      visible: true,
    })
  }
  updateContent = (e: any) => {
    const { value } = e.target;
    this.setState({
      content: value
    })
  }
  render() {
    let task = this.props.task
    return (
      <li className="list-group-item">
        <Row>
          <Col span={12} style={{ textAlign: "left" }}>
            <Checkbox /> {task}
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Button type="danger" className="pull-right" onClick={this.onDeleteItem} style={{ marginRight: 10 }}>删除</Button>
            <Button type="primary" className="pull-right" onClick={this.updateItem}>修改</Button>
            <Modal
              title="更新内容"
              visible={this.state.visible}
              onOk={this.confirm}
              onCancel={this.handleCancel}
            >
              <TextArea
                rows={2}
                value={this.state.content}
                onChange={this.updateContent}
                placeholder="请输入要修改的内容!"
              />
            </Modal>
          </Col>
        </Row>
      </li>
    )
  }
}