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
 * 获取大纲
 * @param data
 * @returns {Promise<*>}
 */
export function generate_outline(data) {
	return request.post("/generate_outline", { data },"sse")
}

/**
 * 获取正文
 * @param data
 * @returns {Promise<*>}
 */
export function generate_paper(data) {
	return request.post("/generate_body", { data },"sse")
}

/**
 * 续写正文
 * @param data
 * @returns {Promise<*>}
 */
export function generate_paper_continue(data) {
	return request.post("/generate_paper_continue", { data },"sse")
}

/**
 * 获取标题
 * @param data
 * @returns {Promise<*>}
 */
export function chat_message(data) {
	return request.post("/chat_message", { data },"sse")
}

/**
 * 获取PPT
 * @param data
 * @returns {Promise<*>}
 */
export function generate_ppt(data) {
	return request.post("/generate_ppt", { data },"sse")
}
