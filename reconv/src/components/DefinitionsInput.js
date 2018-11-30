import React from 'react';
import styles from "./DefinitionsInput.module.css";

export default class DefinitionsInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.handleValueChange(event.target.value)
  }

  render() {
    return (
      <div>
        <h2>{this.props.kind} definitions</h2>
        <p className={styles.definitionFormatExample}>{this.props.csvFormat}</p>
        <textarea
          spellCheck="false"
          onChange={this.handleChange}
          defaultValue={this.props.value}
          className={styles.definitionField}
        />
      </div>
    );
  }
}
