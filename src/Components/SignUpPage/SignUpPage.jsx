import React, { useState } from 'react'
import InputForm from '../InputForm/InputForm'

//material
import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import '../../CSS/SignInPage.css'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';


const SignUpPage = () => {

  const navigate = useNavigate()
  const handleNavigateLogin = () => {
    navigate("/sign-in")
  }

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnchangePassword = (value) => {
    setPassword(value)
  }
  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }
  const handleSignUp = () => {
    console.log("signUp", email, password, confirmPassword)
  }

  return (
    <div className='bg-gray-100' >
      <Container>
        <Row className='py-40 '>
          <Col xs={14} md={2} id='myDiv1'></Col>
          <Col xs={24} md={5} className='p-4 shadow-lg '>
            <Form >
              <div className='flex'>
                <span className='text-2xl' closebutton="true">ĐĂNG KÝ</span>
                <Button className='ml-auto border-0 hover:bg-transparent' variant='outline-sencondary'><CloseIcon className='' /></Button>
              </div>
              <hr></hr>


              <Form.Label>Email</Form.Label>
              <InputForm
                placeholder="Nhập email..."
                value={email}
                onChange={handleOnchangeEmail}
                className="mb-3 rounded-0"
              />

              <Form.Label htmlFor="inputPassword5">Mật khẩu</Form.Label>
              <InputForm
                type="password"
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={handleOnchangePassword}
                className="mb-3 rounded-0"
              />

              <Form.Label htmlFor="inputPassword5">Nhập lại mật khẩu</Form.Label>
              <InputForm
                type="password"
                placeholder="Nhập lại mật khẩu..."
                value={confirmPassword}
                onChange={handleOnchangeConfirmPassword}
                className="mb-3 rounded-0"
              />


              <div className='flex mt-4'>
                <Button onClick={handleSignUp} className=' px-4 py-2 rounded-0' style={{ width: 1000 }} variant="success"
                disabled={!email.length || !password.length || !confirmPassword.length}>
                  <span className='text-md'> ĐĂNG KÝ</span>
                </Button>
              </div>
              <div className='text-center my-2'>
                ----bạn đã có tài khoản----
              </div>
              <div className='flex mt-2' >
                <Button onClick={handleNavigateLogin} className='px-4 py-2 rounded-0' style={{ width: 1000 }} variant="outline-success"
                  
                >
                  <span className='text-md'> ĐĂNG NHẬP </span>
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

export default SignUpPage