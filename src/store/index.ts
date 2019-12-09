import { observable, action, computed } from 'mobx'
import { message } from 'antd';
import moment from 'moment'

class AppStore {
  @observable todoList = [
    {
      id: '1',
      task: "React",
      status: 0
    },
    {
      id: '2',
      task: "TypeScript",
      status: 0
    },
    {
      id: '3',
      task: "Ant Design",
      status: 0
    },
    {
      id: '4',
      task: "Mobx",
      status: 0
    }
  ]
  @observable keywords: string = ''
  @observable id: string = ''
  @observable taskId: string = ''
  @observable content: string = ''
  // @observable task: string = ''
  // @observable status: number = 0
  @action addItem(task: string) {
    const id =  moment().format('HHmmss')
    this.id = id
    if (!task) {
      alert("内容不能为空")
    } else {
      const newItem = {
        id,
        task,
        status: 0
      }
      this.todoList = [...this.todoList, newItem]
    }
  }
  @action deleteItem(taskId: any) {
    // const index = this.todoList.findIndex(v => v.id === taskId)
    // this.taskId = taskId
    // this.task = this.todoList[index].task
    // this.status = this.todoList[index].status
    this.todoList = this.todoList.filter(v => v.id !== taskId)
  }
  @action updateItem({content, taskId}: any) {
    const index = this.todoList.findIndex(v => v.id === taskId)
    this.taskId = taskId
    this.content = this.todoList[index].task
    if (!content) {
      message.error('请输入内容');
      return;
    } else {
      if (index !== -1) {
        this.todoList[index].task = content
      }
    }
  }
  @action setKeyword(keywords: string) {
    this.keywords = keywords
  }
  @action revokeUpdate({content, taskId}: any) {
    const index = this.todoList.findIndex(v => v.id === taskId)
      if (index !== -1) {
        this.todoList[index].task = content
      }
  }
  @action revokeDel(taskId: any) {
    console.log(this.taskId)
  //   console.log(this.task)
  //   console.log(this.status)
  //   const newItem = {
  //     id: this.taskId,
  //     task: this.task,
  //     status: this.status
  //   }
  //   this.todoList = [...this.todoList, newItem]
  }
  @computed
  get getSearchList() {
    return this.todoList.filter(v => v.task.includes(this.keywords.toLowerCase()))
  }
}

const store = new AppStore()

export default store
