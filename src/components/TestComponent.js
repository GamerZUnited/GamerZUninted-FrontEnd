import React from 'react'

import { Tabs } from "material-ui";
import { Tab } from "material-ui";

class TestComponent extends React.Component {
  render() {
    return (
      <Tabs
        valueLink={{value: this.state.tabsValue, requestChange: this._handleTabsChange.bind(this)}}>
        <Tab label="Tab A" value="a" >
          (Tab content...)
        </Tab>
        <Tab label="Tab B" value="b">
          (Tab content...)
        </Tab>
      </Tabs>
    )
  }
}

export default TestComponent
