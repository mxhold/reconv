import React from 'react';
import styles from "./DefinitionsInput.module.css";

export default function DefinitionsInput(props) {
  return (
    <div>
      <h2>{props.kind} definitions</h2>
      <p className={styles.definitionFormatExample}>{props.csvFormat}</p>
      <textarea
        spellCheck="false"
        onChange={props.handleValueChange}
        value={props.value}
        className={styles.definitionField}
      />
    </div>
  );
}