# Team-Libetal-Frontend

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d6f5ee42ec44439b801e14c034263d7a)](https://app.codacy.com/gh/BuildForSDGCohort2/Team-Libetal-Frontend?utm_source=github.com&utm_medium=referral&utm_content=BuildForSDGCohort2/Team-Libetal-Frontend&utm_campaign=Badge_Grade_Settings)
[Codacy Repo Link](https://app.codacy.com/gh/BuildForSDGCohort2/Team-Libetal-Frontend)

## Conventions
Simple Guidelines that we can use to work with and avoid confusion as we go. 
> Updates to these conventions have to be communicated and discussed before updating

## Files Structure
- Modules are full pages on the web platform
- Widgets are sections integrated to modules
    - Only multi used widgets can be in a file of its own.

### Naming Conventions
We will be using class based components. 
```js
import * as React from "react";

class Em extends React.Component{

    render(){
        return (
            <em>Item</em>
        );
    }

}
```


