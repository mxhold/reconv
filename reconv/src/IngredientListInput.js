import React from 'react';
import IngredientList from './IngredientList.js';
import parseIngredient from './parseIngredient.js';

export default class IngredientListInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "1/2c butter\n1c sugar",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  parse(text) {
    return text.split("\n").map(line => parseIngredient(line)).filter(i => i != null);
  }

  render() {
    return (
      <div>
        <textarea value={this.state.value} onChange={this.handleChange} />
        <IngredientList ingredients={this.parse(this.state.value)} />
      </div>
    );
  }
}
