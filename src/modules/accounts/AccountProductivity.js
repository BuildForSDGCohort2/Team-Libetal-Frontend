import React from "react";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import Paper from "@material-ui/core/Paper";

/**TODO
 * needs access to userDetails
 * */
export default class AccountProductivity extends React.Component {


    /**
     * Display developer productivity in terms of
     * commits commits done in those terms also
     * hours worked per week or per month (this_week,week x,month,year)
     * income invested also per week last month or years
     * features solved
     * bugs fixed
     * */
    render() {
        return (
            <>
                <Paper style={{padding: 2}}>
                    <Row>
                        <Column xs={1}>
                            AccountProductivity
                        </Column>
                    </Row>
                </Paper>
            </>
        );
    }
}