import React, {Component} from "react";
import TrendingIssueView from "./TrendingIssueView";
import Colors from "../../../Colors";
import Col from "../../../widgets/grid/MaterialCol";
import Column from "../../../widgets/grid/MaterialCol";
import Row from "../../../widgets/grid/MaterialRow";
import Flex from "../../../widgets/Flex";
import GridItem from "../../../widgets/grid/GridItem";
import MaterialOptionsMenu from "../../../widgets/menu/MaterialOptionsMenu";
import MaterialBtn from "../../../widgets/MaterialBtn";
import MaterialMenuItem from "../../../widgets/menu/MaterialMenuItem";
import MaterialTextView from "../../../widgets/MaterialTextView";
import MaterialIcon from "../../../widgets/MaterialIcon";
import MaterialDivider from "../../../widgets/MaterialDivider";
import MaterialCol from "../../../widgets/grid/MaterialCol";
import CharButton from "./CharButton";

export default class SimilarIssueView extends Component {

    static propTypes = TrendingIssueView.propTypes;


    render() {
        let {
            issue
        } = this.props;

        let {
            id,
            title,
            assignee: {
                name: assigneeName
            },
            project: {
                name: projectName
            },
            priority,
            state,
            type,
            date: creationDate

        } = issue;

        let t = type[0].toUpperCase();
        let color;


        switch (t) {
            case "B":
                color = Colors.red;
                break;
            case "F":
                color = Colors.green;
                break;
            case "P":
                color = Colors.purple;
                break;
            default:
                color = Colors.orange;
                break;
        }

        return (
            <Col>
                <Row alignItems={Flex.STRETCH}>
                    <GridItem xs={1}>
                        <Column height={"100%"} justify={Flex.SPACE_BETWEEN}>
                            <Row>
                                <MaterialOptionsMenu
                                    id={`issue-${id}options-menu`}
                                    controller={CharButton}
                                    header={"Type"}
                                    controllerProps={
                                        {
                                            char: t,
                                            buttonColor: color,
                                            charColor: Colors.white
                                        }
                                    }
                                    menuItems={[
                                        {
                                            key: 0,
                                            title: <MaterialMenuItem title={`Option`} titleFontSize={12}/>
                                        }
                                    ]}
                                />
                            </Row>
                        </Column>
                    </GridItem>
                    <GridItem xs={11}>
                        <Row>
                            <GridItem xs={8}>
                                <MaterialTextView
                                    text={title}
                                    textColor={Colors.blue}
                                />
                            </GridItem>
                            <GridItem xs={4}>
                                <MaterialBtn
                                    variant={"text"}
                                    content={"100+"}
                                    startIcon={
                                        <MaterialIcon
                                            icon={"AttachFile"}
                                            iconSize={18}
                                            color={color}
                                        />
                                    }
                                    style={{
                                        padding: 0
                                    }}
                                />
                                <MaterialBtn
                                    variant={"text"}
                                    content={"100+"}
                                    startIcon={
                                        <MaterialIcon
                                            icon={"Chat"}
                                            iconSize={18}
                                            color={color}
                                        />
                                    }
                                    style={{
                                        padding: 0
                                    }}
                                />
                            </GridItem>
                        </Row>
                    </GridItem>
                </Row>
                <MaterialDivider spacing={6}/>
            </Col>
        );
    }
}