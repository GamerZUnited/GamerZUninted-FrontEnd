import React from 'react';

import { AppBar } from "material-ui";
import { IconButton } from "material-ui";
import { FlatButton } from "material-ui";
import { NavigationClose } from "material-ui";



class TopNav extends React.Component {
  render() {
    return (
      <AppBar
        style="color:"
        title="Title"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      className="appbar"
      title="GamerZUnited"
      iconClassNameRight="muidocs-icon-navigation-expand-more" />
    )
  }
}

export default TopNav
