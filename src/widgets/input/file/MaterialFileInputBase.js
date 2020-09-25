import React, {Component} from "react";
import PropTypes from "prop-types";

export default class MaterialFileInputBase extends Component {


    state = {
        files: []
    };

    static propTypes = {
        onChange: PropTypes.func,
        multiple: PropTypes.bool,
        placeholder: PropTypes.string,
        accept: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.string),
            PropTypes.string
        ]),
        onMount: PropTypes.func
    };

    static defaultProps = {
        multiple: false
    };

    constructor(prop) {
        super(prop);
        this.ref = React.createRef()
        ;
    }

    componentDidMount() {
        this.props.onMount(this);
    }

    reset() {
        this.ref.current.value = "";
    }

    render() {
        let {
            onChange,
            multiple,
            accept,
            style
        } = this.props;


        if (Array.isArray(accept)) {
            accept = accept.map(type => `.${type}`).join(",");
        }

        return (
            <input
                ref={this.ref}
                type={"file"}
                accept={accept}
                onChange={
                    e => {
                        let files = e.currentTarget.files;
                        this.setState({files: files}, () => {
                            onChange(files, this);
                        });
                    }
                }
                multiple={multiple}
                style={style}
            />
        );
    }
}