import "./index.scss"
import icon_robot from "@statics/images/icon_robot.png"
import icon_polish from "@statics/images/svg/icon_rs.svg"
import icon_cxd from "@statics/images/svg/icon_cxd.svg"
import icon_summarize from "@statics/images/svg/icon_zjd.svg"
import icon_translate from "@statics/images/svg/icon_fy.svg"
import icon_common from "@statics/images/icon_common.png"
import icon_close from "@statics/images/icon_close.png"
import icon_warning from "@statics/images/icon_warning.png"
import icon_ai from "@statics/images/svg/icon_ai.svg"
import icon_copy from "@statics/images/svg/icon_fuz.svg"
import { useEffect, useRef, useState } from "react"
import copyText from "copy-to-clipboard"
import { Spin, Input, message, Space } from "antd"
import Tooltip from "@comp/tooltip"
import { chat_message } from "@services/generate"

const { TextArea } = Input

let isLock = false

const Apply = props => {
	const textRef = useRef(null)
	let messages = ""
	const [visibleModel, setVisibleModel] = useState(true)
	const [subject, setSubject] = useState("")
	const [subjectContent, setSubjectContent] = useState("")
	const ref = useRef(null)
	const [keyword, setKeyword] = useState("")
	const [content, setContent] = useState("")
	const [visible, setVisible] = useState(false)
	const [selectedWord, setSelectedWord] = useState("")
	const [loading, setLoading] = useState(false)
	const [disabled, setDisabled] = useState(false)

	useEffect(() => {
		setVisibleModel(props?.visibleModel)
	}, [props?.visibleModel])

	useEffect(() => {
		if (props?.content) {
			setVisibleModel(false)
			setSubjectContent(props?.content)
		}
	}, [props?.content])

	/**
	 * 文本域回调
	 * @param e
	 */
	const onChange = e => {
		const value = e.target.value
		setKeyword(value)
	}
	/**
	 * 提交，获取gpt内容
	 */
	const submit = async () => {
		setContent("")
		setLoading(true)
		chatMessage({ chat: keyword, cb: handleStreamingCallback }).catch(e => {
			setLoading(false)
		})
	}

	/**
	 * 流式请求回调
	 * @param str
	 */
	const handleStreamingCallback = str => {
		setLoading(false)
		if (str) {
			if (messages) {
				setContent(`${messages}\n\n${str}`)
			} else {
				setContent(`${str}`)
			}
		}
	}

	/**
	 * 复制文本
	 */
	const copy = () => {
		copyText(content, { format: "text/plain" })
		message.success("已复制")
	}
	/**
	 * 新增AI助手
	 */
	const showAiDom = () => {
		if (!visible) {
			setContent("")
			setKeyword("")
		}
		setVisible(!visible)
	}

	/**
	 * 润色
	 */
	const polish = () => {
		if (selectWord) {
			shortcutCommand("润色这段文本")
		}
	}
	/**
	 * 扩写
	 */
	const abbreviation = () => {
		if (selectWord) {
			shortcutCommand("扩写这段文本")
		}
	}
	/**
	 * 总结
	 */
	const summarize = () => {
		if (selectWord) {
			shortcutCommand("总结这段文本")
		}
	}
	/**
	 * 翻译
	 */
	const translate = () => {
		if (selectWord) {
			shortcutCommand("翻译这段文本")
		}
	}
	/**
	 * 快捷指令
	 */
	const shortcutCommand = word => {
		setVisible(true)
		setContent("")
		if (word === "翻译这段文本") {
			setKeyword(`${word} 【${selectedWord}】为【  】`)
		} else {
			setKeyword(`${word} 【${selectedWord}】`)
		}
		ref?.current?.focus()
	}
	/**
	 * 选中文字
	 */
	const selectWord = () => {
		let selection = window.getSelection()
		setSelectedWord(selection.toString())
	}
	/**
	 * 方案报告
	 */
	const writeProgramReport = () => {
		setVisible(true)
		setKeyword(`${"写一篇方案报告，关于"} `)
	}
	const writeSpeech = () => {
		setVisible(true)
		setKeyword(`${"写一篇演讲稿，关于"} `)
	}

	const subjectHandle = e => {
		setSubject(e.target.value)
	}

	const subjectContentHandle = e => {
		setSubjectContent(e.target.value)
	}

	const onDrag = () => {
		setDisabled(true)
	}

	const handleStop = () => {
		setDisabled(false)
	}

	const copyAll = () => {
		copyText(`${subject}\n\n${subjectContent}`, { format: "text/plain" })
		message.success("已复制")
	}

	const replaceText = () => {
		const dom = document.getElementById("textArea")
		const start = dom.selectionStart
		const end = dom.selectionEnd
		if (start > -1 && end > -1) {
			setContent("")
			setVisible(false)
			setSubjectContent(`${subjectContent.slice(0, start)}${content}${subjectContent.slice(end)}`)
		}
	}

	const insertText = () => {
		const dom = document.getElementById("textArea")
		const start = dom.selectionStart
		const end = dom.selectionEnd
		if (end > -1) {
			setContent("")
			setVisible(false)
			setSubjectContent(`${subjectContent.slice(0, end)}${content}${subjectContent.slice(end)}`)
		}
	}

	return (
		<div className="apply-container">
			<div className="apply-box" style={{ ...props?.applyBoxStyle }}>
				{/* <input className="apply-title" type="text" placeholder="无标题" value={subject} onChange={subjectHandle} /> */}
				<TextArea
					id="textArea"
					ref={textRef}
					disabled={disabled}
					bordered={false}
					autoSize={{ minRows: 3, maxRows: 30 }}
					value={subjectContent}
					onChange={subjectContentHandle}
					onMouseUp={selectWord}
					placeholder="输入正文"
				/>
				<Tooltip />
			</div>

			<div className="apply-other-box">
				<div className="apply-btn" onClick={showAiDom}>
					<img src={icon_ai} alt="" />
					<span>询问AI</span>
				</div>
				<div className="apply-btn" onClick={copyAll}>
					<img src={icon_copy} alt="" />
					<span>复制全文</span>
				</div>
				<div className="apply-tools">
					<div className="apply-tool-label">快捷指令</div>
					<div className="apply-tool" onClick={polish}>
						<img src={icon_polish} alt="" />
						<span>润色</span>
					</div>
					<div className="apply-tool" onClick={abbreviation}>
						<img src={icon_cxd} alt="" />
						<span>扩写</span>
					</div>
					<div className="apply-tool" onClick={summarize}>
						<img src={icon_summarize} alt="" />
						<span>总结</span>
					</div>
					<div className="apply-tool" onClick={translate}>
						<img src={icon_translate} alt="" />
						<span>翻译</span>
					</div>
					{visibleModel && (
						<>
							<div className="apply-tool-label">模板</div>
							<div className="apply-tool" onClick={writeProgramReport}>
								<img src={icon_common} alt="" />
								<span>方案报告</span>
							</div>
							<div className="apply-tool" onClick={writeSpeech}>
								<img src={icon_common} alt="" />
								<span>演讲稿</span>
							</div>
						</>
					)}
				</div>
			</div>

			{visible && (
				// <Draggable onDrag={onDrag} onStop={handleStop}>
				<article className="apply-wrap">
					<div className="apply-assistant">
						<div className="apply-assistant-left">
							<img src={icon_robot} alt="" />
							<div>小天助手</div>
						</div>
						<div className="apply-assistant-middle">
							<Spin spinning={loading} tip="小天正在思考中...">
								<div className="apply-textarea-box">
									<textarea className="apply-textarea" value={keyword} ref={ref} placeholder="输入文字，向Ai提问" name="" id="" cols="30" rows="10" onChange={onChange} />
									<button className="apply-submit" onClick={submit}>
										发送
									</button>
								</div>
							</Spin>

							{content && (
								<>
									<article className="contentWrap" style={{ margin: "10px 0px", display: "block", whiteSpace: "pre-wrap" }}>
										{/* <TypeIt style={{ display: "block", whiteSpace: "pre-wrap" }}>{content}</TypeIt>
										 */}
										{content}
									</article>
									<div>
										<img src={icon_warning} alt="" />
										<span>声明：内容为模型概率生成，可能产生不正确的信息，不代表TiDoc的观点和立场</span>
										<button className="copy-btn" onClick={copy} style={{ marginLeft: 20 }}>
											{"复制"}
										</button>
										<button className="copy-btn" onClick={insertText} style={{ marginLeft: 20 }}>
											{"插入"}
										</button>
										<button className="copy-btn" onClick={replaceText}>
											{"替换"}
										</button>
									</div>
								</>
							)}
						</div>
						<div className="apply-assistant-right" onClick={showAiDom}>
							<img src={icon_close} alt="" />
						</div>
					</div>
				</article>
				// </Draggable>
			)}
		</div>
	)
}

export default Apply
