import React, { useEffect, useState } from 'react'
import InputForm from '../../Components/InputForm/InputForm'
import * as UserService from '../../service/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../Components/LoadingComponent/Loading';
import * as message from '../../Components/MessageComponent/Message'

//material
import { Form, Col, Row, Container, Button, FloatingLabel } from 'react-bootstrap';
import '../../CSS/SignInPage.css'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';


const SignUpPage = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate()

  const mutation = useMutationHooks(
    data => UserService.signupUser(data)
  )

  const { data, isSuccess, isError } = mutation

  useEffect(() => {
    if (isSuccess && data?.status !== 'ERR') {
      message.success()
      handleNavigateLogin()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])

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
    setShowSpinner(true);
    mutation.mutate({
      email, password, confirmPassword
    })
    setTimeout(() => {
      // Sau khi thực hiện xong công việc, ẩn spinner
      setShowSpinner(false);
    }, 1000);
    console.log("signUp", email, password, confirmPassword)
  }

  return (
    <div className='bg-gray-100' >
      <Container>
        <Row className='py-20 '>
          <Col xs={14} md={2} ><div id='myDiv1' ></div></Col>
          <Col xs={24} md={5} className='p-4 shadow-lg '>
            <Form >
              <div className='flex'>
                <span className='text-2xl' closebutton="true">ĐĂNG KÝ</span>
                <Button className='ml-auto border-0 hover:bg-transparent' variant='outline-sencondary'><CloseIcon className='' /></Button>
              </div>
              <hr></hr>

              <FloatingLabel controlId="floatingInput" label="Nhập Email..." className="mb-3">
                <InputForm
                  placeholder="Nhập email..."
                  value={email}
                  onChange={handleOnchangeEmail}
                  className="mb-3 rounded-0"
                />
              </FloatingLabel>


              <FloatingLabel controlId="floatingInput" label="Nhập mật khẩu..." className="mb-3">
                <InputForm
                  type="password"
                  placeholder="Nhập mật khẩu..."
                  value={password}
                  onChange={handleOnchangePassword}
                  className="mb-3 rounded-0"
                />
              </FloatingLabel>


              <FloatingLabel controlId="floatingInput" label="Nhập lại mật khẩu..." className="mb-3">
                <InputForm
                  type="password"
                  placeholder="Nhập lại mật khẩu..."
                  value={confirmPassword}
                  onChange={handleOnchangeConfirmPassword}
                  className="mb-3 rounded-0"
                />
              </FloatingLabel>


              {data?.status === 'ERR' && <span className='text-red-600'>{data?.message}</span>}

              <div className='flex mt-4'>
                <Button onClick={handleSignUp} className=' px-4 py-2 rounded-0' style={{ width: 1000 }} variant="success"
                  disabled={!email.length || !password.length || !confirmPassword.length}>
                  <span className='text-md'> ĐĂNG KÝ </span>
                  {showSpinner && <Loading className=" text-white mx-auto mb-1 p-4" />}
                </Button>
              </div>
              <div className='text-center text-xs my-3'>
                <span>Bằng việc đăng kí, bạn đã đồng ý với Cespin về</span>
                <br />
                <a href="" className='no-underline'><span className='text-green-700'> Điều khoản dịch vụ </span></a>
                 &
                 <a href="" className='no-underline'><span className='text-green-700 '> Chính sách bảo mật</span></a>
                
              </div>
              <div className='text-center my-3'>
                <span className='text-gray-500'>-hoặc-</span>
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