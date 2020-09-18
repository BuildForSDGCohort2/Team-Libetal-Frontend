import React from "react";
import Chart, {ChartProps, ChartPropTypes} from "./Chart";
import PropTypes from "prop-types";

const DoughnutPropTypes = {
    ...ChartProps,
};


export default class Doughnut extends Chart {

    kind = "doughnut";

    static propTypes ={
        ...ChartPropTypes,
        labelCallback: PropTypes.func,
    }

    static defaultProps = DoughnutPropTypes;

    get scales() {
        return {};
    }

    get toolTips() {
        let {
            tooltipLabelCallBack,
            tooltipTitleCallBack
        } = this.props;

        let callbacks = {};

        if (tooltipLabelCallBack !== undefined) callbacks.label = tooltipLabelCallBack;

        if (tooltipTitleCallBack !== undefined) callbacks.title = tooltipTitleCallBack;

        return {
            callbacks
        };
    }

    get options() {

        return {
            tooltips: this.toolTips,
            responsive: true,
            legend: {
                position: "top",
                display: this.props.showLegends
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        };
    }

    get childrenDatasets() {
        let {datasets} = this.props;

        if (this.childrenDatasetsField === undefined) {
            this.childrenDatasetsField = datasets;
        }

        return this.childrenDatasetsField;
    }

    /**
     * TODO fetch data
     * then update item
     * */
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.needsUpdate = true;
        this.chart.data.datasets = this.props.datasets;
        this.chart.data.labels = this.props.labels;
        this.needsUpdate = false;
        this.chart.update();
    }
}

