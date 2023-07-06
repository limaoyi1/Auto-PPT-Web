/**
 * description：本地缓存
 * @author Kevin
 * @date 2023/7/6
 */

import utils from "@/utils/index";

const defaultKey = "history"

const memory = {
	history: [],
	setCache: function (value) {
		localStorage.setItem(defaultKey, value);
	},
	getCache: function () {
		localStorage.getItem(defaultKey)
	},
	removeCache: function () {
		localStorage.removeItem(defaultKey)
	},
	clearCache: function(){
		localStorage.clear()
	},
	/**
	 * 添加上下文历史记录
	 * @param value
	 */
	addCache: function (value) {
		let oldHistory = localStorage.getItem(defaultKey)
		let parseData = []
		if (utils.isJson(oldHistory)){
			parseData = JSON.parse(oldHistory)
		}
		parseData.push(value)
		const json = JSON.stringify(parseData)
		this.setCache(json)
	}
}

export default memory
