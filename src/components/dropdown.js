import React from 'react';
import DropDownMenu from 'material-ui/lib/drop-down-menu';

let menuItems = [
   { payload: '1', text: 'Never' },
   { payload: '2', text: 'Every Night' },
   { payload: '3', text: 'Weeknights' },
   { payload: '4', text: 'Weekends' },
   { payload: '5', text: 'Weekly' },
];

let selectedMenuItemText = menuItems[0].text;

let dropDown = function(event, selectedIndex, menuItem) {
    console.log(menuItem.text);
    selectedMenuItemText = menuItem.text;
};


class DropDown extends React.Component {

  getSelectedItem() {
    // let idx = this.refs.dropDownMenu.selectedIndex;
    // console.log('getting selected items from index', idx);
    // return menuItems[idx];
    return selectedMenuItemText;
  }

  render() {
    return (
      <DropDownMenu
        ref="dropDownMenu"
        menuItems={menuItems}
        onChange={dropDown}
        />
    )
  }
}

export default DropDown;
