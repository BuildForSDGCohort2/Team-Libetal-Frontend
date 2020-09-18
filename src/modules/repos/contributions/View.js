import * as React from "react";

export default class View extends React.Component {

    constructor(props) {
        super(props);

        this.ref=React.createRef()
    }

    /*TODO wrap with fragment to provide for trial HOC*/
    getLayout(props) {
        throw new Error(`Implement getLayout for ${this}`)
    }

    render() {
        return this.getLayout(this.props);
    }
}