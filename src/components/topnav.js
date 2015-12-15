import React from 'react';

import { AppBar } from "material-ui";

class TopNav extends React.Component {
  render() {
    return (
      <AppBar
      className="appbar"
      title="GamerZUnited"
      iconClassNameRight="muidocs-icon-navigation-expand-more" />
    )
  }
}

export default TopNav
