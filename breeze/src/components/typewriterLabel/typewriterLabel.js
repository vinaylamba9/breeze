import { useTypewriter, Cursor } from "react-simple-typewriter";
import PropTypes from "prop-types";
import { TypeWriterTextList } from "constants/application";
const TypewriterLabel = ({ label }) => {


    const { text } = useTypewriter({
        words: TypeWriterTextList,
        loop: true,
        typeSpeed: 200,
        deleteSpeed: 100,
        delaySpeed: 1500,
        onLoopDone: () => console.log(`loop completed after 3 runs.`),
    })
    return (
        <h2 className="mt-5% mb-10% text-fontsize-pearl text-background-color-jade">
            <b>{label}
                <span className="text-color-darkTeal">
                    {text}
                </span>
                <Cursor cursorStyle={"|"} />
            </b>
        </h2>
    );
};

TypewriterLabel.propTypes = {
    label: PropTypes.string.isRequired,
}

export default TypewriterLabel;