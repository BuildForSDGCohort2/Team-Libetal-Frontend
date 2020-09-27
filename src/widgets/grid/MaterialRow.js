import React from "react";
import PropTypes from "prop-types";
import MaterialGridComponent from "./MaterialGridComponent";

export default class MaterialRow extends MaterialGridComponent {


    direction = "row";

    static propTypes = {
        ...MaterialGridComponent.propTypes
    };

}