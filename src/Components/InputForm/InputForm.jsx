import React from 'react'
import { Form } from 'react-bootstrap';
const InputForm = (props) => {
    const { placeholder = 'nhập text', ...rest } = props
    const handleOnchangeInput = (e) => {
        props.handleOnchange(e.target.value)
    }
    return (
        <Form.Control
            type=""
            placeholder={placeholder}
            className='rounded-0'
            onChange={handleOnchangeInput}
            valuet={props.value}
            {...rest}
        />

    )
}

export default InputForm