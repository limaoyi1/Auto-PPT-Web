import "./index.scss"
import icon_warning from "@statics/images/icon_warning.png"

const Tooltip = () => {
	return (
		<div className="tooltipWrap">
			<img src={icon_warning} alt="" />
			<span className="tooltip">声明：内容为模型概率生成，可能产生不正确的信息，不代表TiDoc的观点和立场</span>
		</div>
	)
}

export default Tooltip
