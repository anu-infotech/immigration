import React from 'react'

export const renderError = (touched, error) => {
  if (touched && error) {
    return (
      <div className="invalid-feedback" style={{ color: 'red' }}>
        {error}
      </div>
    )
  } else {
    return null
  }
}
