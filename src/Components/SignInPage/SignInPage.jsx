import React from 'react'
import { Form, Col, Row, Container, Button, Nav } from 'react-bootstrap';
import '../../CSS/SignInPage.css'
import CloseIcon from '@mui/icons-material/Close';

const SignInPage = () => {
  return (
    <div className='bg-gray-100' >
      <Container>
        <Row className='py-48 '>
          <Col xs={14} md={2} id='myDiv1'></Col>
          <Col xs={24} md={5} className='p-4 shadow-lg '>
            <Form >
              <div className='flex'>
                <span className='text-2xl' closebutton >ĐĂNG NHẬP</span>
                <Button className='ml-auto border-0 hover:bg-transparent' variant='outline-sencondary'><CloseIcon className='' /></Button>
              </div>


              <hr></hr>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Tên tài khoản</Form.Label>
                <Form.Control
                  type="account"
                  placeholder="Nhập tên đăng nhập..."
                  className='rounded-0'
                />
              </Form.Group>

              <Form.Label htmlFor="inputPassword5">Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder="Nhập mật khẩu..."
                className='rounded-0'
              />
              <div className='mt-2 flex'>
                <Form.Check
                  inline
                  label="Lưu mật khẩu "
                  name="group1"
                />
                <Nav.Link className='ml-auto'>Quên mật khẩu? </Nav.Link>
              </div>

              <div className='flex mt-3'>
                <Button className='mr-2 px-4 py-2 rounded-0' variant="success">
                  <span className='text-sm'> ĐĂNG NHẬP</span>
                </Button>
                <span className='my-auto'> -hoặc- </span>
                <Button className='px-4 mx-2 py-2  rounded-0' variant="outline-success">
                  <span className='text-sm'> TẠO TÀI KHOẢN </span>
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