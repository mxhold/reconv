import React from 'react';
import styles from "./DefinitionsInput.module.css";

export default function DefinitionsInput(props) {
  function handleChange(event) {
    props.handleValueChange(event.target.value)
  }

  return (
    <div>
      <h2>{props.kind} definitions</h2>
      <p className={styles.definitionFormatExample}>{props.csvFormat}</p>
      <textarea
        spellCheck="false"
        onChange={handleChange}
        defaultValue={props.defaultValue}
        className={styles.definitionField}
      />
    </div>
  );
}