import React, { useState } from 'react'
import InputForm from '../InputForm/InputForm';
// import InputForm from '../InputForm/InputForm'

import { Form, Col, Row, Container, Button, Nav } from 'react-bootstrap';
import '../../CSS/SignInPage.css'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate()
  const handleNavigateSignUp = () => {
    navigate("/sign-up")
  }

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnchangePassword = (value) => {
    setPassword(value)
  }
  const handleSignIn = () => {
    console.log("signin", email, password)
  }

  return (
    <div className='bg-gray-100' >
      <Container>
        <Row className='py-48 '>
          <Col xs={14} md={2} id='myDiv1'></Col>
          <Col xs={24} md={5} className='p-4 shadow-lg '>
            <Form >
              <div className='flex'>
                <span className='text-2xl' closebutton="true">ĐĂNG NHẬP</span>
                <Button className='ml-auto border-0 hover:bg-transparent' variant='outline-sencondary'><CloseIcon className='' /></Button>
              </div>


              <hr></hr>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <InputForm
                  type="account"
                  placeholder="Nhập tên đăng nhập..."
                  className='rounded-0'
                  value={email}
                  onChange={handleOnchangeEmail}
                />
              </Form.Group>

              <Form.Label htmlFor="inputPassword5">Mật khẩu</Form.Label>
              <InputForm
                type="password"
                aria-describedby="passwordHelpBlock"
                placeholder="Nhập mật khẩu..."
                className='rounded-0'
                value={password}
                onChange={handleOnchangePassword}
              />
              <div className='mt-2 flex'>
                <Form.Check
                  inline
                  label="Lưu mật khẩu "
                  name="group1"
                />
                <Nav.Link className='ml-auto '> <span className='hover:text-green-600'>Quên mật khẩu?</span> </Nav.Link>
              </div>

              <div className='flex mt-4'>
                <Button onClick={handleSignIn} className=' px-4 py-2 rounded-0' style={{ width: 1000 }} variant="success"
                  disabled={!email.length || !password.length}>

                  <span className='text-md'> ĐĂNG NHẬP</span>
                </Button>
              </div>
              <div className='text-center my-2'>
                ----hoặc----
              </div>
              <div className='flex mt-2'>
                <Button onClick={handleNavigateSignUp} className='px-4  py-2 rounded-0' style={{ width: 1000 }} variant="outline-success">
                  <span className='text-md'> TẠO TÀI KHOẢN </span>
                </Button>
              </div>


              {/* <a href="" className='text-black mt-4'>Quên tên đăng nhập ?</a> */}
            </Form>
          </Col>
          <Col xs={14} md={3} className='signinpageImg shadow-lg'></Col>
          <Col xs={14} md={2} id='myDiv'></Col>
        </Row>
      </Container>
    </div>


  )
}

export default SignInPage