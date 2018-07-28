<template>
	<section class="real-app">
		<input
			type="text"
			class="add-input"
			autofocus="autofocus"
			placeholder="接下去要做什么"
			@keyup.enter="addTodo"
		>
		<!-- 使用items组件 -->
		<!-- 
			:todo="todo" 往子组件item.vue 传入todo对象
			v-for="todo in filteredTodos"遍历todos数组
			@del="deleteTodo" 接收子组件要触发的del方法
		 -->
		<items-vue
			:todo="todo"
			v-for="todo in filteredTodo"
			:key="todo.id"
			@del="deleteTodo"
		/>
		<!-- 用key管理可复用的元素 -->
		<!-- 
			Vue会尽可能高效的渲染元素 通常会复用已有元素而不是从头开头渲染。
		 -->
		<tabs-vue
			:filter="filter"
			:todos="todos"
			@toggle="toggleFilter"
			@clearAllCompleted="clearAllCompleted"
		/>
	</section>

</template>

<script>
	/*引入循环数据显示组件*/
	import ItemsVue from './items.vue';

	/*引入按钮组件*/
	import TabsVue from './tabs.vue' ;

	let id = 0;
	export default {
		data () {
			return{
				todos: [],
				filter: 'all'
			}
		},
		components: {
			ItemsVue,
			TabsVue
		},
		computed: {
			// filteredTodo 计算属性 判断传递多来的filter状态，如果为'all'，则直接返回todos,否则需要做todos的数据处理，filter()遍历筛选符合条件的数据，返回需要的数据成为新的数组。

			filteredTodo(){
				if(this.filter === 'all'){
					return this.todos
				}
				const completed = this.filter === 'completed';
				return this.todos.filter(todo => completed === todo.completed)
			}
		},
		methods: {
			addTodo(e) {
				this.todos.unshift({
					id: id++,
					content: e.target.value.trim(),
					completed: false
				})
				e.target.value = ''
			},
			deleteTodo(id){
				this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
			},
			toggleFilter(state){
				this.filter = state
			},
			clearAllCompleted(){
				this.todos = this.todos.filter(todo => !todo.completed)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.real-app {
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }

    .add-input {
        position relative
        margin 0
        width 100%
        font-size 24px
        font-family inherit
        font-weight inherit
        line-height 1.4em
        border 0
        outline none
        color inherit
        box-sizing border-box
        font-smoothing antialiased
        padding 16px 16px 16px 36px
        border none
        box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)
    }
</style>