import React from 'react'
import { Form } from 'react-bootstrap';
const InputForm = (props) => {
    const { placeholder = 'nhập text', ...rest } = props
    const handleOnchangeInput = (e) => {
        props.onChange(e.target.value)
    }
    return (
        <Form.Control
            type="input"
            placeholder={placeholder}
            className='rounded-0'
            value={props.value}
             {...rest}
            onChange={handleOnchangeInput}
        />

    )
}

export default InputForm