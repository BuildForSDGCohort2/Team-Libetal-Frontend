import React from "react";
import Chart from "./Chart";
import DataSet from "../DataSet";


class DoughnutDataset extends DataSet {

}

const DoughnutProps = {
    datasets: [],
    colors: []
};

export default class Doughnut extends Chart {
    kind = "doughnut";

    props = DoughnutProps;

}


