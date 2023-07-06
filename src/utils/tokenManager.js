/*
 * @description: token处理类
 * @Author: Cheng kaixuan
 * @Date: 2023-06-12 14:49:25
 * @LastEditors: Cheng kaixuan
 * @LastEditTime: 2023-06-12 14:49:41
 */
const tokenKey = "tidoc-token"

const tokenManager = {
	setToken: function (token) {
		localStorage.setItem(tokenKey, token)
	},
	getToken: function () {
		return localStorage.getItem(tokenKey)
	},
	removeToken: function () {
		localStorage.removeItem(tokenKey)
	}
}

export default tokenManager
