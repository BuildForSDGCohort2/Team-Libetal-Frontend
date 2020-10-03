import React from "react";
import Colors from "../../Colors";
import Doughnut from "./Doughnut";

let randomScalingFactor = function () {
    return Math.round(Math.random() * 100);
};

export default class Radar extends Doughnut {

    kind = "radar";


    static defaultProps = {
        labels: [["Eating", "Dinner"], ["Drinking", "Water"], "Sleeping", ["Designing", "Graphics"], "Coding", "Cycling", "Running"],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: Colors.red,
                borderColor: Colors.red,
                pointBackgroundColor: Colors.red,
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ]
            },
            {
                label: "My Second dataset",
                backgroundColor: Colors.blue,
                borderColor: Colors.black,
                pointBackgroundColor: Colors.pink,
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ]
            }
        ]
    };

    get data() {
        return {
            labels: this.props.labels,
            datasets: this.props.datasets
        };
    }

    get toolTips() {
        let {
            labelCallback,
            titleCallback
        } = this.props;

        let callbacks = {};

        if (labelCallback !== undefined) callbacks.label = labelCallback;

        if (titleCallback !== undefined) callbacks.title = titleCallback;

        return {
            callbacks
        };
    }

    get configs() {

        return {
            type: "radar",
            data: this.data,
            options: this.options
        };

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.chart.data.labels = this.props.labels;

        this.chart.data.datasets = this.props.datasets;
        // this.myChart.data.datasets[0].data = this.props.dataset
        this.chart.update();
    }

}