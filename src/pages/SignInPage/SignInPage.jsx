import React, { useEffect, useState } from 'react'
import InputForm from '../../Components/InputForm/InputForm';
import Loading from '../../Components/LoadingComponent/Loading';
import '../../CSS/SignInPage.css'

import { Form, Col, Row, Container, Button, Nav, FloatingLabel } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide'
import { jwtDecode } from "jwt-decode";//material
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as UserService from '../../service/UserService'
const SignInPage = () => {
  const navigate = useNavigate()
  const [showSpinner, setShowSpinner] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();

  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )

  const { data, isSuccess } = mutation
  useEffect(() => {
    if (isSuccess && data?.status !== 'ERR') {
      navigate('/')
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token)
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }
      }
    }
  }, [isSuccess])

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }
  console.log("mutation", mutation)

  const handleNavigateSignUp = () => {
    navigate("/sign-up")
  }

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleSignIn = () => {
    setShowSpinner(true);
    mutation.mutate({
      email,
      password
    })
    console.log("signin", email, password)
    setTimeout(() => {
      // Sau khi thực hiện xong công việc, ẩn spinner
      setShowSpinner(false);
    }, 1000);
  }

  return (
    <div className='bg-gray-100' >
      <Container>
        <Row className='py-20 '>
          <Col xs={14} md={2} ><div id='myDiv1'></div></Col>
          <Col xs={24} md={5} className='p-4 shadow-lg '>
            {/* form đăng nhập */}
            <Form >
              <div className='flex'>
                <span className='text-2xl' closebutton="true">ĐĂNG NHẬP</span>
                <Button className='ml-auto border-0 hover:bg-transparent' variant='outline-sencondary'><CloseIcon className='' /></Button>
              </div>

              <hr></hr>
              {/* form đăng nhập email*/}
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <FloatingLabel  label="Nhập Email..." className="mb-3">
                  <InputForm
                    type="account"
                    placeholder="Nhập tên đăng nhập..."
                    className='rounded-0'
                    value={email}
                    onChange={handleOnchangeEmail}
                  />
                </FloatingLabel>
              </Form.Group>
              {/* form đăng nhập mật khẩu*/}
              <FloatingLabel label="Nhập mật khẩu..." className="mb-3">
                <InputForm
                  type="password"
                  aria-describedby="passwordHelpBlock"
                  placeholder="Nhập mật khẩu..."
                  className='rounded-0'
                  value={password}
                  onChange={handleOnchangePassword}
                />
              </FloatingLabel>


              {/* form lưu mật khẩu và quên mật khẩu*/}
              <div className='mt-2 flex'>
                <Form.Check
                  inline
                  label="Lưu mật khẩu "
                  name="group1"
                />
                <Nav.Link className='ml-auto '> <span className='hover:text-green-600'>Quên mật khẩu?</span> </Nav.Link>
              </div>
              {data?.status === 'ERR' && <span className='text-red-600'>{data?.message}</span>}
              {/* Button tạo đăng nhập*/}
              <div className='flex mt-4'>
                <Button onClick={handleSignIn} className=' px-4 py-2 rounded-0' style={{ width: 1000 }} variant="success"
                  disabled={!email.length || !password.length}>
                  <span className='text-md'> ĐĂNG NHẬP </span>
                  {showSpinner && <Loading className=" text-white mx-auto mb-1 p-4" />}
                </Button>
              </div>
              <div className='text-center text-gray-500 my-3 '>
                -hoặc-
              </div>
              {/* Button tạo tài khoản */}
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