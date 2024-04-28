import React from 'react'
import { Form, Button } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';


const ButtonInputSearch = (props) => {
    const { placeholder, textButton } = props
        return (
        <Form className="d-flex">
            <Form.Control
                type="search"
                placeholder= {placeholder}
                className="me-1"
                aria-label="Search"
            />
            <Button variant="outline-success"><SearchIcon></SearchIcon>{textButton}</Button>
        </Form>
    )
}

export default ButtonInputSearch