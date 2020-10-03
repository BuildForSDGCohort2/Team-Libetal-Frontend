import React from "react";


export default class Fragment extends React.Component {


    render() {

        let props = {...this.props};

        return (
            this.props.children(...props)
        );
    }
}