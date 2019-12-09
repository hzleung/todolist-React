import React from "react"
import _store from '../store';
import TodoList from './todolist'
import { Input } from 'antd';
const { Search } = Input;

interface Iprops {
  // getSearchList: (res: any) => any
  // list: any
}

export default class getSearchList extends React.Component<Iprops> {
  constructor(props: any) {
    super(props)
    this.state = {
      value: ''
    }
  }
  searchChange = (e: any) => {
    this.setState({
      value: e.target.value
    })
    _store.setKeyword(e.target.value)
  }
  getSearchList = (value: any) => {
    _store.setKeyword(value)
  }
  render() {
    return (
      <div className="search">
        <Search placeholder="input search text" onSearch={this.getSearchList} onChange={this.searchChange} enterButton />
      </div>
    )
  }
}