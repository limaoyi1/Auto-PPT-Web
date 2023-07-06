/**
 * description：
 * @author Kevin
 * @date 2023/7/5
 */
import _ from 'lodash';
import "./index.scss"
import {Button, Form, Input, InputNumber, Radio, Steps} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons"
import ThButton from "@comp/button";
import {generate_outline, generate_title} from "@services/generate";
import {useState} from "react";
import memory from "@utils/memory";

const {TextArea} = Input;

const items = [
	{
		title: "添加描述",
		description: "输入需求信息"
	},
	{
		title: "生成标题",
		description: "生成创意标题"
	},
	{
		title: "生成大纲",
		description: "快速生成文章大纲"
	},
	{
		title: "内容生成",
		description: "基于大纲生成内容"
	},
	{
		title: "扩展加工",
		description: "内容扩展，加工编辑"
	}
]

function AutoPaper() {
	const [form] = Form.useForm()
	const [form2] = Form.useForm()
	const [form3] = Form.useForm()
	const [current, setCurrent] = useState(0)
	const [caption, setCaption] = useState("") // 标题
	const [outline, setOutline] = useState("") // 大纲
	
	
	/**
	 * 获取标题列表
	 * @returns {*[]|T[]}
	 */
	const getRadioList = () => {
		return _.isEmpty(caption) ? [] : (_.split(caption,"\n") || []).filter((o,idx) => !_.isEmpty(o))
	}
	/**
	 * 第一步
	 */
	const firstStep = async () => {
		try {
			let values = await form.validateFields()
			const cb = str => {
				setCurrent(current + 1)
				console.log(str, 'str=======================strstr')
				setCaption(str)
			}
			await generate_title({...values, cb})
		} catch (e) {
		
		}
	}
	/**
	 * 第二步
	 * @returns {Promise<void>}
	 */
	const secondStep = async () =>{
		try {
			let values = await form2.validateFields()
			const cb = str => {
				setCurrent(current + 1)
				console.log(str, 'str=======================strstr')
				setOutline(str)
				form3.setFieldsValue({outline: str})
				
			}
			/**
			 * 完成的回调
			 */
			const stopCallback = content =>{
				//存上下文缓存
				memory.addCache([
					{role: "user",content: `使用中文根据【${values.title}】生成大纲，大纲要求【${values.requirement}】`},
					{role: "assistant",content}
				])
			}
			await generate_outline({...values, cb, stopCallback})
		} catch (e) {
		
		}
	}
	
	
	return (
		<div className="auto-paper">
			<div className="auto-paper-box">
				<Steps current={current} items={items}/>
				{/*第一步*/}
				<div className="form step-1" style={{display: current === 0 ? "block" : "none"}}>
					<Form form={form} layout="vertical">
						<Form.Item label="报告类型" name="title" rules={[{required: true, message: '请输入报告类型!'}]}>
							<TextArea style={{height: 80, resize: "none", borderRadius: 4}} maxLength={10} showCount
							          placeholder="输入您要编写的报告类型，如工作汇报、市场调研、项目方案、产品需求文档等"/>
						</Form.Item>
						<Form.Item label="您希望AI以什么角色进行编写" name="role" rules={[{required: true, message: '请输入演讲者角色!'}]}>
							<Input maxLength={10} showCount placeholder="输入演讲者角色"/>
						</Form.Item>
						<Form.Item label="主题" name="form" rules={[{required: true, message: '请输入输入主题信息!'}]}>
							<TextArea style={{height: 120, resize: "none", borderRadius: 4}} showCount placeholder="输入主题信息"/>
						</Form.Item>
						<Form.Item layout="inline" label="标题数量" name="topic_num" initialValue={3}
						           rules={[{required: true, message: '请输入标题数量!'}]}>
							<InputNumber style={{width: "100%"}}/>
						</Form.Item>
						<Form.Item>
							<ThButton title="下一步" type="primary" block onClick={firstStep}/>
						</Form.Item>
					</Form>
				</div>
				{/*第二步*/}
				<div className="form step-2" style={{display: current === 1 ? "block" : "none"}}>
					<Form form={form2} layout="vertical">
						<Form.Item label="选择标题" name="title" rules={[{required: true, message: '请选择标题!'}]}>
							<Radio.Group>
								{
									_.map(getRadioList(), (o, idx) => <Radio value={o} key={idx}>{o}</Radio>)
								}
							</Radio.Group>
						</Form.Item>
						<Form.Item label="添加大纲生成要求" name="requirement" rules={[{required: true, message: '请添加大纲生成要求!'}]}>
							<TextArea rows={8} style={{ height: 200, resize: "none", borderRadius: 4 }} showCount placeholder="您可以继续输入对于文章大纲的要求，如层次分明，逻辑严谨，章节序号依次按照“一、”“（一）、”“1、”“（1）、”进行标注"/>
						</Form.Item>
						<Form.Item>
							<ThButton title="下一步" type="primary" block onClick={secondStep}/>
						</Form.Item>
					</Form>
				</div>
				{/*第三步*/}
				<div className="form step-2" style={{display: current === 2 ? "block" : "none"}}>
					<Form form={form3} layout="vertical">
						<Form.Item name="outline" initialValue={outline} label="大纲"  rules={[{required: true, message: '请添加大纲!'}]}>
							<TextArea
								autoSize={{ minRows: 3, maxRows: 30 }}
								value={outline}
								showCount
								style={{ minHeight: 120, paddingBottom: 20, resize: "none", borderRadius: 4 }}
								onChange={e => setOutline(e.target.value)}
								placeholder="输入大纲信息"
							/>
						</Form.Item>
						<Form.Item name="requirement" label="添加全文生成要求"  rules={[{required: true, message: '请添加文章全文的生成要求!'}]}>
							<TextArea
								showCount
								maxLength={500}
								style={{ height: 120, resize: "none", borderRadius: 4 }}
								placeholder="您可以继续输入对于文章全文的生成要求，如结构清晰，内容详细，每个小点至少编写300字"
							/>
						</Form.Item>
					</Form>
					
				</div>
			</div>
		
		</div>
	)
}

export default AutoPaper
