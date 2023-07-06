/**
 * description：
 * @author Kevin
 * @date 2023/7/5
 */
import "./index.scss"
import {Button, Form, Input, InputNumber, Steps} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons"
import ThButton from "@comp/button";
import {generate_title} from "@services/generate";

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
	/**
	 * 第一步
	 */
	const firstStep = async () => {
		try {
			let values = await form.validateFields()
			const cb = str => {
				console.log(str, 'str=======================strstr')
			}
			await generate_title({...values, cb})
		} catch (e) {
		
		}
	}
	
	return (
		<div className="auto-paper">
			<div className="auto-paper-box">
				<Steps current={0} items={items}/>
				{/*第一步*/}
				<div className="form step-1">
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
				<div className="form step-2">
				
				</div>
			</div>
		
		</div>
	)
}

export default AutoPaper
