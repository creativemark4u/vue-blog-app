import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login';
import Signup from './views/Signup';
import Home from './views/Home';
import ArticleDetail from './views/ArticleDetail';
import CreateArticle from './views/CreateArticle';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [{
        path: '/login', 
        component: Login
    }, {
        path: '/signup', 
        component: Signup
    }, {
        path: '/home', 
        component: Home
    }, {
        path: '/article/:id', 
        component: ArticleDetail
    }, {
        path: '/articles/create', 
        component: CreateArticle
    }]
});

export default router;