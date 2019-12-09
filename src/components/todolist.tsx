import React from 'react';
import TodoItem from './todoItem'
import _store from '../store';
import { inject, observer } from 'mobx-react'


@inject('store')
@observer
export default class TodoList extends React.Component {
  renderList(data: any, keywords: string) {
    if (!data.length && keywords) {
      return <div>没找到{keywords}</div>
    }
    return( <ul className="list-group">
    {
      data.map((listItem: any, index: number) =>
        <TodoItem
          {...listItem}
          taskId={listItem.id}
          key={index} />
      )
    }
  </ul>)
  }
  render() {
    const { todoList, keywords, getSearchList } = _store;
    const data = keywords ? getSearchList : todoList
    return (
      <div> 
        {this.renderList(data, keywords)}
      </div>
    )
  }
}