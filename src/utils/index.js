/*
 * @description: 工具函数入口
 * @Author: Cheng kaixuan
 * @Date: 2023-05-11 13:42:42
 * @LastEditors: Cheng kaixuan
 * @LastEditTime: 2023-05-30 10:10:03
 */

const utils = {
	isEmpty: value => value === "" || value === undefined || value === null,

	isJson: str=>{
		if (typeof str == 'string') {
			try {
				let obj=JSON.parse(str);
				if(typeof obj == 'object' && obj ){
					return true;
				}else{
					return false;
				}
				
			} catch(e) {
				return false;
			}
		}
	},
	getUrlCode(name) {
		return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.href) || [, ""])[1].replace(/\+/g, "%20")) || null
	}
}

export default utils
