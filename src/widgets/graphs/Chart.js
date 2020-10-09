import React from "react";
import ChartJs from "chart.js";
import DataSet from "../DataSet";
import PropTypes from "prop-types";

export default class Chart extends React.Component {

    kind = "line";

    static defaultProps = {
        datasets: [],
        labels: [],
        yAxisStepSize: 0,
        showLegends: true,
        showGridLines: true,
        showXAxisGrid: false,
        showYAxisGrid: false,
        xAxisSampleSize: 0,
        xAxisStepSize: 1,
        xAxisLabel: "xLabel xAxisLabel",
        showLabels: true,
        tooltipTitleCallBack(toolTips, data) {
            try {
                if (Array.isArray(toolTips)) {
                    return toolTips.map(t => data.datasets[t.datasetIndex].label);
                } else return data.datasets[toolTips.datasetIndex].label;
            } catch (e) {
                console.log(e);
            }
        },
        onDidMount(chart) {

        },
        tooltipLabelCallBack(toolTip) {
            return toolTip.xLabel;
        },
        tooltips: {
            callbacks: {}
        },
        source: undefined,
        autoSkip: false,
        autoSkipPadding: undefined,
        maxRotation: 90,
        minRotation: 0,
        responsive: true,
        size: 100,
        major: {
            // enabled: true,
            // fontStyle: "bold"
        },
        xAxisLabelFormatter: d => d,
        yAxisLabelFormatter: d => d
    };

    static propTypes = {
        datasets: PropTypes.array,
        labels: PropTypes.array,
        yAxisStepSize: PropTypes.number,
        showLegends: PropTypes.bool,
        showXAxisGrid: PropTypes.bool,
        showYAxisGrid: PropTypes.bool,
        showGridLines: PropTypes.bool,
        xAxisSampleSize: PropTypes.number,
        xAxisStepSize: PropTypes.number,
        xAxisLabel: PropTypes.string,
        showXAxisLabel: PropTypes.bool,
        showLabels: PropTypes.bool,
        showYAxisLabel: PropTypes.bool,
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
        onDidMount: PropTypes.func,
        xAxisLabelFormatter: PropTypes.func,
        yAxisLabelFormatter: PropTypes.func,
        yAxisTextColor: PropTypes.string,
        xAxisTextColor: PropTypes.string,
        yAxisGridLineColor: PropTypes.string,
        xAxisGridLineColor: PropTypes.string
    };

    get element() {
        return this.elementField === undefined ? (this.elementField = React.createRef()) : this.elementField;
    }

    // Element might be affected on DidMount!!
    get ctx() {
        return this.element.current.getContext("2d");
    }

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    needsUpdate = false;

    get childrenDatasets() {
        let {children} = this.props;

        if (this.needsUpdate || this.childrenDatasetsField === undefined) {

            let set = [];

            if (children !== undefined) {

                try {
                    set = children.map(this.extractDataset);
                } catch (e) {
                    set = this.extractDataset(children);
                }
            }

            this.childrenDatasetsField = set;
        }

        return this.childrenDatasetsField;
    }

    set childrenDatasets(value) {
        this.childrenDatasetsField = value;
    }

    get datasets() {

        let datasets;

        if (this.usingChildren) {
            this.needsUpdate = true;
            datasets = this.childrenDatasets;
        } else datasets = this.props.datasets;

        return datasets;

    }

    extractDataset(child = <DataSet/>) {

        let {
            fillArea = false,
            label,
            data,
            backgroundColor,
            borderColor,
            pointRadius,
            borderWidth,
            hidden,
            type = undefined
        } = child.props;

        return {
            fill: fillArea,
            label: label,
            data: data,
            pointRadius: pointRadius,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: borderWidth,
            hidden: hidden,
            type: type
        };
    }

    get toolTips() {

        if (this.toolTipsField === undefined) {
            let {
                tooltips,
                tooltipTitleCallBack,
                tooltipLabelCallBack
            } = this.props;

            let {callbacks: {title, label, ...callbacks}, ...cTooltips} = tooltips;

            callbacks = {
                ...callbacks,
                title: tooltipTitleCallBack || title,
                label: tooltipLabelCallBack || label
            };

            this.toolTipsField = {
                ...cTooltips,
                callbacks
            };
        }

        return this.toolTipsField;
    }

    get xAxis() {
        let {
            xAxisStepSize = 1,
            xAxisSampleSize,
            xAxisLabelFormatter,
            xAxisLabel,
            showLabels,
            showXAxisLabel = showLabels,
            showGridLines,
            showXAxisGrid = showGridLines,
            scaleLabel: {...scaleLabel} = {},
            source,
            autoSkip,
            autoSkipPadding,
            maxRotation,
            minRotation,
            // TODO setup to support types
            xAxisType,
            sampleSize,
            major = {},
            distribution,
            xAxisTextColor,
            xAxisGridLineColor
        } = this.props;

        if (xAxisLabel !== undefined) {
            scaleLabel.labelString = xAxisLabel;
            scaleLabel.display = showXAxisLabel;
        }

        return {
            xAxes: [
                {
                    gridLines: {
                        display: showXAxisGrid,
                        color: xAxisGridLineColor
                    },
                    ticks: {
                        major: major,
                        source: source,
                        autoSkip: autoSkip,
                        autoSkipPadding: autoSkipPadding,
                        maxRotation: maxRotation,
                        minRotation: minRotation,
                        sampleSize: sampleSize,
                        distribution: distribution,
                        callback: xAxisLabelFormatter,
                        xAxisStepSize: xAxisStepSize,
                        xAxisSampleSize: xAxisSampleSize,
                        fontColor: xAxisTextColor
                    },
                    scaleLabel: scaleLabel
                }
            ]
        };
    }

    get yAxis() {
        let {
            yAxisStepSize,
            yAxisSampleSize,
            yAxisLabelFormatter,
            showGridLines,
            showYAxisGrid = showGridLines,
            source,
            autoSkip,
            yAxisScaleLabel: {...yAxisScaleLabel} = {},
            autoSkipPadding,
            maxRotation,
            minRotation,
            yAxisLabel,
            showLabels,
            showYAxisLabel = showLabels,
            major = {},
            distribution,
            yAxisTextColor,
            yAxisGridLineColor
        } = this.props;

        if (yAxisLabel !== undefined) {
            yAxisScaleLabel.labelString = yAxisLabel;
            yAxisScaleLabel.display = showYAxisLabel;
        }

        return {
            yAxes: [{
                gridLines: {
                    display: showYAxisGrid,
                    color: yAxisGridLineColor
                },
                ticks: {
                    major: major,
                    source: source,
                    autoSkip: autoSkip,
                    autoSkipPadding: autoSkipPadding,
                    maxRotation: maxRotation,
                    minRotation: minRotation,
                    distribution: distribution,
                    beginAtZero: true,
                    stepSize: yAxisStepSize,
                    sampleSize: yAxisSampleSize,
                    callback: yAxisLabelFormatter,
                    fontColor: yAxisTextColor
                },
                scaleLabel: yAxisScaleLabel
            }]
        };
    }

    get scales() {
        return {
            ...this.yAxis,
            ...this.xAxis
        };
    }

    get options() {
        let {
            showLegends
        } = this.props;

        return {
            tooltips: this.toolTips,
            legend: {
                display: showLegends
            },
            scales: this.scales
        };
    }

    get data() {
        let {
            labels,
            datasets
        } = this.props;

        return {
            labels: labels,
            datasets: datasets
        };
    }

    get configs() {

        return {
            responsive: this.props.responsive,
            type: this.kind,
            data: this.data,
            options: this.options
        };

    }

    set configs(value) {
        this.configsField = value;
    }

    get chart() {
        if (this.myChartField === undefined) {
            this.myChartField = new ChartJs(this.canvasRef.current, this.configs);
        }

        return this.myChartField;
    }

    set chart(value) {
        this.myChartField = value;
    }

    componentDidMount() {
        this.chart = this.chart;
        let {onDidMount} = this.props;


        if (typeof onDidMount === "function") {
            onDidMount(this.chart);
        }
    }


    get usingChildren() {
        return this.props.datasets.length === 0;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let {
            props: {
                yAxisStepSize,
                labels
            },
            options
        } = this;

        this.chart.data.labels = labels;

        this.chart.options = options;

        this.chart.data.datasets = this.datasets;
        // this.myChart.data.datasets[0].data = this.props.dataset
        this.chart.update();
    }

    componentWillUnmount() {
        this.chart = undefined;
    }

    render() {
        let {height, style = {}} = this.props;

        let {height: cHeight, ...cStyle} = style;

        style = {
            ...cStyle,
            height: height || cHeight
        };

        return (<canvas height={height} style={style} ref={this.canvasRef}/>);
    }

}