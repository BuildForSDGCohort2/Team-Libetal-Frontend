import React from "react";
import ChartJs from "chart.js";
import DataSet from "../DataSet";

export const ChartProps = {
    datasets: [],
    labels: [],
    yAxisStepSize: 1,
    showLegends: true,
    showXAxisGrid: false,
    showyAxisGrid: false,
    xAxisSampleSize: 0,
    xAxisStepSize: 1,
    xAxisLabel: "Text",
    yAxisSampleSize: 0,
    tooltipTitleCallBack: undefined,
    tooltipLabelCallBack: undefined,
    tooltips: {},
    source: undefined,
    autoSkip: false,
    autoSkipPadding: undefined,
    maxRotation: 0,
    minRotation: 0,
    major: {
        // enabled: true,
        // fontStyle: "bold"
    },
    xAxisLabelFormatter: d => d,
    yAxisLabelFormatter: d => d
};

export default class Chart extends React.Component {

    kind = "line";

    props = ChartProps;

    static defaultProps = {
        datasets: [],
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        responsive: true,
        xAxisLabel: "Text",
        showXAxisGrid: false,
        showyAxisGrid: false,
        tooltips: {
            callbacks: {}
        },
        source: "data",
        autoSkip: true,
        autoSkipPadding: 10,
        maxRotation: 0,
        size: 100
    };

    get element() {
        return this.elementField === undefined ? (this.elementField = React.createRef()) : this.elementField;
    }

    // Element might be affected on DidMount!!
    get ctx() {
        return this.element.current.getContext("2d");
    }

    get chartDescription() {
        let {kind, datasets, labels, options} = this.props;

        return {
            type: kind,
            data: {
                labels: labels,
                datasets: datasets
            },
            options
        };
    }

    set chartDescription(value) {
        this.chartDescriptionFiled = value;
    }

    constructor({kind, datasets, labels, options, yAxisLabelFormatter, ...props}) {
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
            hidden
        } = child.props;

        return {
            fill: fillArea,
            label: label,
            data: data,
            pointRadius: pointRadius,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: borderWidth,
            hidden: hidden
        };
    }

    componentDidMount() {

        let {
            labels,
            showLegends,
            yAxisStepSize,
            xAxisStepSize,
            responsive,
            xAxisSampleSize,
            yAxisSampleSize,
            tooltips,
            xAxisLabelFormatter,
            tooltipTitleCallBack,
            tooltipLabelCallBack,
            xAxisLabel,
            yAxisLabelFormatter,
            showGridLines = true,
            scaleLabel,
            source,
            autoSkip,
            autoSkipPadding,
            maxRotation,
            minRotation,
            sampleSize,
            major = {},
            distribution,
            datasets
        } = this.props;

        let {callbacks: {title, label, ...callbacks}, ...cTooltips} = tooltips;

        callbacks = {
            ...callbacks,
            title: tooltipTitleCallBack || title,
            label: tooltipLabelCallBack || label
        };

        tooltips = {
            ...cTooltips,
            callbacks
        };

        scaleLabel = {
            ...scaleLabel
        };

        if (xAxisLabel !== undefined) {
            scaleLabel.labelString = xAxisLabel;
            scaleLabel.display = true;
        }

        this.myChart = new ChartJs(this.canvasRef.current, {
            responsive,
            type: this.kind,
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                tooltips: tooltips,
                legend: {
                    display: showLegends
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: showGridLines
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
                            callback: yAxisLabelFormatter
                        }
                    }],
                    xAxes: [
                        {
                            gridLines: {
                                display: showGridLines
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
                                callback: xAxisLabelFormatter
                            },
                            scaleLabel: scaleLabel
                        }
                    ]
                }
            }
        });
    }

    get usingChildren() {
        return this.props.datasets.length === 0;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.myChart.data.labels = this.props.labels;


        this.myChart.data.datasets = this.datasets;
        // this.myChart.data.datasets[0].data = this.props.dataset
        this.myChart.update();
    }

    componentWillUnmount() {
        this.chartDescription = undefined;
        this.chart = undefined;
    }

    /**setup responsive properties*/
    setUpResponsiveness() {

    }

    render() {
        let {height, style = {}, ...props} = this.props;

        let {height: cHeight, ...cStyle} = style;


        style = {
            ...cStyle,
            height: height || cHeight
        };


        return (<canvas {...props} style={style} ref={this.canvasRef}/>);
    }

}