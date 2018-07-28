<template>
	<div id="app">
		<div id="cover"></div>
		<header-vue></header-vue>
		<todo-vue></todo-vue>
		<footer-vue></footer-vue>
	</div>
</template>

<script>
	/*引入头部组件*/
	import HeaderVue from './components/header.vue'

	/*引入中间组件*/
	import TodoVue from './components/todo.vue' 

	/*引入底部组件*/ 
	import FooterVue from './components/footer.jsx'

	export default {
		data () {
			return{

			}
		},
		components: {
			HeaderVue,
			FooterVue,
			TodoVue
		}
	}
</script>

<style lang="stylus" scoped>
	#app {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }

    #cover {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background rgba(153, 153, 153, .4)
        z-index -1
    }
</style>