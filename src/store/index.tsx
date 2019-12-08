import { observable, action, computed } from 'mobx'
import moment from 'moment'

class AppStore {
  // @observable todoLists = []
  // @observable time = '2019.12.8'
  // @computed get desc() {
  //   return `${this.time} 还有${this.todoLists.length}条任务待完成`
  // }
  // @action addTodo(e: never) {
  //   this.todoLists.push(e)
  //   console.log('add')
  // }
  // @action deleteTodo() {
  //   this.todoLists.pop()
  //   console.log('del')
  // }
  // @action resetTodo() {
  //   this.todoLists = []
  //   console.log('reset')
  // }
  // @action getNow() {
  //   this.time = moment().format('YYYY-MM-DD HH:mm:ss')
  // }
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
      id: '2',
      task: "Mobx",
      status: 0
    }
  ]
  @action addItem(task: any) {
    // console.log(e)
    if (!task) {
      alert("内容不能为空")
    } else {
      // let { todoList } = store.todoList
      const newItem = {
        id: '1',
        task,
        status: 0
      }
      store.todoList.push(newItem)
      // console.log(this.todoList)
    }
  }
}

const store = new AppStore()
// setInterval(() => { 
//   store.getNow()
// },1000)

export default store
