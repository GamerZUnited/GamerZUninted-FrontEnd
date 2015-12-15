import React from 'react';

import { AppBar } from "material-ui";

class TopNav extends React.Component {
  render() {
    return (
      <AppBar
      title="Title"
      iconClassNameRight="muidocs-icon-navigation-expand-more" />
    )
  }
}

export default TopNav
