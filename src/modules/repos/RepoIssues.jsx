import React, {Component} from "react";
import MaterialCol from "../../widgets/grid/MaterialCol";
import MaterialRow from "../../widgets/grid/MaterialRow";
import MaterialDivider from "../../widgets/MaterialDivider";
import InputBase from "@material-ui/core/InputBase";
import MaterialIconButton from "../../widgets/button/MaterialIconButton";
import Flex from "../../widgets/Flex";
import GridItem from "../../widgets/grid/GridItem";
import IssuesListView from "../dashboard/issues/IssuesListView";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import MaterialSelect from "../../widgets/input/MaterialSelect";
import MaterialBtn from "../../widgets/MaterialBtn";
import Colors from "../../Colors";
import Separator from "../../widgets/separator";
import MaterialTextView from "../../widgets/MaterialTextView";
import PropTypes from "prop-types";
import PaginationController from "../../widgets/PaginationController";
import Settings from "../../utils/Settings";
import Paper from "@material-ui/core/Paper";
import SearchInputBase from "../../widgets/input/SearchInputBase";
import Chip from "@material-ui/core/Chip";
import MaterialOptionsMenu from "../../widgets/menu/MaterialOptionsMenu";
import MaterialIcon from "../../widgets/MaterialIcon";


/**TODO
 * list all issues
 * be able to search through issues
 * create new issues
 * delete issues if you are admin
 * elevate issues to tasks but this should be inside the
 * single issue view
 * */
export default class RepoIssues extends Component {

    state = {
        pageItemsCountIndex: 0,
        pageItemsCountKeys: [
            5,
            10,
            20,
            30
        ],
        visiblePageIndexControls: 4,
        get totalItems() {
            return 100;
        },
        issues: [],
        project: {}
    };

    constructor(props) {
        super(props);
        this.initDisplayContent();
    }

    get totalItems() {
        return this.state.issues.length;
    }

    random(max) {
        return Math.floor(Math.random() * max);
    }

    getRandom(array) {
        return array[this.random(array.length)];
    }

    componentDidMount() {
        this.project = this.props.project;
    }

    set project(project) {
        this.setState({project});
    }

    initDisplayContent() {
        new Promise(
            resolve => {
                let issues = [];

                let i = 0;
                let titles = [`This is a sample issue title to be used as a place holder for issue `, "This is another sample title used for projects"];

                let types = [`But`, `Feature`, `Repeated`, `Documentation`];
                let dates = [`11/12/2019`, `20/12/2017`, `18/12/2016`, `10/1/2019`];
                let costs = [10000, 2000, 50, 300];
                let signs = [`ksh`, `$`, `UGH`];

                while (i < 10) {
                    issues.push(
                        {
                            id: i,
                            title: this.getRandom(titles),
                            cost: {
                                estimated: {
                                    value: this.getRandom(costs),
                                    sign: this.getRandom(signs)
                                }/*,
                                used :{

                                }*/
                            },
                            assignee: {},
                            by: {
                                name: `Breimer`
                            },
                            project: {
                                id: 1,
                                name: this.props.project.name
                            },
                            priority: `High`,
                            state: {
                                id: 1,
                                title: `reported`,
                                description: `Issue has just been reported an nothing has been discussed in relation to it`
                            },
                            type: {
                                id: 1,
                                title: types[this.random(types.length)],
                                descriptions: PropTypes.string
                            },
                            date: dates[this.random(dates.length)],
                            attachments: ["one", "two", "three"],
                            milestones: ["one", "two", "three"],
                            tags: ["one", "two", "three"]
                        }
                    );
                    i++;
                }

                resolve(issues);
            }
        )
            .then(
                issues => this.setState({issues})
            );

    }

    get paginationSelect() {
        return (
            <MaterialSelect
                selectionItems={this.state.pageItemsCountKeys.map((v, i) => ({
                    key: i,
                    value: v
                }))}
                selectionHeader={
                    <MaterialRow style={{paddingLeft: 4, paddingRight: 4}}>
                        <MaterialTextView
                            text={`Table items count`}
                            textColor={Settings.colorSecondary}
                            fontSize={12}
                        />
                    </MaterialRow>
                }
                onChange={(e, n) => {
                    this.setState({pageItemsCountIndex: n.props.value});
                }}
                value={this.state.pageItemsCountIndex}
                style={{marginTop: 0}}
                color={"secondary"}

            />
        );
    }

    get paginationController() {
        return (
            <PaginationController
                onUpdate={this.onPagerPageUpdate}
                visiblePageIndexControls={this.state.visiblePageIndexControls}
                totalItems={this.totalItems}
                startPage={1}
                itemsPerPage={this.state.pageItemsCountKeys[this.state.pageItemsCountIndex]}/>
        );
    }

    get paginationControllerView() {
        return (
            <MaterialRow alignItems={Flex.CENTER} justify={Flex.END}>
                {this.paginationSelect}
                <GridItem>
                    {this.paginationController}
                </GridItem>
            </MaterialRow>
        );
    }

    render() {
        return (
            <MaterialRow marginTop={8} justify={Flex.CENTER}>
                <GridItem xs={12} sm={10} lg={11} marginTB={10}>
                    <Paper>
                        <MaterialCol alignItems={Flex.CENTER}>
                            <MaterialRow alignItems={Flex.CENTER}>
                                <GridItem xs={12} sm={6} paddingLeft={8}>
                                    <SearchInputBase inputFlexGrow={1}
                                                     placeholder={"Search issues:#{by:sampleUserName}"}/>
                                </GridItem>
                                <MaterialDivider
                                    height={24}
                                    orientation={MaterialDivider.VERTICAL}
                                />
                                <Separator/>
                                <Chip
                                    size={"small"}
                                    label={"by:me"}
                                    onDelete={
                                        e => {

                                        }
                                    }
                                />
                                <MaterialOptionsMenu
                                    id={"issues-saved-search-options-menu"}
                                    controller={MaterialIconButton}
                                    controllerProps={{
                                        icon: "SaveOutlined",
                                        marginLR: 6,
                                        iconSize: 18
                                    }}
                                    menuItems={[
                                        {
                                            itemId: 1,
                                            title: "clear all"
                                        },
                                        {
                                            itemId: 2,
                                            title: "delete all"
                                        }
                                    ]}
                                />
                            </MaterialRow>
                            <MaterialDivider width={"90%"}/>
                            <MaterialRow alignItems={Flex.CENTER} marginBottom={4} marginTop={2} paddingLeft={8}>
                                <MaterialOptionsMenu
                                    id={"issues-state-options"}
                                    controller={MaterialBtn}
                                    controllerProps={{
                                        marginLR: 4,
                                        minWidth: 0,
                                        minHeight: 1,
                                        paddingTB: 1,
                                        paddingLR: 4,
                                        variant: "text",
                                        content: "state",
                                        textTransform: "none",
                                        endIcon: <MaterialIcon icon={"ExpandMore"}/>
                                    }}

                                    optionsHeader={
                                        <MaterialRow paddingLR={8}>
                                            <SearchInputBase
                                                placeholder={"Search states"}
                                            />
                                        </MaterialRow>
                                    }
                                    menuItems={[
                                        {
                                            itemId: 1,
                                            title: "open"
                                        }
                                    ]}
                                />
                                <MaterialOptionsMenu
                                    id={"issues-state-options"}
                                    controller={MaterialBtn}
                                    controllerProps={{
                                        marginLR: 4,
                                        minWidth: 0,
                                        minHeight: 1,
                                        paddingLR: 4,
                                        paddingTB: 1,
                                        content: "cost",
                                        variant: "text",
                                        textTransform: "none",
                                        endIcon: <MaterialIcon icon={"ExpandMore"}/>
                                    }}

                                    menuItems={[
                                        {
                                            itemId: 1,
                                            title: "high-low"
                                        },
                                        {
                                            itemId: 1,
                                            title: "low-high"
                                        }
                                    ]}
                                />
                                <MaterialOptionsMenu
                                    id={"issues-priority-options"}
                                    controller={MaterialBtn}
                                    controllerProps={{
                                        marginLR: 4,
                                        minWidth: 0,
                                        minHeight: 1,
                                        paddingLR: 4,
                                        paddingTB: 1,
                                        content: "priority",
                                        variant: "text",
                                        textTransform: "none",
                                        endIcon: <MaterialIcon icon={"ExpandMore"}/>
                                    }}

                                    menuItems={[
                                        {
                                            itemId: 1,
                                            title: "high"
                                        },
                                        {
                                            itemId: 2,
                                            title: "low"
                                        },
                                        {
                                            itemId: 3,
                                            title: "normal"
                                        }
                                    ]}
                                />
                                <MaterialOptionsMenu
                                    id={"issues-assignee-options"}
                                    controller={MaterialBtn}
                                    controllerProps={{
                                        marginLR: 4,
                                        minWidth: 0,
                                        minHeight: 1,
                                        paddingLR: 4,
                                        paddingTB: 1,
                                        content: "assignee",
                                        variant: "text",
                                        textTransform: "none",
                                        endIcon: <MaterialIcon icon={"ExpandMore"}/>
                                    }}

                                    optionsHeader={
                                        <MaterialRow paddingLR={8}>
                                            <SearchInputBase
                                                placeholder={"Search: {assignee:name}"}
                                            />
                                        </MaterialRow>
                                    }
                                    menuItems={[
                                        {
                                            itemId: 1,
                                            title: "me"
                                        },
                                        {
                                            itemId: 2,
                                            title: "unassigned"
                                        },
                                        {
                                            itemId: 3,
                                            title: "booked"
                                        }
                                    ]}
                                />
                                <Separator/>
                                <Chip
                                    size={"small"}
                                    label={"assignee:me"}
                                    onDelete={
                                        e => {

                                            return true;
                                        }
                                    }
                                />
                                <MaterialOptionsMenu
                                    id={"issues-filters-options-menu"}
                                    controller={MaterialIconButton}
                                    controllerProps={{
                                        icon: "FilterList",
                                        marginLR: 6,
                                        iconSize: 18
                                    }}
                                    menuItems={[
                                        {
                                            itemId: 1,
                                            title: "clear all"
                                        },
                                        {
                                            itemId: 2,
                                            title: "delete all"
                                        }
                                    ]}
                                />
                            </MaterialRow>
                            <MaterialRow style={{marginTop: 8}} justify={Flex.CENTER} alignItems={Flex.CENTER}>
                                <Checkbox/>
                                <MaterialSelect
                                    value={0}
                                    color={"secondary"}
                                    style={{marginTop: 0}}
                                    selectionItems={[
                                        {
                                            key: 0,
                                            value: "Action"
                                        },
                                        {
                                            key: 1,
                                            value: "Save"
                                        },
                                        {
                                            key: 2,
                                            value: "Favorite"
                                        }
                                    ]}
                                />
                                <MaterialBtn
                                    variant={"text"}
                                    content={"EXECUTE"}
                                    textColor={Colors.green}
                                />
                                <Separator/>
                                <MaterialTextView text={`Found 1000`} fontSize={12}/>
                                <MaterialTextView text={`Showing 100-110`} fontSize={12}/>
                                <Separator/>
                                <GridItem xs={12} lg={4}>
                                    {this.paginationControllerView}
                                </GridItem>
                            </MaterialRow>
                            <IssuesListView issues={this.state.issues} height={500} minWidth={"100%"}/>
                            <MaterialRow justify={Flex.END} marginTB={6}>
                                {this.paginationControllerView}
                            </MaterialRow>
                        </MaterialCol>
                    </Paper>
                </GridItem>
            </MaterialRow>
        );
    }
}