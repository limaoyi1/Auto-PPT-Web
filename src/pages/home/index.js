/**
 * description：
 * @author Kevin
 * @date 2023/7/5
 */
import "./index.scss"
import {useNavigate} from "react-router-dom"
import memory from "@utils/memory";

function Home() {
	const navigate = useNavigate();
	/**
	 * 前往写报告界面
	 */
	const navToAutoPaper = () => {
		memory.clearCache()
		navigate("/auto-paper")
	}
	
	return <div className="home">
		<div className="home-title">A I智能报告写作助手</div>
		<div className="home-subtitle">基于LLM大模型开发的一款用于编写报告文档的Ai智能写作工具，让您快速创建高质量报告文档，提高工作效率和质量！</div>
		<div className="home-btn" onClick={navToAutoPaper}>
			立即体验
		</div>
	</div>
}

export default Home
