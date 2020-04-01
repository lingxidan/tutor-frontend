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
	GET_VOLS:'/api/user/getVols',
	GET_RECRS:'/api/user/getRecrs',
	GET_USER: '/api/user/getUser'

	// TEST: 'http://localhost:8081/api/get',
	// EMAIL: 'http://localhost:8081/api/email',

	// JOB_SELECTBYID:'/api/job/selectById',

	// // 简历文件
	// FILE_UPLOAD:'/api/file/upload',
	// FILE_SELECTBYID:'/api/file/selectById',
	// FILE_SELECTBYCOND:'/api/file/selectByCondition'
}
const IDENTY_URL={
	APPLY_RECR_IDENTY: '/api/identy/applyRecrIdenty',
	LIST_RECR_IDENTY: '/api/identy/listRecrIdenty',
	LIST_ALL_RECR_IDENTY: '/api/identy/listAllRecrIdenty',
	UPDATE_RECR_IDENTY: '/api/identy/updateRecrIdenty',
	LAST_RECR_IDENTY: '/api/identy/getLasrRecrIdenty',

	APPLY_VOL_IDENTY: '/api/identy/applyVolIdenty',
	LIST_VOL_IDENTY: '/api/identy/listVolIdenty',
	LIST_ALL_VOL_IDENTY: '/api/identy/listAllVolIdenty',
	UPDATE_VOL_IDENTY: '/api/identy/updateVolIdenty',
	LAST_VOL_IDENTY: '/api/identy/getLasrVolIdenty'

}
// 数据字典
const DATADICT_URL={
	SELECTADDRESS:'/api/datadict/selectAddress',
	SELECTJOBTYPE:'/api/datadict/selectJobtype',
	SELECTLICENSE:'/api/datadict/selectLicense',
	SELECTTRADE:'/api/datadict/selectTrade',
	SELECT_NAME_BY_CODE: '/api/datadict/selectAddressByCode'
}
// 文章
const ARTICLE_URL={
	INSERT:'/api/article/insertArticle',
	SELECTBYCONDITON:'/api/article/selectByCondition',
	SELECTBYID:'/api/article/selectById',
	UPDATE:'/api/article/updateArticle',
	DELETE: '/api/article/deleteArticle'
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
	SELECT_ALL:'/api/chat/selectAllChat',
	SELECTBYFROMTO:'/api/chat/selectByFromTo'
}
// 评论
const COMMENT_URL={
	INSERT_ARTICLE:'/api/comment/insertArticleComment',
	INSERT_POST:'/api/comment/insertPostComment',
	SELECTBYCONDITON:'/api/comment/selectByCondition',
	SELECTBYID:'/api/comment/selectCommentById',
	DELETE:'/api/comment/deleteComment'
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
	INSERT_ATTENTION:'/api/interest/insertAttention',
	INSERT_ACCUSE:'/api/interest/insertAccuse',
	SELECTBYCONDITON_ATTENTION:'/api/interest/selectAttentionByCondition',
	SELECTBYCONDITON_ACCUSE:'/api/interest/selectAccuseByCondition',
	DELETE_ATTENTION:'/api/interest/deleteAttention',
	UPDATE_ACCUSE:'/api/interest/updateAccuse',
	DELETE_ACCUSE:'/api/interest/deleteAccuse'
}
// 招募岗位
const JOB_URL={
	INSERT:'/api/job/insertJob',
	SELECTBYCONDITON:'/api/job/selectByCondition',
	SELECTBYID:'/api/job/selectById',
	UPDATE:'/api/job/updateJob',
	DELETE: '/api/job/deleteJob'
}
// 帖子
const POST_URL={
	INSERT:'/api/post/insertPost',
	SELECTBYCONDITON:'/api/post/selectByCondition',
	SELECTBYID:'/api/post/selectById',
	UPDATE:'/api/post/updatePost',
	DELETE: '/api/post/deletePost'
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
	async getUser({userId}) {
		let resp = await http(USER_URL.GET_USER,'GET','url',{userId})
		return resp
	},
	async getVols({address,education,status,certificate,keyword}) {
		let resp = await http(USER_URL.GET_VOLS,'GET','url',{address,education,status,certificate,keyword})
		return resp
	},
	async getRecrs({address,companyName}) {
		let resp = await http(USER_URL.GET_RECRS,'GET','url',{address,companyName})
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
		,companyName
		,companyPhone}) {
		let resp = await http(USER_URL.REGISTERECRUITER,'GET','url',{name
			,password
			,idcard
			,phone
			,email
			,address
			,identify
			,companyName
			,companyPhone})
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
		let resp = await http(USER_URL.EDITRECRUITER,'GET','url',{
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
		,status}) {
		let resp = await http(USER_URL.REGISTEVOLUNTEER,'GET','url',{name
			,password
			,idcard
			,phone
			,email
			,address
			,education
			,status})
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
		,status
		,certificate
	  ,userId}) {
		let resp = await http(USER_URL.EDITVOLUNTEER,'GET','url',{
			id
			,name
			,password
			,idcard
			,phone
			,email
			,address
			,education
			,status
			,certificate
			,userId})
		return resp
	},
	async login({name,password}) {
		let resp = await http(USER_URL.LOGIN,'POST','url',{name,password})
		return resp
	},
	async appplyRecrIdenty(fileFormData) {
		let resp = await http(IDENTY_URL.APPLY_RECR_IDENTY,'POST','post',fileFormData, {'Content-Type':'multipart/form-data'})
		return resp
	},
	async getLastRecrIdenty({recrId}) {
		let resp = await http(IDENTY_URL.LAST_RECR_IDENTY,'GET','url',{recrId})
		return resp
	},
	async getRecrIdenty({recrId}) {
		let resp = await http(IDENTY_URL.LIST_RECR_IDENTY,'GET','url',{recrId})
		return resp
	},
	async getAllRecrIdenty({result}) {
		let resp = await http(IDENTY_URL.LIST_ALL_RECR_IDENTY,'GET','url',{result})
		return resp
	},
	async updateRecrIdenty({id, describe, result}) {
		let resp = await http(IDENTY_URL.UPDATE_RECR_IDENTY,'GET','url',{id, describe, result})
		return resp
	},

	async appplyVolIdenty(formData) {
		let resp = await http(IDENTY_URL.APPLY_VOL_IDENTY,'POST','post',formData, {'Content-Type':'multipart/form-data'})
		return resp
	},
	async getLastVolIdenty({volId}) {
		let resp = await http(IDENTY_URL.LAST_VOL_IDENTY,'GET','url',{volId})
		return resp
	},
	async getVolIdenty({volId}) {
		let resp = await http(IDENTY_URL.LIST_VOL_IDENTY,'GET','url',{volId})
		return resp
	},
	async getAllVolIdenty({result}) {
		let resp = await http(IDENTY_URL.LIST_ALL_VOL_IDENTY,'GET','url',{result})
		return resp
	},
	async updateVolIdenty({id, describe, result}) {
		let resp = await http(IDENTY_URL.UPDATE_VOL_IDENTY,'GET','url',{id, describe, result})
		return resp
	},
	// 文章
	async insertArticle(formData) {
		let resp = await http(ARTICLE_URL.INSERT,'POST','post',formData, {'Content-Type':'multipart/form-data'})
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
	async deleteArticle({articleId}) {
		let resp = await http(ARTICLE_URL.DELETE,'GET','url',{articleId})
		return resp
	},
	async selectArticleById({articleId}) {
		let resp = await http(ARTICLE_URL.SELECTBYID,'GET','url',{articleId})
		return resp
	},
	async updateArticle(formData) {
		let resp = await http(ARTICLE_URL.UPDATE,'POST','post',formData, {'Content-Type':'multipart/form-data'})
		return resp
	},
	// 帖子
	async insertPost(formData) {
		let resp = await http(POST_URL.INSERT,'POST','post',formData, {'Content-Type':'multipart/form-data'})
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
	async deletePost({postId}) {
		let resp = await http(POST_URL.DELETE,'GET','url',{postId})
		return resp
	},
	async selectPostById({postId}) {
		let resp = await http(POST_URL.SELECTBYID,'GET','url',{postId})
		return resp
	},
	async updatePost(formData) {
		let resp = await http(POST_URL.UPDATE,'POST','post',formData, {'Content-Type':'multipart/form-data'})
		return resp
	},
	// 学校
	async insertSchool(formData) {
		let resp = await http(SCHOOL_URL.INSERT,'POST','post',formData, {'Content-Type':'multipart/form-data'})
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
	async updateSchool(formData) {
		let resp = await http(SCHOOL_URL.UPDATE,'POST','post',formData, {'Content-Type':'multipart/form-data'})
		return resp
	},
	async deleteSchoolById({schoolId}) {
		let resp = await http(SCHOOL_URL.DELETEBYID,'GET','url',{schoolId})
		return resp
	},
	// 招募岗位
	async insertJob(formData) {
		let resp = await http(JOB_URL.INSERT,'POST','post',formData, {'Content-Type':'multipart/form-data'})
		return resp
	},
	async selectJobByCondition({userId
		,schoolId
		,address
		,keyword
		,education
		,status}) {
		let resp = await http(JOB_URL.SELECTBYCONDITON,'GET','url',{userId
			,schoolId
			,address
			,keyword
			,education
			,status})
		return resp
	},
	async selectJobById({jobId}) {
		let resp = await http(JOB_URL.SELECTBYID,'GET','url',{jobId})
		return resp
	},
	async deleteJob({jobId}) {
		let resp = await http(JOB_URL.DELETE,'GET','url',{jobId})
		return resp
	},
	async updateJob(formData) {
		let resp = await http(JOB_URL.UPDATE,'POST','post',formData, {'Content-Type':'multipart/form-data'})
		return resp
	},
	// 文章/帖子评论
	async insertArticleComment({userId
		,articleId
		,msg}) {
		let resp = await http(COMMENT_URL.INSERT_ARTICLE,'GET','url',{userId
			,articleId
			,msg})
		return resp
	},
	async insertPostComment({userId
		,postId
		,msg}) {
		let resp = await http(COMMENT_URL.INSERT_POST,'GET','url',{userId
			,postId
			,msg})
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
	async deleteComment({id		
		,type}) {
		let resp = await http(COMMENT_URL.DELETE,'GET','url',{id			
			,type})
		return resp
	},
	// 收藏关注
	async insertAttention({userId
		,collectId
		,collectType}) {
		let resp = await http(INTEREST_URL.INSERT_ATTENTION,'GET','url',{userId
			,collectId
			,collectType})
		return resp
	},
	async insertAccuse({userId
		,accuseId
		,accuseType}) {
		let resp = await http(INTEREST_URL.INSERT_ACCUSE,'GET','url',{userId
			,accuseId
			,accuseType})
		return resp
	},
	async selectAttentionByCondition({userId
		,collectType,collectId}) {
		let resp = await http(INTEREST_URL.SELECTBYCONDITON_ATTENTION,'GET','url',{userId
			,collectType,collectId})
		return resp
	},
	async selectAccuseByCondition({userId
		,accuseType,accuseId,accuseResult}) {
		let resp = await http(INTEREST_URL.SELECTBYCONDITON_ACCUSE,'GET','url',{userId
			,accuseType,accuseId,accuseResult})
		return resp
	},
	async deleteAttention({id}) {
		let resp = await http(INTEREST_URL.DELETE_ATTENTION,'GET','url',{id})
		return resp
	},
	async updateAccuse({id,accuseRes}) {
		let resp = await http(INTEREST_URL.UPDATE_ACCUSE,'GET','url',{id,accuseRes})
		return resp
	},
	async deleteAccuse({id}) {
		let resp = await http(INTEREST_URL.DELETE_ACCUSE,'GET','url',{id})
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
	async selectNameByCode({code}) {
		let resp = await http(DATADICT_URL.SELECT_NAME_BY_CODE,'GET','url',{code})
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
		,task
		,performance}) {
		let resp = await http(EXPERIENCE_URL.UPDATE,'GET','url',{id
			,companyName
			,startDt
			,endDt
			,departName
			,jobName
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
		,addrs}) {
		let resp = await http(EXPECTJOB_URL.UPDATE,'GET','url',{id
			,name
			,addrs})
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
	  ,content}) {
		let resp = await http(VOLEDU_URL.UPDATE,'GET','url',{id
			,schoolName
			,project
			,degree
			,startDt
			,endDt
			,content})
		return resp
	},
	async deleteVolEdu({id}) {
		let resp = await http(VOLEDU_URL.DELETE,'POST','url',{id})
		return resp
	},
	// 资格证书
	async insertCertificate(formData) {
		let resp = await http(CERTIFICATE_URL.INSERT,'POST','post',formData, {'Content-Type':'multipart/form-data'})
		return resp
	},
	async selectCertificateByCondition({userId}) {
		let resp = await http(CERTIFICATE_URL.SELECTBYCONDITON,'GET','url',{userId})
		return resp
	},
	async updateCertificate(formData) {
		let resp = await http(CERTIFICATE_URL.UPDATE,'POST','post',formData, {'Content-Type':'multipart/form-data'})
		return resp
	},
	// 文件
	async uploadFile(fileFormData) {
		let resp = await http(FILE_URL.UPLOAD,'POST','post',fileFormData, {'Content-Type':'multipart/form-data'})
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
	async selectAllChat({uesrId}) {
		let resp = await http(CHAT_URL.SELECT_ALL,'GET','url',{uesrId})
		return resp
	},
	async selectByFromTo({userId,dt}) {
		let resp = await http(CHAT_URL.SELECTBYFROMTO,'GET','url',{userId,dt})
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