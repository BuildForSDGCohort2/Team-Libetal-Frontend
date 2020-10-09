import React from "react";
import Chart from "./Chart";
import PropTypes from "prop-types";


export default class Doughnut extends Chart {

    kind = "doughnut";

    static propTypes = {
        ...Chart.propTypes,
        labelCallback: PropTypes.func
    };

    static defaultProps = {
        ...Chart.defaultProps
    };

    get scales() {
        return {};
    }

    get toolTips() {
        let {
            tooltipLabelCallBack,
            tooltipTitleCallBack
        } = this.props;

        let callbacks = {};

        // does not play well with others
        // if (tooltipLabelCallBack !== undefined) callbacks.label = tooltipLabelCallBack;

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

