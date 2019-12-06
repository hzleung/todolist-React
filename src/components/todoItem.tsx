import React from 'react';
import { Row, Col, Checkbox, Button, Modal, Input, message } from 'antd';
const { TextArea } = Input;

interface Iprops {
  onDeleteItem: (res: any) => any
  handleUpdateItem: (res: any) => any
  key: any
  task: any
  taskId: any,
  status: number
}

interface ITodoItemState {
  content: string
  visible: boolean
}


export default class TodoItem extends React.Component<Iprops, ITodoItemState> {
  state: ITodoItemState = {
    content: '',
    visible: false
  }

  constructor(props: any) {
    super(props)
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.confirm = this.confirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  // delete item
  onDeleteItem() {
    this.props.onDeleteItem(this.props.taskId)
  }

  confirm () {
    const content = this.state.content
    if (!content) {
      message.error('请输入内容');
      return;
    }else{
      this.props.handleUpdateItem({
        value: content,
        id: this.props.taskId
      })
      this.setState({
        visible: false,
        content: ''
      });
    }
  };

  handleCancel() {
    this.setState({
      visible: false,
    });
  };
  // update item
  updateItem() {
    this.setState({
      visible: true,
    })
  }
  updateContent(e: any) {
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