import { Tooltip } from "react-tooltip";

const { Fragment } = require("react");

const BreezeTooltip = ({ children, id }) => {
	return (
		<Fragment>
			<a>{children}</a>
			<Tooltip id={id} />
		</Fragment>
	);
};

export default BreezeTooltip;
