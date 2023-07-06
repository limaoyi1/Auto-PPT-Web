/**
 * description：
 * @author Kevin
 * @date 2023/7/6
 */

import request from "@utils/request"

/**
 * 获取标题
 * @param data
 * @returns {Promise<*>}
 */
export function generate_title(data) {
	return request.post("/generate_title", { data },"sse")
}

/**
 * 获取标题
 * @param data
 * @returns {Promise<*>}
 */
export function generate_outline(data) {
	return request.post("/generate_outline", { data },"sse")
}
