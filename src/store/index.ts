import { observable, action, computed, toJS } from 'mobx'
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
  @observable task: string = ''
  @observable status: number = 0
  @observable actionStatus: string = ''
  @observable currentIndex: number = 0
  @observable actionList: Array<string> = []
  @observable actionId: Array<string> = []
  @observable actionUpdateContent: Array<string> = []
  @observable actionDelContent: Array<object> = []
  @action addItem(task: string) {
    const id = moment().format('HHmmss')
    this.id = id
    this.actionStatus = "addRunning" + id
    this.actionList = [...this.actionList, this.actionStatus]
    this.actionId = [...this.actionId, id]
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
    this.actionStatus = "deleteRunning" + taskId
    this.actionList = [...this.actionList, this.actionStatus]
    this.actionId = [...this.actionId, taskId]
    const index = this.todoList.findIndex(v => v.id === taskId)
    this.currentIndex = index
    this.taskId = taskId
    this.task = this.todoList[index].task
    this.status = this.todoList[index].status
    const currentDelContent = {id: this.taskId, task: this.task, status: this.status}
    this.actionDelContent = [...this.actionDelContent, currentDelContent]
    this.todoList = this.todoList.filter(v => v.id !== taskId)
  }
  @action updateItem({ content, taskId }: any) {
    this.actionStatus = "updateRunning" + taskId
    this.actionList = [...this.actionList, this.actionStatus]
    this.actionId = [...this.actionId, taskId]
    const index = this.todoList.findIndex(v => v.id === taskId)
    this.taskId = taskId
    this.content = this.todoList[index].task
    this.actionUpdateContent = [...this.actionUpdateContent, this.content]
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
  @action revokeAdd(taskId: any) {
    this.todoList = this.todoList.filter(v => v.id !== taskId)
  }
  @action revokeUpdate({ content, currentId }: any) {
    const index = this.todoList.findIndex(v => v.id === currentId)
    if (index !== -1) {
      this.todoList[index].task = content
    }
  }
  @action revokeDel(currentIndex: number) {
    const currentDelObject: {[key: string]: any} = this.actionDelContent.pop()!
    const newItem = {
      id: toJS(currentDelObject!.id!),
      task: toJS(currentDelObject!.task!),
      status: toJS(currentDelObject!.status!)
    }
    this.todoList.splice(currentIndex, 0, newItem)
  }
  @computed
  get getSearchList() {
    return this.todoList.filter(v => v.task.includes(this.keywords.toLowerCase()))
  }
}

const store = new AppStore()

export default store
