import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home/homeMain'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/Home'),
    children: [
      {
        path: '/home/homeMain',
        name: 'HomeMain',
        component: () => import('../views/home/homeMain')
      },
      {
        path: '/share',
        name: 'share',
        component: () => import('../views/share/share')
      },
      {
        path: '/reward',
        name: 'reward',
        component: () => import('../views/reward/reward')
      },
      {
        path: '/friendslink',
        name: 'friendslink',
        component: () => import('../views/friendslink/friendslink')
      },
      {
        path: '/message',
        name: 'message',
        component: () => import('../views/message/message')
      },
      {
        path: '/aboutme',
        name: 'aboutme',
        component: () => import('../views/aboutme/aboutme')
      },
      {
        path: '/detail/:id', //文章
        name: 'detail',
        component: () => import('../views/detail/detail'),
      },
      
    ]
  },
  {
    path: '/logn',
    name: 'logn',
    component: () => import('../views/logn/logn')
  },
  {
    path: '/articleList',
    name: 'ArticleList',
    component: () => import('../views/back/ArticleList')
    
  },
  {
    path: '/admin/edit',
    name: 'ArticleEdit',
    component: () => import('../views/back/ArticleEdit')
    
  },
  {
    path: '/admin/edit/:id',
    name: 'ArticleEdit',
    component: () => import('../views/back/ArticleEdit')
    
  },
  {
    path: '/tourist',
    name: 'tourist',
    component: () => import('../views/tourist/tourist')
  }

]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savePosition) { // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
		if (savePosition) {
			return savePosition;
		} else {
            var top;
            if (window.innerWidth >= 700) {
                 top = 676
            } else {
                 top = 267
            }
			return {
				x: 0,
				y: top
			}
		}
	},
})

export default router
