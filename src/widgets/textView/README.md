# Base Text View

## TextView customization
A text view is a section used to provide text information or documentation and can differ depening on the text
in question 
the text can be plain text
code text etc thus all this need to be put in consideration while designing a robust text field. 


### Proposed design
```jsx harmony
import PropTypes from "prop-types";
import React,{Component} from "react";

export default class TextViewFormatter {

}

export  class PlainTextFormatter extends TextViewFormatter{
}

export  class MaterialTextView extends Component{
    
    static propTypes ={
        formatter:PropTypes.any,
        content:PropTypes.any.isRequired,
    };
    
    static defaultProps = {
        formatter: PlainTextFormatter
    };

}
export  class MDFormatter extends TextViewFormatter{

}
// Thus having

function App (){
    return (
        <MaterialTextView content={"Content for the text field"} formatter={MDFormatter}/>
    );   
}
```