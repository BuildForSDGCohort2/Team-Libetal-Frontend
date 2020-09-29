import React, {Component} from "react";
import Row from "../widgets/Row";
import Colors from "../Colors";
import Column from "../widgets/Column";
import MaterialTextView from "../widgets/MaterialTextView";
import Flex from "../widgets/Flex";
import MaterialIcon from "../widgets/MaterialIcon";


export default class Footer extends Component {


    render() {

        let textColor = Colors.white;


        // Parent container affecting left and right margin
        return (
            <>
                <div style={{flexGrow: 1, display: "flex"}}/>
                <Row style={{backgroundColor: Colors.black, ...this.props.style, paddingTop: 16, paddingRight: 16,marginLeft:0}}>
                    <Column xs={6} lg={4}>
                        <Row justify={Flex.CENTER}>
                            <MaterialTextView text={"App Store"} textColor={textColor} variant={"h5"}/>
                        </Row>
                        <Row justify={Flex.END}>
                            <Column xs={7}>
                                <MaterialTextView text={"Pricing"} textColor={textColor}/>
                                <MaterialTextView text={"Hosting"} textColor={textColor}/>
                                <MaterialTextView text={"Projects"} textColor={textColor}/>
                                <MaterialTextView text={"Work"} textColor={textColor}/>
                            </Column>
                        </Row>
                        <Row justify={Flex.CENTER}>
                            <MaterialTextView text={"Requests"} textColor={textColor} variant={"h5"}/>
                        </Row>
                        <Row justify={Flex.END}>
                            <Column xs={7}>
                                <MaterialTextView text={"How It Work"} textColor={textColor}/>
                            </Column>
                        </Row>
                    </Column>
                    <Column xs={6} lg={4}></Column>
                    <Column xs={6} lg={4} alignItems={Flex.END}>
                        <Row justify={Flex.CENTER}>
                            <MaterialTextView text={"About"} textColor={textColor} variant={"h5"}/>
                        </Row>
                        <Row justify={Flex.CENTER}>
                            <MaterialTextView text={"Contacts"} textColor={textColor} variant={"h6"}/>
                        </Row>
                        <Row justify={Flex.END}>
                            <Column xs={6}>
                                <MaterialTextView text={"libetal@email.com"} textColor={textColor}/>
                                <MaterialTextView text={"+257 7xx-xxx-xxx"} textColor={textColor}/>
                            </Column>
                        </Row>
                        <Row justify={Flex.CENTER}>
                            <MaterialTextView text={"Address"} textColor={textColor} variant={"h6"}/>
                        </Row>
                        <Row justify={Flex.END}>
                            <Column xs={6}>
                                <MaterialTextView text={"libetal@email.com"} textColor={textColor}/>
                                <MaterialTextView text={"+257 7xx-xxx-xxx"} textColor={textColor}/>
                                <MaterialTextView text={"P.O.Box 00200-12444"} textColor={textColor}/>
                            </Column>
                        </Row>
                    </Column>
                    <Column xs={12} style={{padding:8}}>
                        <Row spacing={2} justify={Flex.CENTER}>
                           <Column>
                               <MaterialTextView text={"cookie policy"} textColor={textColor}/>
                           </Column>
                           <Column>
                               <MaterialTextView text={"privacy policy"} textColor={textColor}/>
                           </Column>
                           <Column>
                               <MaterialTextView text={"terms & condition"} textColor={textColor}/>
                           </Column>
                           <Column>
                               <Row spacing={1}>
                                   <MaterialTextView text={"Copyright "} textColor={textColor}/>
                                   <MaterialIcon icon={"Copyright"}/>
                                   <MaterialTextView text={" 2020"} textColor={textColor}/>
                               </Row>
                           </Column>
                        </Row>
                    </Column>
                </Row>
            </>
        );
    }
}