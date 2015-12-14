import React from 'react';
import DropDownMenu from 'material-ui/lib/drop-down-menu';

let injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

let menuItems = [
   { payload: '1', text: 'Game Option' },
   { payload: '1', text: 'Madden 16' },
   { payload: '2', text: 'Call of Duty: Black Ops 3' },
   { payload: '3', text: 'GTA 5' },
   { payload: '4', text: 'Halo 5' },
   { payload: '5', text: 'Star Wars Battlefront' },
   { payload: '6', text: 'NBA 2K16' },
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
        name="Game Option"
        menuItems={menuItems}
        onChange={dropDown}
        />
    )
  }
}

export default DropDown;
