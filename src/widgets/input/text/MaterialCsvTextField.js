import React, {Component} from "react";
import Input from "@material-ui/core/Input";
import MaterialFormattedTextField from "./MaterialFormattedTextField";

export default class MaterialCsvTextField extends MaterialFormattedTextField {
    get mask() {
        if (this.maskField === undefined) this.maskField = [/\d/, /\d/, /\d/];
        return this.maskField;
    }
}