import React from "react";
import {useHistory} from "react-router-dom";


export default function HoCs({props, children}) {

    const history = useHistory();

     const navigateTo = url => history.push(`/${url}`);

    return (
        <>
            {children({...props, navigateTo: navigateTo})}
        </>
    );
}