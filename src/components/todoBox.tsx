import React from 'react';
import TodoList from './todolist'
import AddItem from './addItem'
import SearchList from './searchlist'
import '../css/todoBox.css';
import { Provider } from 'mobx-react'
import store from '../store/index'

export default class TodoBox extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <SearchList />
          <TodoList />
          <AddItem />
        </Provider>
      </div>
    )
  }
}