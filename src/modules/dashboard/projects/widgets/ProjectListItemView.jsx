import React, {Component} from "react";
import ListItemDiv from "../../../repos/ListItemDiv";
import MaterialCol from "../../../../widgets/grid/MaterialCol";
import Flex from "../../../../widgets/Flex";
import MaterialImage from "../../../../widgets/MaterialImage";
import MaterialTextView from "../../../../widgets/MaterialTextView";
import Colors from "../../../../Colors";
import MaterialIcon from "../../../../widgets/MaterialIcon";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import FlexDivider from "../../../../widgets/FlexDivider";
import MaterialDivider from "../../../../widgets/MaterialDivider";
import MaterialRow from "../../../../widgets/grid/MaterialRow";
import GridItem from "../../../../widgets/grid/GridItem";
import Avatar from "@material-ui/core/Avatar";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import Link from "@material-ui/core/Link";
import TabsLayout from "../../../../widgets/TabsLayout";
import Separator from "../../../../widgets/separator";

export default class ProjectListItemView extends Component {


    getUserAvatar(userDetails = {}) {
        let {
            image = ""
        } = userDetails;

        return (
            <Avatar
                src={image}
                variant={"circle"}
                style={{
                    height: 18,
                    width: 18,
                    marginTop: 2
                }}
            />
        );
    }

    technologyImage(src = "ic_django.png", sep = true) {
        let style = {
            height: 18,
            width: 18
        };

        return (
            <MaterialRow alignItems={Flex.CENTER} justify={Flex.SPACE_BETWEEN}>
                <Avatar
                    src={`/assets/icons/png/${src}`}
                    variant={"circle"}
                    style={style}
                />
                {sep ? <MaterialDivider spacing={4} orientation={MaterialDivider.VERTICAL} height={12}/> : undefined}
            </MaterialRow>
        );
    }

    prepTabs(tabs = []) {
        return (
            <TabsLayout
                variant={TabsLayout.VARIANT.SCROLLABLE}
                showIndicator={false}
                tabMarginBottom={0}
                tabLeftPadding={6}
                tabRightPadding={0}
                tabTBPadding={1}
                minTabHeight={0}
                tabs={
                    tabs.map(
                        (item, i) =>
                            <MaterialRow
                                justify={Flex.SPACE_BETWEEN}
                                alignItems={Flex.CENTER}>
                                <GridItem marginRight={8}>{item}</GridItem>
                                {i !== tabs.length - 1 ?
                                    <MaterialDivider
                                        height={12}
                                        orientation={MaterialDivider.VERTICAL}
                                        spacingStart={8}/> :
                                    undefined
                                }
                            </MaterialRow>
                    )
                }
            />
        );
    }

    projectFooter() {
        let {
            commitsCount = 0,
            issuesCount = 0,
            tasksCount = 0,
            teamsCount = 0,
            bugsCount = 0
        } = this.props;

        let tabs = [
            `${commitsCount} commits`,
            `${issuesCount} Issues`,
            `${tasksCount} tasks`,
            `${teamsCount} teams`,
            `${bugsCount} bugs`
        ];

        return (
            <MaterialRow justify={Flex.CENTER}>
                <MaterialRow xs={1} lg={1}/>
                <MaterialRow xs={8} lg={8}>
                    {this.prepTabs(tabs.map(tab => <MaterialTextView text={tab} fontSize={"10pt"}/>))}
                </MaterialRow>
                <MaterialRow xs={3} lg={3}>
                    {
                        this.prepTabs(
                            [
                                <MaterialRow alignItems={Flex.CENTER}>
                                    <MaterialIcon icon={"StarBorder"} iconSize={18}/>
                                    <MaterialTextView text={"3.5"} fontSize={"10pt"}/>
                                </MaterialRow>,
                                <MaterialRow alignItems={Flex.CENTER}>
                                    <MaterialIcon icon={"FavoriteBorder"} iconSize={18}/>
                                    <MaterialTextView text={"1000+"} fontSize={"10pt"}/>
                                </MaterialRow>
                            ]
                        )
                    }
                </MaterialRow>
            </MaterialRow>
        );
    }


    get latestChipStyle() {
        if (this.latestChipStyleField === undefined) this.latestChipStyleField = {
            backgroundColor: Colors.green,
            color: Colors.white
        };

        return this.latestChipStyleField;
    }

    get productionChipStyle() {
        if (this.productionChipStyleField === undefined) this.productionChipStyleField = {
            backgroundColor: Colors.purple,
            color: Colors.white
        };

        return this.productionChipStyleField;
    }

    projectTechnologies() {
        let {
            topContributors = [],
            contributorsCount
        } = this.props;

        return (
            <MaterialRow>
                <MaterialCol xs={1}/>
                <MaterialRow xs={12} xm={8}>
                    <TabsLayout
                        showIndicator={false}
                        tabLRPadding={0}
                        minTabHeight={0}
                        minTabWidth={0}
                        tabTBPadding={0}
                        tabs={
                            [
                                this.technologyImage("ic_django.png"),
                                this.technologyImage("ic_js.png"),
                                this.technologyImage("ic_python.png"),
                                this.technologyImage("ic_react.png", false)
                            ].map((tab, i) => ({
                                key: i,
                                label: tab
                            }))
                        }
                    />
                </MaterialRow>
                <MaterialRow xs={12} xm={3}>
                    <MaterialRow alignItems={Flex.CENTER}>
                        {
                            topContributors.map(
                                contributor => {
                                    return this.getUserAvatar(contributor);
                                }
                            )
                        }
                        {contributorsCount}
                    </MaterialRow>
                </MaterialRow>
            </MaterialRow>
        );
    }

    render() {

        let {
            props: {
                name = "Libetal",
                image = "/images/logo.png",
                by = [],
                description = "This is a sample project description and is required soon to have more than this text here",
                currentVersion = "1.0.0",
                versionReleaseDate = "20 Jun 2020",
                topContributors,
                contributorsCount,
                activeUsers = 1000
            }
        } = this;

        if (!Array.isArray(by)) {
            by = [];
        }

        return (
            <ListItemDiv>
                <MaterialCol justify={Flex.CENTER} alignItems={Flex.CENTER} marginTB={4}>
                    <MaterialRow>
                        <MaterialCol xs={1} lg={1}>
                            <MaterialImage
                                src={image}
                                size={40}
                            />
                        </MaterialCol>
                        <MaterialCol xs={8} lg={8}>
                            <MaterialRow>
                                {
                                    by.map(
                                        user => <Link style={{color: Colors.purple, marginLeft: 2, fontSize: "10pt"}}
                                                      href={"users/${user.name}"}>@${user.name}</Link>
                                    )
                                }
                            </MaterialRow>
                            <MaterialRow alignItems={Flex.CENTER}>
                                <MaterialCol xs={11}>
                                    <MaterialTextView
                                        text={description}
                                        textColor={Colors.blue}
                                        style={{
                                            cursor: "pointer"
                                        }}
                                        onClick={
                                            e => this.props.navigator(`dashboard/projects/${name.toLowerCase()}`)
                                        }
                                    />
                                </MaterialCol>
                                <MaterialIcon icon={"AttachFile"} iconSize={18}/>
                                <MaterialTextView text={"2"} fontSize={12}/>
                            </MaterialRow>
                        </MaterialCol>
                        <MaterialCol xs={3} lg={3} alignItems={Flex.START}>
                            <MaterialRow>
                                <MaterialCol xs={6} justify={Flex.SPACE_AROUND}>
                                    {
                                        (
                                            currentVersion === undefined ?
                                                <Chip
                                                    size={"small"}
                                                    label={`latest @v${currentVersion}`}
                                                    style={this.latestChipStyle}
                                                /> :
                                                <Chip
                                                    size={"small"}
                                                    label={"production"}
                                                    style={this.productionChipStyle}
                                                />
                                        )
                                    }
                                    <MaterialTextView
                                        text={versionReleaseDate}
                                        fontSize={12}
                                    />

                                </MaterialCol>
                                <MaterialCol xs={6}>
                                    <MaterialRow justify={Flex.END}>
                                        <MaterialIcon icon={"Notifications"}/>
                                    </MaterialRow>
                                    <MaterialRow>
                                        <MaterialTextView text={`${activeUsers} users`} variant={"h6"}/>
                                    </MaterialRow>
                                </MaterialCol>
                            </MaterialRow>
                        </MaterialCol>
                    </MaterialRow>
                    {this.projectTechnologies()}
                    {this.projectFooter()}
                    <MaterialDivider width={"95%"}/>
                </MaterialCol>
            </ListItemDiv>
        );
    }
}