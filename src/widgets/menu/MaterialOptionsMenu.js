import React from "react";
import OptionsMenu from "./OptionsMenu";
import PropTypes from "prop-types";


export default class MaterialOptionsMenu extends OptionsMenu {


    static defaultProps = {
        controllerProps: {},
        ...OptionsMenu.defaultProps
    };

    static propTypes = {
        ...OptionsMenu.propTypes,
        controller: PropTypes.any.isRequired,
        controllerBody: PropTypes.any,
        controllerProps: PropTypes.any
    };


    get controller() {
        let {
            controller: Controller,
            controllerBody,
            controllerProps: {onClick, ...controllerProps}
        } = this.props;

        return (
            <Controller onClick={this.open} children={controllerBody} {...controllerProps}/>
        );
    }
}
