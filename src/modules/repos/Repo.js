import React,{Component} from "react";
import Row from "../../widgets/Row";

export default class Repo extends Component{


    render() {
        console.log(this.props.location)
        return (
            <Row>
                Project View
            </Row>
        );
    }
}