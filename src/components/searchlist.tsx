import React from "react"
import { Input } from 'antd';
const { Search } = Input;

interface Iprops {
  getSearchList: (res: any) => any
}

export default class getSearchList extends React.Component<Iprops> {
  constructor(props: any) {
    super(props)
    this.state = {
      value : ''
    }
    this.getSearchList = this.getSearchList.bind(this)
  }
  // searchChange(e: any) {
  //   this.setState({
  //     value: e.target.value
  //   })
  // }
  getSearchList(value: any) {
    // console.log(value)
    if (!value) {
      alert("请输入要查找的内容！")
    }else{
      this.props.getSearchList(value)
    }
  }
  render() {
    return (
      <div className="search">
        <Search placeholder="input search text" onSearch={this.getSearchList} enterButton />
      </div>
    )
  }
}