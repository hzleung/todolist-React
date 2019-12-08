import React from 'react'
import { Form, Input, Button } from 'antd';
import { inject, observer } from 'mobx-react'
import store from '../store';
import { log } from 'util';

interface Iprops {
  // onSaveItem: (res: any) => any
  store: any
}

@inject('store') @observer
export default class AddItem extends React.Component<Iprops> {
  constructor(props: any) {
    super(props)
    this.state = {
      value: ''
    }
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
  // onSaveItem() {
  //   const element = this.state.value
  //   if (!element) {
  //     alert('内容不能为空！')
  //   } else {
  //     this.props.onSaveItem(element)
  //   }
  //   this.setState({
  //     value: ''
  //   })
  // }

  onSaveItem(e: any) {
    let { store } = this.props
    const val = this.state.value
    // console.log(val)
    switch (e) {
      case 'add':
        store.addItem(val)
        break;
    
      default:
        break;
    }
    let { todoList } = store.todoList
    // console.log(store.todoList)
    this.setState({  todoList });
  }



  // mobx
  // handleTodoLists(e: any) {
  //   let { store } = this.props
  //   switch (e) {
  //     case 'add':
  //       store.addTodo('1')
  //       break
  //     case 'del':
  //       store.deleteTodo()
  //       break
  //     case 'reset':
  //       store.resetTodo()
  //       break
  //     default:
  //   }
  // }
  render() {
    // let { store } = this.props
    // {/* <div>{store.desc}</div>
    // <h1>这是Mobx示例</h1>
    // <Button type="primary" onClick={this.handleTodoLists.bind(this, 'add')}>+1</Button>
    // <Button type="primary" onClick={this.handleTodoLists.bind(this, 'del')}>-1</Button>
    // <Button type="primary" onClick={this.handleTodoLists.bind(this, 'reset')}>重置</Button>
    // {store.todoLists.map((element: any, index: any, arr: any) => {
    //   return (
    //     <div key={index}>{element}</div>
    //   )
    // })} */}
    return (
      <div className="additem">
        <Form>
          <label htmlFor="newItem"></label>
          <Input id="newItem" type="text" placeholder="输入内容" style={{ width: 335 }} value={this.state.value} onChange={this.handleChange}></Input>
          <Button type="primary" className="full-right" onClick={this.onSaveItem.bind(this, 'add')}>保存</Button>
        </Form>
      </div>
    )
  }
}