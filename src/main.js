import Vue from 'vue'
import Vuex from 'vuex'
import store from './vuex/store.js'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import '../static/theme/index.css';
import '../static/css/common.css';
import '../static/icon/iconfont.css';

// 引用API文件
import request from './request/api.js'
// 将API方法绑定到全局
Vue.prototype.$request = request
Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    // components: { App },
    // template: '<App/>',
    render: h => h(App)
})