import LineChart from "./LineChart";
import Chart from "./Chart";

export default class Bar extends LineChart {

    kind = "bar";

    static propTypes = {
        ...Chart.propTypes
    };

    get toolTips() {
        return {};
    }


}