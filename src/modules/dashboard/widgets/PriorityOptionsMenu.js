import React from "react";
import MaterialBtn from "../../../widgets/MaterialBtn";
import MaterialIcon from "../../../widgets/MaterialIcon";
import OptionsMenu, {OptionsMenuPropsTypes} from "../../../widgets/menu/OptionsMenu";
import Colors from "../../../Colors";

export default class PriorityOptionsMenu extends OptionsMenu {

    static propTypes = OptionsMenuPropsTypes;

    get controller() {
        return (
            <MaterialBtn
                variant={"text"}
                content={"Priority"}
                textTransform={"none"}
                textColor={Colors.white}
                color={Colors.green}
                style={{
                    paddingTop: 2,
                    paddingBottom: 2,
                    background: "none"
                }}
                onClick={
                    this.openMenu
                }
                endIcon={
                    <MaterialIcon
                        color={Colors.white}
                        icon={"ExpandMore"}
                    />
                }
            />
        );
    }
}