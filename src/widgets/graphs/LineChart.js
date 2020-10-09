import React from "react";
import Chart from "./Chart";
import PropTypes from "prop-types";


export default class LineChart extends Chart {

    kind = "line";

    static propTypes = {
        ...Chart.propTypes
    };
}