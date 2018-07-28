import Vue from 'vue'
import App from './app.vue'

/*引入全局css样式*/ 
import './assets/style/global.styl'

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
	render: c => c(App)
}).$mount(root);