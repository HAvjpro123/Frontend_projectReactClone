import React from 'react'
import { Input } from 'antd';

const InputComponent = ({ size, placeholder, bodered, style, ...rests }) => {
  return (
    <Input
        size={size}
        placeholder={placeholder}
        bodered={bodered}
        style={style}
        {...rests}
    />
  )
}

export default InputComponent