import http from './http.js'
// 用户
const USER_URL = {
	REGISTERECRUITER:'/shizhe/api/user/registeRecruiter',
	REGISTEVOLUNTEER:'/shizhe/api/user/registeVolunteer',
	LOGIN:'/shizhe/api/user/login',
	GETVOLUNTEER:'/shizhe/api/user/getVolunteer',
	EDITVOLUNTEER:'/shizhe/api/user/editVolunteer',
	GETRECRUITER:'/shizhe/api/user/getRecruiter',
	EDITRECRUITER:'/shizhe/api/user/editRecruiter',
	GETUSER:'/shizhe/api/user/getUser'
	// TEST: 'http://localhost:8081/shizhe/api/get',
	// EMAIL: 'http://localhost:8081/shizhe/api/email',

	// JOB_SELECTBYID:'/shizhe/api/job/selectById',

	// // 简历文件
	// FILE_UPLOAD:'/shizhe/api/file/upload',
	// FILE_SELECTBYID:'/shizhe/api/file/selectById',
	// FILE_SELECTBYCOND:'/shizhe/api/file/selectByCondition'
}
// 数据字典
const DATADICT_URL={
	SELECTADDRESS:'/shizhe/api/datadict/selectAddress',
	SELECTJOBTYPE:'/shizhe/api/datadict/selectJobtype',
	SELECTLICENSE:'/shizhe/api/datadict/selectLicense',
	SELECTTRADE:'/shizhe/api/datadict/selectTrade'
}
// 文章
const ARTICLE_URL={
	INSERT:'/shizhe/api/article/insertArticle',
	SELECTBYCONDITON:'/shizhe/api/article/selectByCondition',
	SELECTBYID:'/shizhe/api/article/selectById',
	UPDATE:'/shizhe/api/article/updateArticle'
}
// 资格证书
const CERTIFICATE_URL={
	INSERT:'/shizhe/api/certificate/insertCertificate',
	SELECTBYCONDITON:'/shizhe/api/certificate/selectByCondition',
	UPDATE:'/shizhe/api/certificate/updateCertificate'
}
// 聊天
const CHAT_URL={
	INSERT:'/shizhe/api/chat/insertChat',
	SELECTBYFROMTO:'/shizhe/api/chat/selectByFromTo',
	SELECTLASTCHATS:'/shizhe/api/chat/selectLastChats'
}
// 评论
const COMMENT_URL={
	INSERT:'/shizhe/api/comment/insertComment',
	SELECTBYCONDITON:'/shizhe/api/comment/selectByCondition',
	SELECTBYID:'/shizhe/api/comment/selectById',
	UPDATE:'/shizhe/api/comment/updateComment'
}
// 社交主页
const CONTACT_URL={
	INSERT:'/shizhe/api/contact/insertContact',
	SELECTBYCONDITON:'/shizhe/api/contact/selectByCondition',
	UPDATE:'/shizhe/api/contact/updateContact'
}
// 期望岗位
const EXPECTJOB_URL={
	INSERT:'/shizhe/api/expectJob/insertExpectJob',
	SELECTBYCONDITON:'/shizhe/api/expectJob/selectByCondition',
	UPDATE:'/shizhe/api/expectJob/updateExpectJob',
	DELETE:'/shizhe/api/expectJob/deleteExpectJob'
}
// 工作经历
const EXPERIENCE_URL={
	INSERT:'/shizhe/api/experience/insertExperience',
	SELECTBYCONDITON:'/shizhe/api/experience/selectByCondition',
	UPDATE:'/shizhe/api/experience/updateExperience',
	DELETE:'/shizhe/api/experience/deleteExperience'
}
// 文件
const FILE_URL={
	UPLOAD:'/shizhe/api/file/upload',
	SELECTBYCONDITON:'/shizhe/api/file/selectByCondition',
	SELECTBYID:'/shizhe/api/file/selectById',
	UPDATE:'/shizhe/api/file/updateFile',
	DELETE:'/shizhe/api/file/deleteFile'
}
// 收藏关注
const INTEREST_URL={
	INSERT:'/shizhe/api/interest/insertInterest',
	SELECTBYCONDITON:'/shizhe/api/interest/selectByCondition',
	DELETE:'/shizhe/api/interest/deleteInterest'
}
// 招募岗位
const JOB_URL={
	INSERT:'/shizhe/api/job/insertJob',
	SELECTBYCONDITON:'/shizhe/api/job/selectByCondition',
	SELECTBYID:'/shizhe/api/job/selectById',
	UPDATE:'/shizhe/api/job/updateJob'
}
// 帖子
const POST_URL={
	INSERT:'/shizhe/api/post/insertPost',
	SELECTBYCONDITON:'/shizhe/api/post/selectByCondition',
	SELECTBYID:'/shizhe/api/post/selectById',
	UPDATE:'/shizhe/api/post/updatePost'
}
// 学校
const SCHOOL_URL={
	INSERT:'/shizhe/api/school/insertSchool',
	SELECTBYCONDITON:'/shizhe/api/school/selectByCondition',
	SELECTBYID:'/shizhe/api/school/selectById',
	UPDATE:'/shizhe/api/school/updateSchool',
	DELETEBYID:'/shizhe/api/school/deleteSchool',
}
// 教育经历
const VOLEDU_URL={
	INSERT:'/shizhe/api/volEducation/insertVolEducation',
	SELECTBYCONDITON:'/shizhe/api/volEducation/selectByCondition',
	UPDATE:'/shizhe/api/volEducation/updateVolEducation',
	DELETE:'/shizhe/api/volEducation/deleteVolEducation'
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