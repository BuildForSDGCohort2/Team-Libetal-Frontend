import React, {Component} from "react";

/*Should behave like abstract class*/
export default class Page extends Component {

    props = {

    };

    render() {
        throw Error(`implement ${this}.render()`);
    }
}