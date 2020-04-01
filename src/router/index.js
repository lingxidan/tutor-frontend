import Vue from 'vue'
import Router from 'vue-router'
// import app from '../App.vue'
import front from '../frontApp.vue'
import back from '../backApp.vue'

// 网站页面
import main from '../pages/webInfo/main.vue'
import search from '../pages/webInfo/search.vue'
import chat from '../pages/webInfo/chat.vue'
import webUser from '../pages/webInfo/user.vue'
// user
import login from '../pages/user/login.vue'
import registe from '../pages/user/registe.vue'
// 招募者
import recruiter from '../pages/user/recruiter/user.vue'
import selfRecruiter from '../pages/user/recruiter/selfInfo.vue'
import recrInfo from '../pages/user/recruiter/info-recr'
// 志愿者
import volunteer from '../pages/user/volunteer/user.vue'
import selfVolunteer from '../pages/user/volunteer/selfInfo.vue'
import volInfo from '../pages/user/volunteer/info-vol'
// 学校
import recruiterSchool from '../pages/school/schoolList'
import schoolInfo from '../pages/school/info-school'
// 招募岗位
import recruiterJob from '../pages/jobInfo/zhiwei'
import jobInfo from '../pages/jobInfo/info-job'
// 收藏关注
import recuriterInterest from '../pages/interest/interestList'
// 评论
import commentList from '../pages/comment/commentList'
// 帖子
import postInfo from '../pages/postInfo/info-post'
import postList from '../pages/postInfo/postList'
// 文章
import articleInfo from '../pages/article/info-article'
import articleList from '../pages/article/articleList'
// // 个人信息页
// import user from '../pages/user/user'
// import selfVol from '../pages/user/self-volunteer'
// import selfSch from '../pages/user/school/self-school'
// import schInfo from '../pages/user/school/school'
// import zhiweiInfo from '../pages/user/school/zhiwei'
// import schUser from '../pages/user/school/selfInfo'

// import lunbo from '../components/common/carousel'

// import fileUpload from '../pages/user/uploadFile'
// // import topNav from '../components/common/nav'

// 后台数据管理
import backLogin from '../pages/manager/login.vue'
import backSchool from '../pages/manager/tableInfo/school.vue'
import backZhiwei from '../pages/manager/tableInfo/zhiwei.vue'
import backVolunteer from '../pages/manager/tableInfo/volunteer.vue'
import backRecruiter from '../pages/manager/tableInfo/recruiter.vue'
import backArticles from '../pages/manager/tableInfo/articles.vue'
import backPosts from '../pages/manager/tableInfo/posts.vue'

Vue.use(Router)

const router = new Router({
    // mode:"history",
    // base:"shizheFront",
    routes: [
        {
            // 主页
            path: '/',
            name: 'front',
            component: front,
            children:[
				{
                    // 主页
                    path: '',
                    name: 'frontMain',
                    component: main,
                },
                {
                    path: '/user',
                    name: 'webUser',
                    component: webUser,
                    children:[{
                        path: 'recr',
                        name: 'recruiter',
                        component: recruiter,
                        children:[
                            {
                                // 个人信息页面
                                path: 'recruiter',
                                name: 'recrShow',
                                component: selfRecruiter
                            },
                            {
                                // 管理学校
                                path: 'school',
                                name: 'recrSchool',
                                component: recruiterSchool
                            },
                            {
                                // 管理岗位
                                path: 'job',
                                name: 'recrJob',
                                component: recruiterJob
                            },
                            {
                                // 收藏关注列表
                                path: 'interest',
                                name: 'recrInterest',
                                component: recuriterInterest
                            },
                            {
                                path: 'comment',
                                name: 'recrCommentList',
                                component: commentList
                            },
                            {
                                path: 'postList',
                                name: 'rectPostList',
                                component: postList
                            },
                            {
                                path: 'articleList',
                                name: 'rectArticleList',
                                component: articleList
                            },
                            {
                                path: 'chat',
                                name: 'rectChat',
                                component: chat
                            },
                        ]
                    },
                    {
                        path: 'vol',
                        name: 'volunteer',
                        component: volunteer,
                        children:[
                            {
                                // 个人信息页面
                                path: 'volunteer',
                                name: 'volShow',
                                component: selfVolunteer
                            },
                            {
                                // 收藏关注列表
                                path: 'interest',
                                name: 'volInterest',
                                component: recuriterInterest
                            },
                            {
                                path: 'comment',
                                name: 'volCommentList',
                                component: commentList
                            },
                            {
                                path: 'postList',
                                name: 'volPostList',
                                component: postList
                            },
                            {
                                path: 'articleList',
                                name: 'volArticleList',
                                component: articleList
                            },
                            {
                                path: 'chat',
                                name: 'volChat',
                                component: chat
                            },
                        ]
                    },]
                },
				{
                    // 主页
                    path: 'school',
                    name: 'schoolInfo',
                    component: schoolInfo,
                },
				{
                    // 主页
                    path: 'job',
                    name: 'jobInfo',
                    component: jobInfo,
                },
				{
                    // 主页
                    path: 'article',
                    name: 'articleInfo',
                    component: articleInfo,
                },
				{
                    // 主页
                    path: 'post',
                    name: 'postInfo',
                    component: postInfo,
                },
				{
                    // 主页
                    path: 'recruiter',
                    name: 'recrInfo',
                    component: recrInfo,
                },
				{
                    // 主页
                    path: 'volunteer',
                    name: 'volInfo',
                    component: volInfo,
                },
				{
                    // 主页
                    path: 'search',
                    name: 'search',
                    component: search,
                },
                
                
            ]
        },
        {
            // 登录
            path: '/login',
            name: 'login',
            component: login
        },
        {
            // 注册招募页面
            path: '/registe/recruiter',
            name: 'registeRecruiter',
            component: registe
        },
        {
            // 注册志愿者页面
            path: '/registe/volunteer',
            name: 'registeVolunteer',
            component: registe
        },
        {
            // 后台管理系统登录
            path: '/back',
            name: 'back',
            component: backLogin
        },
        {
            // 主页
            path: '/manager',
            name: 'manager',
            component: back,
            children:[
                {
                    path: 'school',
                    name: 'backSchool',
                    component: backSchool
                },
                {
                    path: 'zhiwei',
                    name: 'backZhiwei',
                    component: backZhiwei,
                },
                {
                    path: 'volunteer',
                    name: 'backVolunteer',
                    component: backVolunteer
                },
                {
                    path: 'recruiter',
                    name: 'backRecruiter',
                    component: backRecruiter,
                },
                {
                    path: 'articles',
                    name: 'backArticles',
                    component: backArticles
                },
                {
                    path: 'posts',
                    name: 'backPosts',
                    component: backPosts,
                },
            ]
        },
    ]
});
export default router;