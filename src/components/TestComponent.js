import React from 'react'

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

class TestComponent extends React.Component {
  render() {
    return (
      <div>
      <Tabs>
        <Tab label="Tab A" value="a" >
          (Tab content...)
        </Tab>
        <Tab label="Tab B" value="b">
          (Tab content...)
        </Tab>
      </Tabs>
    </div>
    )
  }
}

export default TestComponent
