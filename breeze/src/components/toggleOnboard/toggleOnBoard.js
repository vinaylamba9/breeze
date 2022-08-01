import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


const ToggleOnBoard = ({ label, linkLabel, link }) => {
    return (
        <div className="mt-5% text-fontsize-brittle mr-10% self-end">
            <p className="text-fontsize-brittle text-text-color-dark">
                {label}
                <b>
                    <Link className="text-color-darkTeal no-underline" to={link}>{linkLabel}</Link>
                </b>
            </p>
        </div>
    )
}
ToggleOnBoard.propTypes = {
    label: PropTypes.string.isRequired,
    linkLabel: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
}

export default ToggleOnBoard