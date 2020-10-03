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
            <MaterialCol minHeight={600}>
                <MaterialCol marginBottom={8} alignItems={Flex.CENTER}>
                    <GridItem xs={12} sm={7} lg={10}>
                        <MaterialRow justify={Flex.SPACE_BETWEEN} alignItems={Flex.CENTER}>
                            <GridItem xs={6}>
                                <SearchInputBase placeholder={"Search: {in:pull request}"}/>
                            </GridItem>
                            <MaterialDivider orientation={MaterialDivider.VERTICAL} spacing={4} height={18} />
                            <GridItem xs={5}>
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
                                <MaterialIconButton
                                    icon={"Save"}
                                    marginLR={4}
                                    iconSize={18}
                                />

                            </GridItem>
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
                                                content: <MaterialRow alignItems={Flex.CENTER}>
                                                    Tested
                                                    <MaterialIcon icon={"ExpandMore"}/>
                                                </MaterialRow>,
                                                style: {
                                                    padding: 2
                                                }

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
                                                content: <MaterialRow alignItems={Flex.CENTER}>
                                                    Cost
                                                    <MaterialIcon icon={"ExpandMore"}/>
                                                </MaterialRow>,
                                                style: {
                                                    padding: 2
                                                }

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
                                                content: <MaterialRow alignItems={Flex.CENTER}>
                                                    Request State
                                                    <MaterialIcon icon={"ExpandMore"}/>
                                                </MaterialRow>,
                                                style: {
                                                    padding: 2
                                                }

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
                                <MaterialIconButton icon={"FilterList"} marginLR={4} iconSize={18}/>
                            </GridItem>

                        </MaterialRow>
                        <MaterialRow justify={Flex.END}>
                            <GridItem>
                                {this.paginationControllerView}
                            </GridItem>
                        </MaterialRow>
                    </GridItem>
                    <PullRequestsListView requests={this.state.pullRequests} height={500}/>
                </MaterialCol>
            </MaterialCol>
        );
    }
}