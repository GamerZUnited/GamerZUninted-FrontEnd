import React from 'react';
import TextField from 'material-ui/lib/text-field';


let selectedInputText = '';
//
let textChange = function(event) {
    selectedInputText = event.target.value;
};


class CommentField extends React.Component {

  getSelectedItem() {
    // let idx = this.refs.dropDownMenu.selectedIndex;
    // console.log('getting selected items from index', idx);
    // return menuItems[idx];
    return selectedInputText;
  }

  render() {
    return (
      <TextField
      hintText="Multiplayer, help with a boss, etc"
      floatingLabelText="What's your game objective?"
      multiLine={true}
      onChange={textChange}
      />
    )
  }
}

export default CommentField;
