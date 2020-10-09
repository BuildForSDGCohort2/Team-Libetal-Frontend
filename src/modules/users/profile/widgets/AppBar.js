import React, {Component} from "react";
import MAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Libetal from "../../../../widgets/icons/Libetal";
import HomeImageButton from "../../../home/HomeImageButton";
import PropTypes from "prop-types";
import UserAccountButton from "../../widgets/UserAccountsButton";
import Separator from "../../../../widgets/separator";
import LanguagesAccessibilityControl from "../../../../widgets/accessibility/LanguagesAccessibilityControl";
import AccessibilityControl from "../../../../widgets/AccessibilityControl";
import MaterialRow from "../../../../widgets/grid/MaterialRow";
import AppStoreControl from "../../../../widgets/store/AppStoreControl";
import Flex from "../../../../widgets/Flex";
import TabsLayout from "../../../../widgets/TabsLayout";
import Paper from "@material-ui/core/Paper";
import SearchInputBase from "../../../../widgets/input/SearchInputBase";
import GridItem from "../../../../widgets/grid/GridItem";
import Colors from "../../../../Colors";
import MaterialDivider from "../../../../widgets/MaterialDivider";

export default class AppBar extends Component {

    static propTypes = {
        navigator: PropTypes.func.isRequired,
        componentInstance: PropTypes.any.isRequired
    };

    static defaultProps = {
        onChange(e) {
            console.log(`Unhandled Profile.AppBar.ToolBar.TabsLayout onChange e = ${e}`);
        }
    };

    render() {

        let {
            props: {
                navigator,
                componentInstance,
                onChange
            }
        } = this;

        return (
            <MAppBar position={"static"}>
                <Toolbar>
                    <MaterialRow alignItems={Flex.CENTER} justify={Flex.SPACE_BETWEEN} alignContent={Flex.END}>
                        <HomeImageButton navigator={navigator}/>
                        <MaterialRow xs={6} xm={8} lg={5} justify={Flex.CENTER}>
                            <TabsLayout
                                tabs={[
                                    "Profile",
                                    "Accounting & Returns"
                                ]}
                                onChange={onChange}
                            />
                        </MaterialRow>
                        <MaterialRow xs={12} xm={6} lg={3} alignItems={Flex.CENTER} justify={Flex.END}>
                            <Paper style={{paddingLeft:8,paddingRight:8,paddingTop:4,paddingBottom:4}}>
                                <SearchInputBase placeholder={"Search Account"}/>
                            </Paper>
                        </MaterialRow>
                        <MaterialRow
                            xs={12}
                            xm={6}
                            xl={3}
                            paddingTB={4}
                            justify={Flex.END}
                            alignItems={Flex.CENTER}>
                            <AppStoreControl componentInstance={componentInstance}/>
                            <MaterialDivider
                                spacing={2}
                                color={Colors.transparent}
                                orientation={MaterialDivider.VERTICAL}
                            />
                            <LanguagesAccessibilityControl componentInstance={componentInstance}/>
                            <MaterialDivider
                                spacing={2}
                                color={Colors.transparent}
                                orientation={MaterialDivider.VERTICAL}
                            />
                            <AccessibilityControl componentInstance={componentInstance}/>
                            <MaterialDivider
                                spacing={2}
                                color={Colors.transparent}
                                orientation={MaterialDivider.VERTICAL}
                            />
                            <UserAccountButton navigator={navigator}/>
                        </MaterialRow>
                    </MaterialRow>
                </Toolbar>
            </MAppBar>
        );
    }

}