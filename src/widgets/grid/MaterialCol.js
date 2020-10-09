import React from "react";
import Flex from "../Flex";
import MaterialGridComponent from "./MaterialGridComponent";

export default class MaterialCol extends MaterialGridComponent {

    direction = "column";

    static propTypes = {
        ...MaterialGridComponent.propTypes
    };

    static defaultProps = {
        alignItems: Flex.START,
        justify: Flex.START
    };

}