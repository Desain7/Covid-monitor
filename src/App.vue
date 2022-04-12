<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <TodoAdd :addTodo='addTodo'></TodoAdd>
        <TodoList :todos="todos" :addTodo='addTodo' :deleteItem='deleteItem' :changeChecked="changeChecked"></TodoList>
        <TodoBottom :todos='todos' v-if='todos.length'></TodoBottom>
      </div>
    </div>
  </div>
</template>

<script>

import TodoAdd from './components/TodoAdd.vue'
import TodoList from './components/TodoList.vue'
import TodoBottom from './components/TodoBottom.vue'

export default {
  name:'App',
  data() {
    return{
      todos:[
        {id:'001', title:'上课', isChecked:true},
        {id:'002', title:'吃饭', isChecked:false},
        {id:'003', title:'学习', isChecked:false}
      ]
    }
  },
  methods: {
    addTodo(todoObj) {
      this.todos.unshift(todoObj)
    },
    deleteItem(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
    changeChecked(id) {
      this.todos.forEach(todo => {
        if(todo.id === id) todo.isChecked = !todo.isChecked
      });
    },
  },
  components:{
    TodoAdd,
    TodoList,
    TodoBottom
    
  }
}
</script>

<style>
  #root{
    margin: 0 auto;
    width: 400px;
  }
  /*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

</style>