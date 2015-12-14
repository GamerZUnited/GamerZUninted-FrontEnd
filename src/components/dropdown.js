import React from 'react';
import DropDownMenu from 'material-ui';

let menuItems = [
   { payload: '1', text: 'Never' },
   { payload: '2', text: 'Every Night' },
   { payload: '3', text: 'Weeknights' },
   { payload: '4', text: 'Weekends' },
   { payload: '5', text: 'Weekly' },
];


class DropDown extends React.Component {
  render() {
    return (
      <DropDownMenu menuItems={menuItems}/>
    )
  }
}

export default DropDown;
