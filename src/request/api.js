import http from './http.js'
// 用户
const USER_URL = {
	REGISTERECRUITER:'/api/user/registeRecruiter',
	REGISTEVOLUNTEER:'/api/user/registeVolunteer',
	LOGIN:'/api/user/login',
	GETVOLUNTEER:'/api/user/getVolunteer',
	EDITVOLUNTEER:'/api/user/editVolunteer',
	GETRECRUITER:'/api/user/getRecruiter',
	EDITRECRUITER:'/api/user/editRecruiter',
	GETUSER:'/api/user/getUser'
	// TEST: 'http://localhost:8081/api/get',
	// EMAIL: 'http://localhost:8081/api/email',

	// JOB_SELECTBYID:'/api/job/selectById',

	// // 简历文件
	// FILE_UPLOAD:'/api/file/upload',
	// FILE_SELECTBYID:'/api/file/selectById',
	// FILE_SELECTBYCOND:'/api/file/selectByCondition'
}
// 数据字典
const DATADICT_URL={
	SELECTADDRESS:'/api/datadict/selectAddress',
	SELECTJOBTYPE:'/api/datadict/selectJobtype',
	SELECTLICENSE:'/api/datadict/selectLicense',
	SELECTTRADE:'/api/datadict/selectTrade'
}
// 文章
const ARTICLE_URL={
	INSERT:'/api/article/insertArticle',
	SELECTBYCONDITON:'/api/article/selectByCondition',
	SELECTBYID:'/api/article/selectById',
	UPDATE:'/api/article/updateArticle'
}
// 资格证书
const CERTIFICATE_URL={
	INSERT:'/api/certificate/insertCertificate',
	SELECTBYCONDITON:'/api/certificate/selectByCondition',
	UPDATE:'/api/certificate/updateCertificate'
}
// 聊天
const CHAT_URL={
	INSERT:'/api/chat/insertChat',
	SELECTBYFROMTO:'/api/chat/selectByFromTo',
	SELECTLASTCHATS:'/api/chat/selectLastChats'
}
// 评论
const COMMENT_URL={
	INSERT:'/api/comment/insertComment',
	SELECTBYCONDITON:'/api/comment/selectByCondition',
	SELECTBYID:'/api/comment/selectById',
	UPDATE:'/api/comment/updateComment'
}
// 社交主页
const CONTACT_URL={
	INSERT:'/api/contact/insertContact',
	SELECTBYCONDITON:'/api/contact/selectByCondition',
	UPDATE:'/api/contact/updateContact'
}
// 期望岗位
const EXPECTJOB_URL={
	INSERT:'/api/expectJob/insertExpectJob',
	SELECTBYCONDITON:'/api/expectJob/selectByCondition',
	UPDATE:'/api/expectJob/updateExpectJob',
	DELETE:'/api/expectJob/deleteExpectJob'
}
// 工作经历
const EXPERIENCE_URL={
	INSERT:'/api/experience/insertExperience',
	SELECTBYCONDITON:'/api/experience/selectByCondition',
	UPDATE:'/api/experience/updateExperience',
	DELETE:'/api/experience/deleteExperience'
}
// 文件
const FILE_URL={
	UPLOAD:'/api/file/upload',
	SELECTBYCONDITON:'/api/file/selectByCondition',
	SELECTBYID:'/api/file/selectById',
	UPDATE:'/api/file/updateFile',
	DELETE:'/api/file/deleteFile'
}
// 收藏关注
const INTEREST_URL={
	INSERT:'/api/interest/insertInterest',
	SELECTBYCONDITON:'/api/interest/selectByCondition',
	DELETE:'/api/interest/deleteInterest'
}
// 招募岗位
const JOB_URL={
	INSERT:'/api/job/insertJob',
	SELECTBYCONDITON:'/api/job/selectByCondition',
	SELECTBYID:'/api/job/selectById',
	UPDATE:'/api/job/updateJob'
}
// 帖子
const POST_URL={
	INSERT:'/api/post/insertPost',
	SELECTBYCONDITON:'/api/post/selectByCondition',
	SELECTBYID:'/api/post/selectById',
	UPDATE:'/api/post/updatePost'
}
// 学校
const SCHOOL_URL={
	INSERT:'/api/school/insertSchool',
	SELECTBYCONDITON:'/api/school/selectByCondition',
	SELECTBYID:'/api/school/selectById',
	UPDATE:'/api/school/updateSchool',
	DELETEBYID:'/api/school/deleteSchool',
}
// 教育经历
const VOLEDU_URL={
	INSERT:'/api/volEducation/insertVolEducation',
	SELECTBYCONDITON:'/api/volEducation/selectByCondition',
	UPDATE:'/api/volEducation/updateVolEducation',
	DELETE:'/api/volEducation/deleteVolEducation'
}

export default {
	async getUser() {
		let resp = await http(USER_URL.GETUSER,'GET','url',{})
		return resp
	},
	// 用户
	async registeRecuriter({name
		,password
		,idcard
		,phone
		,email
		,address
		,identify
		,reason}) {
		let resp = await http(USER_URL.REGISTERECRUITER,'POST','url',{name
			,password
			,idcard
			,phone
			,email
			,address
			,identify
			,reason})
		return resp
	},
	async getRecuriter({userId}) {
		let resp = await http(USER_URL.GETRECRUITER,'GET','url',{userId})
		return resp
	},
	async editRecuriter({
		id
		,name
		,password
		,idcard
		,phone
		,email
		,address
		,identify
		,reason
	  ,userId}) {
		let resp = await http(USER_URL.EDITRECRUITER,'POST','url',{
			id
			,name
			,password
			,idcard
			,phone
			,email
			,address
			,identify
			,reason
			,userId})
		return resp
	},
	async registerVolunteer({name
		,password
		,idcard
		,phone
		,email
		,address
		,education
		,workStartdt
		,status
		,certificate
		,descr
		,reason}) {
		let resp = await http(USER_URL.REGISTEVOLUNTEER,'GET','url',{name
			,password
			,idcard
			,phone
			,email
			,address
			,education
			,workStartdt
			,status
			,certificate
			,descr
			,reason})
		return resp
	},
	async getVolunteer({userId}) {
		let resp = await http(USER_URL.GETVOLUNTEER,'GET','url',{userId})
		return resp
	},
	async editVolunteer({
		id
		,name
		,password
		,idcard
		,phone
		,email
		,address
		,education
		,workStartdt
		,status
		,certificate
		,descr
		,reason
	  ,userId}) {
		let resp = await http(USER_URL.EDITVOLUNTEER,'POST','url',{
			id
			,name
			,password
			,idcard
			,phone
			,email
			,address
			,education
			,workStartdt
			,status
			,certificate
			,descr
			,reason
			,userId})
		return resp
	},
	async login({name,password}) {
		let resp = await http(USER_URL.LOGIN,'POST','url',{name,password})
		return resp
	},
	// 文章
	async insertArticle({ title
		,authorId
		,imgs
		,content}) {
		let resp = await http(ARTICLE_URL.INSERT,'GET','url',{ title
			,authorId
			,imgs
			,content})
		return resp
	},
	async selectArticleByCondition({userId
		,keyword
		,establishDt
		,status}) {
		let resp = await http(ARTICLE_URL.SELECTBYCONDITON,'GET','url',{userId
			,keyword
			,establishDt
			,status})
		return resp
	},
	async selectArticleById({articleId}) {
		let resp = await http(ARTICLE_URL.SELECTBYID,'GET','url',{articleId})
		return resp
	},
	async updateArticle({id
		,title
		,authorId
		,imgs
		,content
		,reason
		,result
		,status}) {
		let resp = await http(ARTICLE_URL.UPDATE,'GET','url',{id
			,title
			,authorId
			,imgs
			,content
			,reason
			,result
			,status})
		return resp
	},
	// 帖子
	async insertPost({ title
		,authorId
		,content
		,imgs}) {
		let resp = await http(POST_URL.INSERT,'GET','url',{ title
			,authorId
			,content
			,imgs})
		return resp
	},
	async selectPostByCondition({userId
		,keyword
		,establishDt
		,status}) {
		let resp = await http(POST_URL.SELECTBYCONDITON,'GET','url',{userId
			,keyword
			,establishDt
			,status})
		return resp
	},
	async selectPostById({postId}) {
		let resp = await http(POST_URL.SELECTBYID,'GET','url',{postId})
		return resp
	},
	async updatePost({id
		,title
		,authorId
		,content
		,imgs
		,reason
		,result
		,status}) {
		let resp = await http(POST_URL.UPDATE,'GET','url',{id
			,title
			,authorId
			,content
			,imgs
			,reason
			,result
			,status})
		return resp
	},
	// 学校
	async insertSChool({ name
		,address
		,addressName
		,education
		,descr
		,imgs
		,establishDt
		,userId
		,scale}) {
		let resp = await http(SCHOOL_URL.INSERT,'GET','url',{ name
			,address
			,addressName
			,education
			,descr
			,imgs
			,establishDt
			,userId
			,scale})
		return resp
	},
	async selectSchoolByCondition({userId
		,scale
		,address
		,keyword
		,status}) {
		let resp = await http(SCHOOL_URL.SELECTBYCONDITON,'GET','url',{userId
			,scale
			,address
			,keyword
			,status})
		return resp
	},
	async selectSchoolById({schoolId}) {
		let resp = await http(SCHOOL_URL.SELECTBYID,'GET','url',{schoolId})
		return resp
	},
	async updateSchool({id
		,name
		,address
		,addressName
		,education
		,descr
		,imgs
		,establishDt
		,userId
		,status
		,scale
		,reason
		,result}) {
		let resp = await http(SCHOOL_URL.UPDATE,'GET','url',{id
			,name
			,address
			,addressName
			,education
			,descr
			,imgs
			,establishDt
			,userId
			,status
			,scale
			,reason
			,result})
		return resp
	},
	async deleteSchoolById({schoolId}) {
		let resp = await http(SCHOOL_URL.DELETEBYID,'GET','url',{schoolId})
		return resp
	},
	// 招募岗位
	async insertJob({name
		,schoolId
		,userId
		,address
		,addressName
		,education
		,descr}) {
		let resp = await http(JOB_URL.INSERT,'GET','url',{name
			,schoolId
			,userId
			,address
			,addressName
			,education
			,descr})
		return resp
	},
	async selectJobByCondition({userId
		,schoolId
		,address
		,keyword
		,education
		,establishDt
		,status}) {
		let resp = await http(JOB_URL.SELECTBYCONDITON,'GET','url',{userId
			,schoolId
			,address
			,keyword
			,education
			,establishDt
			,status})
		return resp
	},
	async selectJobById({jobId}) {
		let resp = await http(JOB_URL.SELECTBYID,'GET','url',{jobId})
		return resp
	},
	async updateJob({id
		,name
		,schoolId
		,userId
		,address
		,addressName
		,education
		,descr
		,status}) {
		let resp = await http(JOB_URL.UPDATE,'GET','url',{id
			,name
			,schoolId
			,userId
			,address
			,addressName
			,education
			,descr
			,status})
		return resp
	},
	// 文章/帖子评论
	async insertComment({userId
		,mainId
		,msg
		,type}) {
		let resp = await http(COMMENT_URL.INSERT,'GET','url',{userId
			,mainId
			,msg
			,type})
		return resp
	},
	async selectCommentByCondition({userId
		,mainId
		,type}) {
		let resp = await http(COMMENT_URL.SELECTBYCONDITON,'GET','url',{userId
			,mainId
			,type})
		return resp
	},
	async updateComment({id
		,status
		,type}) {
		let resp = await http(COMMENT_URL.UPDATE,'GET','url',{id
			,status
		  ,type})
		return resp
	},
	// 收藏关注
	async insertInterest({userId
		,collectId
		,type}) {
		let resp = await http(INTEREST_URL.INSERT,'GET','url',{userId
			,collectId
			,type})
		return resp
	},
	async selectInterestByCondition({userId
		,type}) {
		let resp = await http(INTEREST_URL.SELECTBYCONDITON,'GET','url',{userId
			,type})
		return resp
	},
	async deleteInterest({interestId}) {
		let resp = await http(INTEREST_URL.DELETE,'GET','url',{interestId})
		return resp
	},
	// 数据字典
	async selectAddress({level
		,pcode}) {
		let resp = await http(DATADICT_URL.SELECTADDRESS,'GET','url',{level
			,pcode})
		return resp
	},
	async selectJobType() {
		let resp = await http(DATADICT_URL.SELECTJOBTYPE,'GET','url',{})
		return resp
	},
	async selectLicense() {
		let resp = await http(DATADICT_URL.SELECTLICENSE,'GET','url',{})
		return resp
	},
	async selectTrade() {
		let resp = await http(DATADICT_URL.SELECTTRADE,'GET','url',{})
		return resp
	},
	// 工作经历
	async insertExperience({companyName
		,startDt
		,endDt
		,departName
		,jobName
		,userId
		,task
		,performance}) {
		let resp = await http(EXPERIENCE_URL.INSERT,'GET','url',{companyName
			,startDt
			,endDt
			,departName
			,jobName
			,userId
			,task
			,performance})
		return resp
	},
	async selectExperienceByCondition({userId}) {
		let resp = await http(EXPERIENCE_URL.SELECTBYCONDITON,'GET','url',{userId})
		return resp
	},
	async updateExperience({id
		,companyName
		,startDt
		,endDt
		,departName
		,jobName
		,userId
		,task
		,performance}) {
		let resp = await http(EXPERIENCE_URL.UPDATE,'GET','url',{id
			,companyName
			,startDt
			,endDt
			,departName
			,jobName
			,userId
			,task
			,performance})
		return resp
	},
	async deleteExperience({id}) {
		let resp = await http(EXPERIENCE_URL.DELETE,'POST','url',{id})
		return resp
	},
	// 期望岗位
	async insertExpectJob({name
		,addrs
		,userId}) {
		let resp = await http(EXPECTJOB_URL.INSERT,'GET','url',{name
			,addrs
			,userId})
		return resp
	},
	async selectExpectJobByCondition({userId}) {
		let resp = await http(EXPECTJOB_URL.SELECTBYCONDITON,'GET','url',{userId})
		return resp
	},
	async updateExpectJob({id
		,name
		,addrs
		,userId}) {
		let resp = await http(EXPECTJOB_URL.UPDATE,'GET','url',{id
			,name
			,addrs
			,userId})
		return resp
	},
	async deleteExpectJob({id}) {
		let resp = await http(EXPECTJOB_URL.DELETE,'POST','url',{id})
		return resp
	},
	// 教育经历
	async insertVolEdu({schoolName
		,project
		,degree
		,startDt
		,endDt
		,userId
	  ,content}) {
		let resp = await http(VOLEDU_URL.INSERT,'GET','url',{schoolName
			,project
			,degree
			,startDt
			,endDt
			,userId
			,content})
		return resp
	},
	async selectVolEduByCondition({userId}) {
		let resp = await http(VOLEDU_URL.SELECTBYCONDITON,'GET','url',{userId})
		return resp
	},
	async updateVolEdu({id
		,schoolName
		,project
		,degree
		,startDt
		,endDt
		,userId
	  ,content}) {
		let resp = await http(VOLEDU_URL.UPDATE,'GET','url',{id
			,schoolName
			,project
			,degree
			,startDt
			,endDt
			,userId
			,content})
		return resp
	},
	async deleteVolEdu({id}) {
		let resp = await http(VOLEDU_URL.DELETE,'POST','url',{id})
		return resp
	},
	// 资格证书
	async insertCertificate({name
		,userId}) {
		let resp = await http(CERTIFICATE_URL.INSERT,'GET','url',{name
			,userId})
		return resp
	},
	async selectCertificateByCondition({userId}) {
		let resp = await http(CERTIFICATE_URL.SELECTBYCONDITON,'GET','url',{userId})
		return resp
	},
	async updateCertificate({id
		,name
		,userId}) {
		let resp = await http(CERTIFICATE_URL.UPDATE,'GET','url',{id
			,name
			,userId})
		return resp
	},
	// 社交主页
	async insertContact({url
		,userId}) {
		let resp = await http(CONTACT_URL.INSERT,'GET','url',{url
			,userId})
		return resp
	},
	async selectContactByCondition({userId}) {
		let resp = await http(CONTACT_URL.SELECTBYCONDITON,'GET','url',{userId})
		return resp
	},
	async updateContact({id
		,url
		,userId}) {
		let resp = await http(CONTACT_URL.UPDATE,'GET','url',{id
			,url
			,userId})
		return resp
	},
	// 文件
	async uploadFile(fileFormData) {
		let resp = await http(FILE_URL.UPLOAD,'POST','post',fileFormData)
		return resp
	},
	async selectFileByCondition({userId,dt}) {
		let resp = await http(FILE_URL.SELECTBYCONDITON,'GET','url',{userId,dt})
		return resp
	},
	async selectFileById({id}) {
		let resp = await http(FILE_URL.SELECTBYID,'GET','url',{id})
		return resp
	},
	async updateFile({id
		,name
		,filepath
		,upDt
		,userId
		,status}) {
		let resp = await http(FILE_URL.UPDATE,'GET','url',{id
			,name
			,filepath
			,upDt
			,userId
			,status})
		return resp
	},
	async deleteFileById({id}) {
		let resp = await http(FILE_URL.DELETE,'POST','url',{id})
		return resp
	},
	// 聊天室
	async insertChat({fromId
		,toId
	  ,content}) {
		let resp = await http(CHAT_URL.INSERT,'GET','url',{fromId
			,toId
			,content})
		return resp
	},
	async selectChatByFromTo({fromId
		,toId}) {
		let resp = await http(CHAT_URL.SELECTBYFROMTO,'GET','url',{fromId
			,toId})
		return resp
	},
	async selectLastChats({userId}) {
		let resp = await http(CHAT_URL.SELECTLASTCHATS,'GET','url',{userId})
		return resp
	},

	// async selectJobById({ jobId }) {
	// 	let resp = await http(URL.JOB_SELECTBYID,'GET','url',{ jobId })
	// 	return resp
	// },
	// async selectFileById({id}) {
	// 	let resp = await http(URL.FILE_SELECTBYID,'GET','url',{id})
	// 	return resp
	// },
	// async selectFileByCondition({userId, upDt}) {
	// 	let resp = await http(URL.FILE_SELECTBYCOND,'GET','url',{userId, upDt})
	// 	return resp
	// },
}