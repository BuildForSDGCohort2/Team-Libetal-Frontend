import React, {Component} from "react";
import Flex from "../../widgets/Flex";
import MaterialDivider from "../../widgets/MaterialDivider";
import GridItem from "../../widgets/grid/GridItem";
import Col from "../../widgets/grid/MaterialCol";
import MaterialTextView from "../../widgets/MaterialTextView";
import Row from "../../widgets/grid/MaterialRow";
import Colors from "../../Colors";
import PropTypes from "prop-types";

export default class ListItemNb extends Component {

    static propTypes = {
        title: PropTypes.string,
        titleFontColor:PropTypes.string,
        titleFontSize:PropTypes.number,
        titleVariant:PropTypes.string,
        bgColor: PropTypes.string,
        bgAlpha: PropTypes.number
    };

    static defaultProps ={
        bgColor:"orange",
        bgAlpha:.8,
        title:"NB",
        titleVariant:"body1"
    }

    render() {
        let {
            grey,
            alpha
        } = Colors;

        let{
            title,
            bgAlpha,
            titleVariant
        } = this.props;

        return (
            <Row alignItems={Flex.CENTER} backgroundColor={alpha(this.props.bgColor,bgAlpha )}>
                <MaterialDivider
                    height={48}
                    width={4}
                    color={grey}
                    orientation={MaterialDivider.VERTICAL}/>
                <GridItem xs={11}>
                    <Col marginLeft={2} paddingTB={4}>
                        <MaterialTextView
                            variant={titleVariant}
                            text={title}
                        />
                        <MaterialTextView fontSize={12}>
                            {this.props.children}
                        </MaterialTextView>
                    </Col>
                </GridItem>
            </Row>
        );
    }
}