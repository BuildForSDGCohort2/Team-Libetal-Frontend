import React, {Component} from "react";
import MaterialRow from "../../widgets/grid/MaterialRow";
import PropTypes from "prop-types";
import GridItem from "../../widgets/grid/GridItem";
import MaterialDivider from "../../widgets/MaterialDivider";
import Flex from "../../widgets/Flex";
import TabsLayout from "../../widgets/TabsLayout";
import MaterialCol from "../../widgets/grid/MaterialCol";
import MaterialBtn from "../../widgets/MaterialBtn";
import Colors from "../../Colors";
import MaterialMenuItem from "../../widgets/menu/MaterialMenuItem";
import MaterialOptionsMenu from "../../widgets/menu/MaterialOptionsMenu";
import MaterialTextView from "../../widgets/MaterialTextView";
import Separator from "../../widgets/separator";
import MaterialIcon from "../../widgets/MaterialIcon";
import Chip from "@material-ui/core/Chip";


/**
 * Should display all details in terms of the issue relation
 * */


export default class PullRequestListItemView extends Component {


    static propTypes = {
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        cost: PropTypes.shape({
            value: PropTypes.number,
            currency: PropTypes.shape({
                name: PropTypes.string,
                sign: PropTypes.string
            })
        }),
        task: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            estimatedTime: PropTypes.string,
            cost: PropTypes.shape({
                estimated: PropTypes.shape({
                    value: PropTypes.number,
                    sign: PropTypes.string
                })
            }),
            assignee: PropTypes.shape({
                name: PropTypes.string
            }),
            by: PropTypes.shape({
                name: PropTypes.string
            }),
            project: PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string
            }),
            priority: PropTypes.string,
            state: PropTypes.shape({
                id: PropTypes.number,
                title: PropTypes.string,
                description: PropTypes.string
            }),
            type: PropTypes.shape({
                id: PropTypes.number,
                title: PropTypes.string,
                descriptions: PropTypes.string
            }),
            date: PropTypes.string,
            attachments: PropTypes.arrayOf(PropTypes.string),
            milestones: PropTypes.arrayOf(PropTypes.string),
            tags: PropTypes.arrayOf(PropTypes.string)
        }),
        key: PropTypes.number
    };

    static defaultProps = {
        cost: {
            value: 0,
            currency: {
                name: "K.Shilling",
                sign: "KSH"
            }
        },
        task: {
            title: "Issue Title",
            estimatedTime: "2h",
            cost: {
                value: 1000,
                currency: {
                    name: "Dollar",
                    sign: "$"
                }
            },
            assignee: {
                name: "PropTypes.string"
            },
            by: {
                name: "PropTypes.string"
            },
            project: {
                id: "PropTypes.number",
                name: "PropTypes.string"
            },
            priority: "PropTypes.string",
            state: {
                id: "PropTypes.number",
                title: "PropTypes.string",
                description: "PropTypes.string"
            },
            type: {
                id: "PropTypes.number",
                title: "PropTypes.string",
                descriptions: "PropTypes.string"
            },
            date: "PropTypes.string",
            attachments: [
                ""
            ],
            milestones: [
                ""
            ],
            tags: [
                ""
            ]
        },
        key: 1
    };

    tabItem(text, i, size) {
        let divider;

        if (i < size) divider =
            <GridItem><MaterialRow><MaterialDivider height={18}
                                                    orientation={MaterialDivider.VERTICAL}/></MaterialRow></GridItem>;
        return (
            <MaterialRow justify={Flex.SPACE_BETWEEN} alignItems={Flex.CENTER} spacing={1}>
                <GridItem>{text}</GridItem>
                {divider}
            </MaterialRow>
        );
    }

    get footerTabs() {
        let {
            id,
            title,
            description,
            cost: {
                costValue,
                currency: {
                    sign,
                    name
                }
            },
            task: {}
        } = this.props;

        let tabsStrings = [
            `M.C: ${sign}:${costValue}/=`
        ];

        return (

            <TabsLayout
                variant={TabsLayout.VARIANT.SCROLLABLE}
                showIndicator={false}
                orientation={"horizontal"}
                tabStyle={{margin: 0, paddingLeft: 4}}
                tabs={
                    tabsStrings.map(
                        (string, i) => ({
                            key: i,
                            label: this.tabItem(string, i, tabsStrings.length - 1)
                        })
                    )}
            />

        );
    }

    get footer() {


        return (
            <MaterialRow alignItems={Flex.CENTER} marginTB={4}>
                <GridItem xs={8} lg={8}>
                    {this.footerTabs}
                </GridItem>
                <GridItem xs={4} lg={4}>
                    <MaterialRow justify={Flex.SPACE_AROUND} alignItems={Flex.CENTER}>
                        <Chip
                            size={"small"}
                            icon={
                                <MaterialIcon icon={"Message"} iconSize={12} color={Colors.white}/>
                            }
                            label={"100+"}
                            style={{
                                backgroundColor: Colors.blue,
                                color: Colors.white
                            }}
                        />
                        <Chip
                            size={"small"}
                            label={"10+"}
                            icon={
                                <MaterialIcon icon={"ReportOutlined"} color={Colors.white} iconSize={12}/>
                            }
                            style={{
                                backgroundColor: Colors.red,
                                color:Colors.white
                            }}
                        />
                    </MaterialRow>
                </GridItem>
            </MaterialRow>
        );
    }


    get typeBreakDown() {

        let {
            task: {
                type: {
                    id: typeId,
                    title: typeTitle = "",
                    description: typeDescription
                } = {}
            }
        } = this.props;

        let color;

        let t = typeTitle[0];

        switch (typeTitle[0]) {
            case "F":
                color = Colors.green;
                break;
            case "B":
                color = Colors.red;
                break;
            case "D":
                color = Colors.blue;
                break;
            case "R":
                color = Colors.orange;
                break;
            default:
                color = Colors.black;
        }

        return [t, color];
    }

    render() {
        let {
            props: {
                title,
                description,
                merged,
                cost: {
                    value: mergeCost,
                    currency: {
                        name: mergeCostCurrencyName,
                        sign: mergeCostCurrencySign
                    } = {}
                } = {},
                task: {
                    title: taskTitle,
                    estimatedTime,
                    cost: {
                        taskEstimateCost = 100,
                        currency: {
                            name: currencyName,
                            sign: currencySign
                        } = {}
                    } = {},
                    assignee: {
                        name: assigneeName
                    } = {},
                    by: {
                        name: byName
                    } = {},
                    project: {
                        id: projectId,
                        name: projectName
                    } = {},
                    priority: taskPriority,
                    state: {
                        id: stateId,
                        title: stateTitle,
                        description: stateDescription
                    } = {},
                    type: {
                        id: typeId,
                        title: typeTitle = "",
                        description: typeDescription
                    } = {},
                    date: requestPostDate,
                    attachments,
                    milestones,
                    tags
                },
                key
            }

        } = this;


        let [t, color] = this.typeBreakDown;

        let costDeviation = mergeCost - taskEstimateCost;
        let costDeviationColor = Colors.blue;
        if (taskEstimateCost / costDeviation > 1) {
            costDeviationColor = Colors.red;
        }

        return (
            <MaterialCol marginBottom={8} alignItems={Flex.CENTER}>
                <MaterialRow>
                    <GridItem xs={1}>
                        <MaterialOptionsMenu
                            id={`issue-${key}-options-menu`}
                            controller={MaterialBtn}
                            header={t}
                            controllerProps={
                                {
                                    style: {
                                        minWidth: 0,
                                        minHeight: 0,
                                        paddingTop: 2,
                                        paddingBottom: 2,
                                        paddingLeft: 8,
                                        paddingRight: 8
                                    },
                                    content: t || "U",
                                    color: color,
                                    textColor: Colors.white,
                                    title: typeDescription || "Undefined Issue type"
                                }
                            }
                            menuItems={[
                                {
                                    key: 0,
                                    title: <MaterialMenuItem title={`Option`} titleFontSize={12}/>
                                }
                            ]}
                        />
                    </GridItem>
                    <GridItem xs={11}>
                        <MaterialRow>
                            <GridItem xs={8}>
                                <MaterialTextView
                                    textColor={Colors.blue}
                                    text={title}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                />
                                <MaterialTextView
                                    text={description}
                                />
                            </GridItem>
                            <GridItem xs={4}>
                                <MaterialTextView
                                    text={"Cost"}
                                />
                                <MaterialRow alignItems={Flex.END}>
                                    <GridItem xs={4}>
                                        <MaterialTextView
                                            text={"estimate.cost: "}
                                            fontSize={12}
                                        />
                                    </GridItem>
                                    <GridItem xs={4}>
                                        <MaterialTextView
                                            text={`${currencySign}:${taskEstimateCost}/=`}
                                        />
                                    </GridItem>
                                    <GridItem xs={4}>

                                    </GridItem>
                                </MaterialRow>
                                <MaterialRow alignItems={Flex.END}>

                                    <GridItem xs={4}>
                                        <MaterialTextView
                                            text={"merge.cost: "}
                                            fontSize={12}
                                        />
                                    </GridItem>
                                    <GridItem xs={4}>
                                        <MaterialTextView
                                            text={`${mergeCostCurrencySign}:${mergeCost}/=`}
                                        />

                                    </GridItem>
                                    <GridItem xs={4}>

                                    </GridItem>
                                </MaterialRow>

                                <MaterialRow alignItems={Flex.END}>
                                    <GridItem xs={4}>
                                        <MaterialTextView
                                            text={"cost deviation: "}
                                            fontSize={12}
                                        />
                                    </GridItem>
                                    <GridItem xs={4}>
                                        <MaterialTextView
                                            text={`${mergeCostCurrencySign}:${costDeviation}/=`}
                                            textColor={costDeviationColor}
                                        />
                                    </GridItem>
                                    <GridItem xs={4}></GridItem>
                                </MaterialRow>
                                {
                                    merged ? (
                                            <MaterialBtn
                                                content={"Merged"}
                                                color={Colors.green}
                                                textColor={Colors.white}
                                            />
                                        ) :
                                        (
                                            <MaterialBtn
                                                content={"Evaluate & Merge"}
                                                color={Colors.purple}
                                                textColor={Colors.white}
                                            />
                                        )
                                }
                            </GridItem>
                        </MaterialRow>
                        {this.footer}
                    </GridItem>
                </MaterialRow>
                <MaterialDivider width={"80%"}/>
            </MaterialCol>
        );
    }
}