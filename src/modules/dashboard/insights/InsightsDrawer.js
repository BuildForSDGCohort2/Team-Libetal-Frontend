import React from "react";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import MaterialDrawer from "../../../widgets/navigation/MaterialDrawer";
import Colors from "../../../Colors";
import Divider from "@material-ui/core/Divider";
import MaterialDrawerListItem from "../../../widgets/navigation/MaterialDrawerListItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MaterialIcon from "../../../widgets/MaterialIcon";
import MaterialTextView from "../../../widgets/MaterialTextView";

export default class InsightsDrawer extends React.Component {


    state = {
        state: false,
        isPinned: false
    };

    static propTypes = {
        onItemClick: PropTypes.func,
        onDrawerToggle: PropTypes.func,
        onPinChange:PropTypes.func
    };


    static defaultProps = {
        drawerState: true,
        classes: {},
        onItemClick(navItem) {
            console.info(`Unhandled navigation change navItem=${navItem}`);
        }
    };

    get isPinned() {
        return this.state.isPinned;
    }

    set isPinned(isPinned) {
        let {onPinChange} = this.props
        this.setState({isPinned},()=>{
            (onPinChange || ((s)=>s))(isPinned)
        });
    }


    get items() {

        return [
            {
                body: "All",
                icon: "Home",
                end: (
                    <Radio
                        checked={this.isPinned}
                        onClick={
                            (e) => {
                                this.isPinned = !this.isPinned;
                            }
                        }/>
                )
            },
            {
                body: "Accounts",
                icon: {
                    name: "AccountBalance",
                    color: Colors.green
                }

            },
            {
                body: "Projects",
                icon: "AccountTree"
            },
            {
                body: "Productivity",
                icon: "DynamicFeed"
            }
        ];


    }

    render() {

        let {
            classes,
            onItemClick
        } = this.props;

        let {
            isPinned
        } = this.state;


        let items = this.items;

        return (
            <MaterialDrawer
                initialIsOpen={isPinned}
                classes={classes}
                onMouseLeave={(drawer) => {
                    // noinspection PointlessBooleanExpressionJS
                    drawer.isOpen = isPinned;
                }}
                onMouseEnter={(drawer) => {
                    drawer.isOpen = true;
                }}
                items={items}

                onItemClick={(drawer, itemId) => {
                    onItemClick(drawer, itemId);
                    drawer.isOpen = isPinned;
                }}
                // This is here to push drawer down a bit
                header={
                  <List>
                      <ListItem key={20}>
                          <ListItemIcon>
                              <MaterialIcon icon={"ChevronRight"}/>
                          </ListItemIcon>
                          <ListItemText>
                              <MaterialTextView text={"Libetal"} textColor={Colors.orange} variant={"h6"}/>
                          </ListItemText>
                      </ListItem>
                  </List>
                }
                footer={<MaterialDrawerListItem icon={"Settings"} body={"Settings"} id={items.length + 1}/>}
            />
        );
    }
}