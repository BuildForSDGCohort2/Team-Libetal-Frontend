import React, {Component} from "react";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import MaterialDivider from "../../widgets/MaterialDivider";
import MaterialSelect from "../../widgets/MaterialSelect";
import Flex from "../../widgets/Flex";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import MaterialBtn from "../../widgets/MaterialBtn";
import Settings from "../../utils/Settings";
import MaterialIcon from "../../widgets/MaterialIcon";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";
import Footer from "../Footer";
import PaginationController from "../../widgets/PaginationController";
import MaterialTextView from "../../widgets/MaterialTextView";
import List from "@material-ui/core/List";
import MaterialImage from "../../widgets/MaterialImage";
import HeaderOption from "./widgets/HeaderOption";
import Colors from "../../Colors";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Separator from "../../widgets/separator";


const btnSuccess = createMuiTheme({
    palette: {
        secondary: {
            main: Settings.colorSuccess,
            dark: Settings.colorSuccessDark,
            contrastText: Settings.textSuccess
        }
    }
});

export default class Projects extends Component {

    state = {
        pageItemsCountKeys: [10, 25, 50, 100],
        pageItemsCountIndex: 0,
        visiblePageIndexControls: 5,
        projectsPerPage: 10,
        totalProjects: 1000,
        searchSelect: [
            {
                key: 0,
                value: "All"
            }, {
                key: 0,
                value: "My Projects"
            },
            {
                key: 1,
                value: "My Proposals"
            }
        ],
        currentSelectIndex: 0
    };

    constructor(props) {
        super(props);

        this.bindEvents();
    }


    bindEvents() {
        this.onProjectsPageUpdate = this.onProjectsPageUpdate.bind(this);
    }

    onProjectsPageUpdate(currentPage, pageWidth) {
        console.log(`Got a page update`);
    }

    get pagination() {
        return (
            <PaginationController
                onUpdate={this.onProjectsPageUpdate}
                visiblePageIndexControls={this.state.visiblePageIndexControls}
                totalItems={this.state.totalProjects}
                startPage={1}
                itemsPerPage={this.state.pageItemsCountKeys[this.state.pageItemsCountIndex]}/>
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
                style={{marginTop: 0}}/>
        );
    }

    createHeaderOption(id, title, menuItems, btnColor = "green", textColor = "white") {
        return (
            <HeaderOption
                title={title}
                btnColor={Colors[btnColor]}
                textColor={Colors[textColor]}
                id={id}
                menuItems={menuItems}
            />
        );
    }

    get bodyHeader() {

        return (
            <Row>
                <Column xs={12} lg={7} justify={Flex.CENTER}>
                    <Row justify={Flex.CENTER} alignItems={Flex.CENTER}>
                        {
                            this.createHeaderOption(
                                "priority-options",
                                "Platform",
                                [
                                    {
                                        id: 0,
                                        title: "Web"
                                    },
                                    {
                                        id: 1,
                                        title: "Pc"
                                    },
                                    {
                                        id: 2,
                                        title: "Mac"
                                    },
                                    {
                                        id: 2,
                                        title: "IoT"
                                    }
                                ],
                                "green"
                            )
                        }
                        {
                            this.createHeaderOption(
                                "os-options",
                                "OS",
                                [
                                    {
                                        id: 0,
                                        title: "Linux"
                                    },
                                    {
                                        id: 1,
                                        title: "Android"
                                    },
                                    {
                                        id: 1,
                                        title: "Windows"
                                    },
                                    {
                                        id: 1,
                                        title: <Row alignItems={Flex.CENTER}>Harmony <Checkbox checked={true}/></Row>
                                    }
                                ],
                                "orange"
                            )
                        }

                        {
                            this.createHeaderOption(
                                "state-options",
                                "State",
                                [
                                    {
                                        key: 0,
                                        title: "Development"
                                    },
                                    {
                                        key: 1,
                                        title: "Testing"
                                    },
                                    {
                                        key: 1,
                                        title: "Proposed"
                                    }
                                ],
                                "blue"
                            )
                        }
                        {
                            this.createHeaderOption(
                                "developers-options",
                                "Developers",
                                [
                                    {
                                        key: 0,
                                        title: "I&I"
                                    },
                                    {
                                        key: 1,
                                        title: "Vintros"
                                    },
                                    {
                                        key: 1,
                                        title: "Cro$$eD"
                                    }
                                ],
                                "blue"
                            )
                        }
                    </Row>
                    <Row  justify={Flex.CENTER} alignItems={Flex.CENTER}>
                        <Chip label={"by: @Chris"} color={"secondary"}/>
                        <Chip label={"by: @Chris"} onDelete={() => {
                        }}/>
                        <IconButton style={{padding: 6, margin: 2}}>
                            <MaterialIcon icon={"FilterList"}/>
                        </IconButton>
                    </Row>
                </Column>
                <Column lg={5} justify={Flex.END} alignItems={Flex.END} alignContent={Flex.CENTER}>
                    <Row justify={Flex.END} alignItems={Flex.CENTER}>
                        {this.paginationSelect}
                        <Column>{this.pagination}</Column>
                    </Row>
                </Column>
            </Row>
        );
    }

    technologyImage(src = "ic_django.png") {
        let style = {
            marginRight: 4,
            height: 18,
            width: 18
        };

        return (
            <Avatar
                src={`/assets/icons/png/${src}`}
                variant={"circle"}
                style={style}
            />
        );
    }

    projectTechnologies() {
        return (
            <Row>
                <Column xs={1}/>
                <Column xs={8}>
                    <Row>
                        {this.technologyImage("ic_django.png")}
                        {this.technologyImage("ic_js.png")}
                        {this.technologyImage("ic_python.png")}
                        {this.technologyImage("ic_react.png")}
                    </Row>
                </Column>
            </Row>
        );
    }

    projectFooter() {
        return (
            <Row justify={Flex.CENTER}>
                <Column xs={1} lg={1}/>
                <Column xs={8} lg={8}>
                    <Row alignItems={Flex.CENTER} justify={Flex.SPACE_AROUND}>
                        <MaterialTextView text={"10 commits"}/>
                        <MaterialDivider orientation={"vertical"} height={18} spacing={4}/>
                        <MaterialTextView text={"10 Issues"}/>
                        <MaterialDivider orientation={"vertical"} height={18} spacing={4}/>
                        <MaterialTextView text={"100+ tasks"}/>
                        <MaterialDivider orientation={"vertical"} height={18} spacing={4}/>
                        <MaterialTextView text={"10 teams"}/>
                        <MaterialDivider orientation={"vertical"} height={18} spacing={4}/>
                        <MaterialTextView text={"10 bugs"}/>
                    </Row>
                </Column>
                <Column xs={3} lg={3}>
                    <Row alignItems={Flex.CENTER}>
                        <MaterialIcon icon={"StarBorder"} iconSize={18}/>
                        <MaterialTextView text={"3.5"}/>
                        <MaterialDivider orientation={"vertical"} height={18} spacing={4}/>
                        <MaterialIcon icon={"FavoriteBorder"} iconSize={18}/>
                        <MaterialTextView text={"1000+"}/>
                    </Row>
                </Column>
            </Row>
        );
    }

    get projectsListItems() {

        let {
            state: {
                pageItemsCountKeys,
                pageItemsCountIndex: pIcT
            }
        } = this;
        let i = 0;

        let count = pageItemsCountKeys[pIcT];

        let projectsItems = [];

        while (i < count) {
            projectsItems.push(
                <Column xs={12} lg={12} justify={Flex.CENTER} style={{marginBottom: 4, marginTop: 6}}>
                    <Row>
                        <Column xs={1} lg={1}>
                            <MaterialImage
                                src={"/images/logo.png"}
                                size={40}
                            />
                        </Column>
                        <Column xs={8} lg={8}>
                            <Row>
                                by @Mike, Rose, Emily
                            </Row>
                            <Row>
                                <MaterialTextView
                                    text={"This is a sample project description and is required soon to have more than this text here "}
                                />
                            </Row>
                        </Column>
                        <Column xs={3} lg={3}>
                            <Row>
                                <Column xs={6}>
                                    <Chip
                                        label={"latest @v1.0.0"}
                                        style={{backgroundColor: Colors.green, color: Colors.white}}/>
                                    <MaterialTextView
                                        text={"20 Jun 2020"}
                                        fontSize={11}
                                    />
                                </Column>
                                <Column xs={6}>
                                    <Row justify={Flex.END}>
                                        <MaterialIcon icon={"Notifications"}/>
                                    </Row>
                                </Column>
                            </Row>
                        </Column>
                    </Row>
                    {this.projectTechnologies()}
                    {this.projectFooter()}
                    <MaterialDivider width={"95%"}/>
                </Column>
            );

            i++;
        }

        return projectsItems;
    }

    get projectsListView() {

        return (
            <List
                children={this.projectsListItems}
                style={{flexGrow: 1, padding: 6, maxHeight: 400, overflow: "auto"}}
            />
        );
    }

    render() {
        let {
            classes
        } = this.props;

        return (
            <Row className={classes.root}>
                <Column xs={12}>
                    <Row>
                        <Grid container item xs={12} xm={8} lg={8} justify={Flex.CENTER}>
                            <Row justify={Flex.CENTER} alignItems={Flex.CENTER} style={{paddingTop: 32}}>
                                <MaterialSelect
                                    style={{position: "relative", marginTop: 0, marginLeft: 6}}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.searchSelect[this.state.currentSelectIndex].value}
                                    renderValue={() => this.state.searchSelect[this.state.currentSelectIndex].value}
                                    selectionItems={this.state.searchSelect}
                                    onChange={
                                        (e, b, c) => {
                                            this.setState({currentSelectIndex: b.props.value});
                                        }
                                    }
                                />
                                <MaterialDivider height={24} orientation={MaterialDivider.VERTICAL} spacing={6}/>
                                <InputBase
                                    placeholder={"Search: by #{issues:me}"}
                                    style={{flexGrow:.8}}
                                />
                                <IconButton>
                                    <MaterialIcon icon={"Search"}/>
                                </IconButton>
                                <Chip label={"by: @Chris"} color={"secondary"}/>
                                <Chip label={"by: @Chris"} onDelete={() => {
                                }}/>
                                <IconButton style={{padding: 6, margin: 2}}>
                                    <MaterialIcon icon={"Save"}/>
                                </IconButton>
                            </Row>
                            <MaterialDivider width={"80%"} orientation={"horizontal"}/>
                        </Grid>
                        <Grid container item xs={12} xm={4} lg={4} justify={Flex.CENTER} alignContent={Flex.CENTER}>
                            <ThemeProvider
                                theme={btnSuccess}
                                children={
                                    <MaterialBtn
                                        variant={"contained"}
                                        content={"CREATE PROJECT"}/>
                                }
                            />
                        </Grid>
                    </Row>
                </Column>
                <Column xs={12}>
                    <Row>
                        <Column xs={12} xm={8} lg={8}>
                            <Row>
                                {this.bodyHeader}
                            </Row>
                            <Row>
                                {this.projectsListView}
                            </Row>
                            <Row justify={Flex.END} alignItems={Flex.CENTER}>
                                {this.paginationSelect}
                                <Column>{this.pagination}
                                </Column>
                            </Row>
                        </Column>
                        <Column xs={12} xm={4} lg={4}>
                            {/* <MaterialIcon icon={"StarBorder"}/>
                            <MaterialTextView text={"10 commits"}/>*/}
                        </Column>
                    </Row>
                    <Footer/>
                </Column>
            </Row>
        );
    }
}