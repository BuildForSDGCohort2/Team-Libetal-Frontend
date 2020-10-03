import React, {Component} from "react";
import MaterialGrid from "./MaterialGrid";

export default class MaterialInputLayout extends Component {


    render() {

        // TODO padding should be height of the input label
        let style = {
            paddingTop: 4
        }

        if (this.props.style !== undefined) {
            style = {...this.props.style, style}
        }

        return (
            <MaterialGrid {...this.props} style={style}>
                {this.props.children}
            </MaterialGrid>
        );
    }

}