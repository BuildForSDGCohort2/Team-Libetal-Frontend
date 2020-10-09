import React from "react";
import MaterialGridComponent from "./MaterialGridComponent";

export default class MaterialRow extends MaterialGridComponent {


    direction = "row";

    static propTypes = {
        ...MaterialGridComponent.propTypes
    };

}