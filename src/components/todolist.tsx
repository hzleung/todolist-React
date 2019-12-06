import React from 'react';
import TodoItem from './todoItem'
import { ITodoItem } from './todoBox'

interface Iprops {
  onDeleteItem: (res: any) => any
  handleUpdateItem: (res: any) => any
  data: ITodoItem[]
}

export default class TodoList extends React.Component<Iprops> {
  constructor(props: any) {
    super(props)
  }
  render() {
    const { data } = this.props;

    return (
      <ul className="list-group">
        {
          data.map((listItem, index) =>
            <TodoItem
              {...listItem}
              taskId={listItem.id}
              key={index}
              onDeleteItem={this.props.onDeleteItem}
              handleUpdateItem={this.props.handleUpdateItem} />
          )
        }
      </ul>
    )
  }
}