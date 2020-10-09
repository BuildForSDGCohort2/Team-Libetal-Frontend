import React, {Component} from "react";
import MaterialCol from "../../widgets/grid/MaterialCol";
import MaterialRow from "../../widgets/grid/MaterialRow";
import MaterialDivider from "../../widgets/MaterialDivider";
import InputBase from "@material-ui/core/InputBase";
import MaterialOptionsMenu from "../../widgets/menu/MaterialOptionsMenu";
import Flex from "../../widgets/Flex";
import MaterialTextView from "../../widgets/MaterialTextView";
import MaterialBtn from "../../widgets/MaterialBtn";
import MaterialIcon from "../../widgets/MaterialIcon";
import MaterialIconButton from "../../widgets/button/MaterialIconButton";
import GridItem from "../../widgets/grid/GridItem";
import SearchInputBase from "../../widgets/input/SearchInputBase";
import Colors from "../../Colors";
import Chip from "@material-ui/core/Chip";
import MaterialSelect from "../../widgets/input/MaterialSelect";
import Row from "../../widgets/Row";
import Settings from "../../utils/Settings";
import PaginationController from "../../widgets/PaginationController";
import PullRequestsListView from "./PullRequestsListView";
import Paper from "@material-ui/core/Paper";
import Separator from "../../widgets/separator";


/**
 * View pull requests
 * Merge Pull request
 * Discard Pull request
 *
 * */

export default class RepoPullRequests extends Component {


    state = {
        pageItemsCountKeys: [5, 10, 20, 40, 50],
        pageItemsCountIndex: 0,
        visiblePageIndexControls: 5,
        pullRequests: [],
        pullRequestsCount: 0
    };

    constructor(props) {
        super(props);
        this.chipRef = React.createRef();
        this.initDisplayContent();
    }

    initDisplayContent() {
        this.fetchPullRequests();
    }

    fetchPullRequests() {
        fetch("/data/pull-requests/libetal.json")
            .then(
                data => data.json()
            )
            .then(
                parsedJson => {

                    this.onReceivePullRequests(parsedJson);
                }
            );
    }

    onReceivePullRequests(response) {

        if (response.response.code === 200) {
            this.setState({pullRequests: response.data, pullRequestsCount: response.itemsCount});
        } else {
            console.log(`Unhandled error code ${response.code}`);
        }
    }

    get totalItems() {
        return this.state.pullRequestsCount;
    }


    get paginationSelect() {
        return (
            <MaterialSelect
                selectionItems={this.state.pageItemsCountKeys.map((v, i) => ({
                    key: i,
                    value: v
                }))}
                selectionHeader={
                    <Row style={{paddingLeft: 4, paddingRight: 4}}>
                        <MaterialTextView
                            text={`Table items count`}
                            textColor={Settings.colorSecondary}
                            fontSize={12}
                        />
                    </Row>
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

    /*get item on the list relating to the newPage index*/
    onPagerPageUpdate(newPage) {

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
                <GridItem flexGrow={1}>
                    {this.paginationSelect}
                </GridItem>
                <GridItem flexGrow={3}>
                    {this.paginationController}
                </GridItem>
            </MaterialRow>
        );
    }

    render() {

        return (
            <MaterialCol minHeight={600} marginTB={12} alignItems={Flex.CENTER}>
                <GridItem xs={12} sm={7} lg={11}>
                    <Paper>
                        <MaterialRow justify={Flex.SPACE_BETWEEN} alignItems={Flex.CENTER}>
                            <GridItem xs={12} sm={6} paddingLeft={8}>
                                <SearchInputBase placeholder={"Search: {in:pull request}"} inputFlexGrow={1}/>
                            </GridItem>
                            <MaterialDivider orientation={MaterialDivider.VERTICAL} spacing={4} height={18}/>
                            <Separator/>
                            <Chip
                                ref={this.chipRef}
                                label={"Saved"}
                                size={"small"}
                                onDelete={
                                    (e, b) => {
                                        console.log(`Remove chips by index`);
                                    }
                                }
                            />
                            <Chip

                                ref={this.chipRef}
                                label={"Saved"}
                                size={"small"}
                                onDelete={
                                    (e, b) => {
                                        console.log(`Remove chips by index`);
                                    }
                                }
                            />

                            <MaterialOptionsMenu
                                controller={MaterialIconButton}
                                controllerProps={{
                                    icon: "SaveOutlined",
                                    marginLR: 6,
                                    iconSize: 18
                                }}
                                id={"save-options-menu"}
                                menuItems={[
                                    {
                                        itemId: 1,
                                        title: "Clear All"
                                    },
                                    {
                                        itemId: 1,
                                        title: "Delete All"
                                    }
                                ]}
                            />

                        </MaterialRow>
                        <MaterialDivider spacing={4} width={"100%"}/>
                        <MaterialRow justify={Flex.SPACE_BETWEEN} alignItems={Flex.CENTER}>
                            <GridItem>
                                <MaterialRow>
                                    <GridItem marginRight={6}>
                                        <MaterialOptionsMenu
                                            id={"tested-options-filters"}
                                            controller={MaterialBtn}
                                            optionsHeader={
                                                <SearchInputBase
                                                    placeholder={"Search:{tester:me}"}
                                                    paddingLR={4}
                                                    onChange={
                                                        e => {
                                                            console.log(`Unhandled test change`);
                                                        }
                                                    }
                                                />
                                            }
                                            controllerProps={{
                                                variant: "text",
                                                textTransform: "lowercase",
                                                content: "Tested",
                                                paddingTB: 1,
                                                paddingLR: 6,
                                                style: {
                                                    fontSize: 12,
                                                    minHeight: 0,
                                                    minWidth: 0
                                                },
                                                endIcon: <MaterialIcon icon={"ExpandMore"}/>

                                            }}
                                            menuItems={["First"].map((value, i) => ({
                                                itemId: i,
                                                title: value
                                            }))}
                                        />
                                    </GridItem>
                                    <GridItem marginRight={6}>
                                        <MaterialOptionsMenu
                                            id={"tested-options-filters"}
                                            controller={MaterialBtn}
                                            controllerProps={{
                                                variant: "text",
                                                content: "Cost",
                                                paddingTB: 1,
                                                paddingLR: 6,
                                                style: {
                                                    fontSize: 12,
                                                    minHeight: 0,
                                                    minWidth: 0
                                                },
                                                endIcon: <MaterialIcon icon={"ExpandMore"}/>

                                            }}
                                            menuItems={["High-Low", "Low-High", "Agreed", "Disputed"].map((value, i) => ({
                                                itemId: i,
                                                title: value
                                            }))}
                                        />
                                    </GridItem>
                                    <GridItem marginRight={6}>
                                        <MaterialOptionsMenu
                                            id={"tested-options-filters"}
                                            controller={MaterialBtn}
                                            controllerProps={{
                                                variant: "text",
                                                content: "Request State",
                                                textTransform: "lowercase",
                                                paddingTB: 1,
                                                paddingLR: 6,
                                                style: {
                                                    fontSize: 12,
                                                    minHeight: 0,
                                                    minWidth: 0
                                                },
                                                endIcon: <MaterialIcon icon={"ExpandMore"}/>
                                            }}
                                            menuItems={["Merged", "Pending", "Discussion", "Disputed"].map((value, i) => ({
                                                itemId: i,
                                                title: value
                                            }))}
                                        />
                                    </GridItem>
                                </MaterialRow>
                            </GridItem>
                            <GridItem>
                                <Chip

                                    label={"Some text"}
                                    size={"small"}
                                    onDelete={
                                        (e, b) => {
                                            console.log(`Repove chips by index`);
                                        }
                                    }
                                />
                                <Chip

                                    ref={this.chipRef}
                                    label={"Some text"}
                                    size={"small"}
                                    onDelete={
                                        (e, b) => {
                                            console.log(`Remove chips by index`);
                                        }
                                    }
                                />

                                <MaterialOptionsMenu
                                    id={"filter-list-options-menu"}
                                    controller={MaterialIconButton}
                                    controllerProps={{
                                        icon: "FilterList",
                                        marginLR: 8,
                                        iconSize: 18
                                    }}
                                    menuItems={[
                                        {
                                            itemId: 1,
                                            title: "Clear All"
                                        }
                                    ]}
                                />
                            </GridItem>

                        </MaterialRow>
                        <MaterialRow justify={Flex.END}>
                            <GridItem>
                                {this.paginationControllerView}
                            </GridItem>
                        </MaterialRow>
                        <MaterialCol alignItems={Flex.CENTER} paddingLR={8} marginTop={8}>
                            <PullRequestsListView requests={this.state.pullRequests} height={500}/>
                        </MaterialCol>
                    </Paper>
                </GridItem>
            </MaterialCol>
        );
    }
}