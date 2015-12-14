import React from 'react';
import TextField from 'material-ui/lib/text-field';


let selectedInputText = '';
//
let textChange = function(event) {
    console.log(event.target.value);
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
      hintText="What you are searching for!"
      floatingLabelText="Search"
      multiLine={true}
      onChange={textChange}
      />
    )
  }
}

export default CommentField;
