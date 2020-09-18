import React, {Component} from "react";
import PropTypes from "prop-types";

export default class MaterialImage extends Component {

    static defaultProps = {
        src: "",
        alt: "MaterialImage",
        size: undefined
    };

    static propTypes = {
        src: PropTypes.string.isRequired,
        alt: PropTypes.string
    };

    static IMAGE_SMALL = 24;
    static ICON_SIZE = 24;
    static ICON_SIZE_SMALL = 16;
    static ICON_SIZE_LARGE = 42;

    constructor(props) {
        super(props);

        this.imgRef = React.createRef();
    }

    render() {

        let {src, alt, size, height, width} = this.props;

        if (width !== undefined && height === undefined) {
            // noinspection JSSuspiciousNameCombination
            height = width;
        }

        if (height !== undefined && width === undefined) {
            // noinspection JSSuspiciousNameCombination
            width = height;
        }

        if (height === undefined && width === undefined) {
            if (size === undefined) size = MaterialImage.IMAGE_SMALL;

            height = size;
            width = size;
        }


        return <img ref={this.imgRef} src={src} alt={alt} height={height} width={width}/>;
    }
}