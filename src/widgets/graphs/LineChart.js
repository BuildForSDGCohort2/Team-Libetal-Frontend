import React from "react";
import Chart from "./Chart";
import PropTypes from "prop-types";


export default class LineChart extends Chart {

    kind = "line";

    static propTypes = {
        datasets: PropTypes.arrayOf(
            PropTypes.shape({})
        ),
        labels: PropTypes.array,
        yAxisStepSize: PropTypes.number,
        showLegends: PropTypes.bool,
        showXAxisGrid: PropTypes.bool,
        showyAxisGrid: PropTypes.bool,
        xAxisSampleSize: PropTypes.number,
        xAxisStepSize: PropTypes.number,
        xAxisLabel: PropTypes.string,
        showXAxisLabel: PropTypes.bool,
        yAxisSampleSize: PropTypes.number,
        tooltipTitleCallBack: PropTypes.func,
        tooltipLabelCallBack: PropTypes.func,
        tooltips: PropTypes.object,
        source: PropTypes.object,
        autoSkip: PropTypes.bool,
        autoSkipPadding: PropTypes.object,
        maxRotation: PropTypes.number,
        minRotation: PropTypes.number,
        responsive: PropTypes.bool,
        size: PropTypes.number,
        major: PropTypes.object,
        xAxisLabelFormatter: PropTypes.func,
        yAxisLabelFormatter: PropTypes.func,
        yAxisTextColor: PropTypes.string,
        xAxisTextColor: PropTypes.string,
        yAxisGridLineColor:PropTypes.string,
        xAxisGridLineColor:PropTypes.string
    };
}