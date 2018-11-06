import React from 'react';
import "./IngredientListInput.css";
import IngredientList from './IngredientList.js';

export default class IngredientListInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className="ingredient-list-input">
        <textarea spellCheck="false" value={this.state.value} onChange={this.handleChange} />
        <IngredientList lines={this.state.value} convert={false} />
        <IngredientList lines={this.state.value} convert={true} />
      </div>
    );
  }
}
