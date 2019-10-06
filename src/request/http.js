import axios from 'axios'
import { Message } from "element-ui"
//transmitType: 'json'/'url'
export default function request(url, type = 'GET', transmitType = 'url', data = {}) {
	return new Promise(function(resolve,reject) {
		let option = {
			url,
			method: type
		}
		if (transmitType === 'url') {
			option.params = data
		} else {
			option.data = data
		}

		// debugger
		axios(option)
		.then(res => {
			if (res.data.status === 1000) {
				resolve(res.data)
			} else {
				reject(res.data)
			}
		})
		.catch(error => {
			// Message.error('网络出错')
			reject({ msg: '网络出错' })
		})
	})
}