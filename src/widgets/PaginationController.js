import React, {Component} from "react";
import PropTypes from "prop-types";
import MaterialIcon from "./MaterialIcon";
import Row from "./Row";
import MaterialBtn from "./MaterialBtn";
import Flex from "./Flex";
import Colors from "../Colors";

export default class PaginationController extends Component {


    state = {
        currentPage: 1,
        // count of items per page
        pageWidth: 10
    };

    static defaultProps = {
        onUpdate(currentPage, pageWidth) {
            console.log(`Unhandled page change for controller ${currentPage}`);
        }
    };
    static propTypes = {
        startPage: PropTypes.number,
        totalItems: PropTypes.number,
        itemsPerPage: PropTypes.number,
        visiblePageIndexControls: PropTypes.number,
        onUpdate: (currentPage) => console.log("Current page")
    };


    onUpdate(currentPage, pageWidth) {
        this.props.onUpdate(currentPage, pageWidth);
    }

    get pageWidth() {
        return this.state.pageWidth;
    }

    set pageWidth(value) {
        this.setState({pageWidth: value}, () => {
            this.onUpdate(this.currentPage, this.pageWidth);
        });
    }

    get totalSteps() {
        let {
            totalItems,
            itemsPerPage
        } = this.props;

        return (totalItems / itemsPerPage) + (totalItems % itemsPerPage > 0 ? 1 : 0);

    }

    get prevItemsCount() {
        let {
            props: {
                totalItems,
                itemsPerPage
            },
            state: {
                currentPage
            }
        } = this;

        return currentPage * itemsPerPage;
    }

    set currentPage(value) {

        let {
            totalItems,
            itemsPerPage
        } = this.props;


        if (value > this.totalSteps) {
            value = value - 1;
        } else if (value < 1) {
            value = value + 1;
        }

        let didChange = false;

        this.setState(prevState => {

            didChange = prevState.currentPage !== value;

            return {currentPage: value};

        }, () => {
            if (didChange) {
                this.onUpdate(this.currentPage, this.state.pageWidth);
            }
        });
    }

    get currentPage() {
        return this.state.currentPage;
    }

    componentDidMount() {

        let {
            startPage
        } = this.props;

        this.currentPage = startPage;
    }


    pageUp() {
        this.currentPage += 1;
    }

    pageDown() {
        this.currentPage -= 1;
    }

    moreControl(callBack) {
        return (
            <MaterialBtn
                content={"..."}
                variant={"text"}
                style={{height: 24, padding: 2, minWidth: 24}}
                onClick={callBack}
            />
        );
    }

    get paginationIndexes() {
        let {
            totalSteps,
            props: {
                itemsPerPage,
                visiblePageIndexControls
            },
            state: {
                currentPage
            }
        } = this;

        let i = currentPage;

        let pagesControllers = [];


        if ((this.prevItemsCount / itemsPerPage) > visiblePageIndexControls) {

            pagesControllers.push(
                this.moreControl(
                    event => {
                        this.currentPage -= visiblePageIndexControls;
                    }
                )
            );

        }

        let l = 0;

        while (i <= totalSteps && l < visiblePageIndexControls) {

            // creating this for loop as using i references last i in the list
            let index = i;

            let isCurrentPage = i === currentPage;
            pagesControllers.push(
                <MaterialBtn
                    content={i}
                    textColor={isCurrentPage ? Colors.white : Colors.grey}
                    color={isCurrentPage ? Colors.green : undefined}
                    variant={isCurrentPage ? "contained" : "text"}
                    style={{height: 24, padding: 2, minWidth: 24}}
                    onClick={
                        event => {
                            this.currentPage = index;
                        }

                    }
                />
            );
            i++;
            l++;
        }

        if (i < totalSteps) {
            pagesControllers.push(
                this.moreControl(
                    event => {
                        this.currentPage += visiblePageIndexControls;
                    }
                )
            );
        }

        return pagesControllers;
    }

    render() {

        let {
            classes
        } = this.props;

        let style = {padding:0,paddingLeft:0,paddingRight:0,minWidth:0}
        return (
            <Row alignItems={Flex.CENTER} children={
                [
                    <MaterialBtn
                        content={<MaterialIcon icon={"ChevronLeft"}/>}
                        variant={"text"}
                        style={style}
                        onClick={() => this.currentPage -= 1}
                    />,
                    ...this.paginationIndexes,
                    <MaterialBtn
                        content={<MaterialIcon icon={"ChevronRight"}/>}
                        variant={"text"}
                        style={style}
                        onClick={() => this.currentPage += 1}
                    />
                ]
            }/>
        );
    }
}