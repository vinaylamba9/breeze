import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


const ToggleOnBoard = ({ label, linkLabel, link }) => {
    return (
        <div className="mt-4 text-fontsize-brittle mr-10 self-end">
            <p>
                {label}
                <b>
                    <Link className="text-color-darkTeal" to={link}>{linkLabel}</Link>
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