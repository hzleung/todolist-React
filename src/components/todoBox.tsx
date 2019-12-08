import React from 'react';
import TodoList from './todolist'
import AddItem from './addItem'
import SearchList from './searchlist'
import '../css/todoBox.css';
import { Provider } from 'mobx-react'
import store from '../store/index'

enum todoState {
  runing,
  stop,
  finish
}

export type ITodoItem = {
  task: string;
  id: string;
  status: todoState
}

interface ITodoBoxProps {
  newItem?: any
}

interface ITodoBoxState {
  todoList: ITodoItem[];
}

export default class TodoBox extends React.Component<ITodoBoxProps, ITodoBoxState> {
  state: ITodoBoxState = {
    todoList: [
      {
        id: '1',
        task: "React",
        status: todoState.stop
      },
      {
        id: '2',
        task: "TypeScript",
        status: todoState.finish
      },
      {
        id: '3',
        task: "Ant Design",
        status: todoState.stop
      },
      {
        id: '2',
        task: "Mobx",
        status: todoState.finish
      }
    ]
  }

  getItemId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  // TODO 检查空值 debouns
  // onAddTodoItem = (task: string) => {
  //   let { todoList } = this.state
  //   const newItem: ITodoItem = {
  //     id: this.getItemId(),
  //     task,
  //     status: 0
  //   }
  //   todoList.push(newItem)
  //   this.setState({ todoList });
  // }

  onTaskDelete = (taskId: string) => {
    const { todoList } = this.state;
    this.setState({ todoList: todoList.filter(v => v.id !== taskId) })
  }
  // 另一种插入的方法，可能是更合理的方案
  // onSearch(value:any) {
  //   let data = this.state.data
  //   // data.push(value)
  //   // data = data.filter(task => task = value)
  //   const has = data.some(v => v === value)
  //   if (!has) {
  //     data.push({id: this.getItemId(), task: value, status: 0})
  //     this.setState({data})
  //   }
  // }
  onSearch = (val: string) => {
    const { todoList } = this.state;
    this.setState({ todoList: todoList.filter(v => v.task.includes(val)) })
  }
  // updateItem
  updateItem = ({ value, id }: any) => {
    const { todoList } = this.state;
    const index = todoList.findIndex(v => v.id === id)
    if (index !== -1) {
      todoList[index].task = value
      this.setState({ todoList })
    }
  }

  render() {
    const { todoList } = this.state;
    return (
      <div>
        <Provider store={store}>
          <SearchList getSearchList={this.onSearch} />
          <TodoList data={todoList} onDeleteItem={this.onTaskDelete} handleUpdateItem={this.updateItem} />
          <AddItem store={store}/>
        </Provider>
      </div>
    )
  }
}