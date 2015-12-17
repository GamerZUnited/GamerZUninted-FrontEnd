import React from 'react';

let injectTapEventPlugin = require("react-tap-event-plugin");

import { Toggle } from 'material-ui';

class Mic extends React.Component {

  render() {
    return (
      <Toggle
        name="toggleName2"
        value="toggleValue2"
        label="Do You Have A Mic?"
        defaultToggled={true}
      />
    )
  }
}

export default Mic;
