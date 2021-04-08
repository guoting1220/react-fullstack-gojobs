import React from 'react';
import './Alert.css';

const Alert = ({ messages, type }) => {
  return (
    <div className={`Alert Alert-${type}`}>
      {messages.map(m => <p>{m}</p>)}
    </div>
  )
}

export default Alert;