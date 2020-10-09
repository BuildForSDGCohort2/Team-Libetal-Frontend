import PropTypes from "prop-types";

const CommitProps = {
    message: PropTypes.string,
    branch: PropTypes.shape({
        name: PropTypes.string
    }),
    author: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string
    }),
    date: PropTypes.string,
    url: PropTypes.string,
    issue: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        cost: PropTypes.shape({
            value: PropTypes.number,
            currency: PropTypes.shape({
                name: PropTypes.string,
                sign: PropTypes.string
            })
        })
    })
};


export default CommitProps;