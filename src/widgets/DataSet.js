import React from "react";
import PropTypes from "prop-types";

export default class DataSet extends React.Component {

    prop = {
        label: "DataSetLabel",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        fillArea: false,
        pointRadius: 0,
        hidden: false,

    };

    static propTypes = {
        type: PropTypes.oneOf(["bar","line"]),
        hidden:PropTypes.bool,
        fillArea:PropTypes.bool,
        label:PropTypes.string,
        pointRadius:PropTypes.number,
        data:PropTypes.array,
        backgroundColor:PropTypes.string,
        borderColor:PropTypes.string,
        borderWidth:PropTypes.number,
    };

    static defaultProps = {
        hidden: false,
        fillArea: false,
        label: "DataSetLabel",
        pointRadius: 0,
        data: [12, 3, 4, 5, 6, 6],
        backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
    };

    constructor({fillArea, label, data, backgroundColor, borderColor, borderWidth, ...props}) {
        super(props);
    }

    render() {
        return (<></>);
    }
}