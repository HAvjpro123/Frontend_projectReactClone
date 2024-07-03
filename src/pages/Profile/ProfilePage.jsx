import React, { useEffect, useState } from 'react'
import InputForm from '../../Components/InputForm/InputForm'
import { Col, Row } from 'antd';
// import { Container, Row, Col } from 'react-bootstrap'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Button, Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as UserService from '../../service/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../../Components/LoadingComponent/Loading';
import * as message from '../../Components/MessageComponent/Message'
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';
import { Upload } from 'antd';
import { UploadOutlined } from '@mui/icons-material';
import { getBase64 } from '../../utils';
import '../../CSS/ProfilePage.css';


const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [showSpinner, setShowSpinner] = useState(false);
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    )
    const dispatch = useDispatch();
    const { data, isSuccess, isError } = mutation

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])
    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }
    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview);

    }
    const handleUpdate = () => {
        setShowSpinner(true);
        mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token })
        setTimeout(() => {
            setShowSpinner(false);
        }, 1000);
    }
    // thông báo xác nhận cập nhật thông tin người dùng
    const OffCanvasExample = ({ name, ...props }) => {
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return (
            <>
                <Button variant="success" onClick={handleShow} className="me-2 ml-3 my-2 rounded-0" >
                    <span className='mx-1'>{name}</span>{showSpinner && <Loading className=" ml-2 mb-1 p-4" />}
                </Button>
                <Offcanvas show={show} onHide={handleClose} {...props} >
                    <Offcanvas.Header >
                        <Offcanvas.Title>Cespin Thông Báo</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className='mb-4 pt-0'>Bạn có muốn cập nhật thông tin người dùng.</div>
                        <div className='flex'>
                            <Button onClick={handleClose} variant="outline-success" className='mr-3'>Đóng</Button>
                            <Button onClick={handleUpdate} variant="success"><span>Chấp nhận</span></Button>
                        </div>

                    </Offcanvas.Body>
                </Offcanvas>
            </>
        );
    }
    return (
        <div>
            <nav className="grid grid-cols-12  " id="myDiv">
                <div className="col-span-1 "></div>
                <div className="col-span-10 bg-gray-100 h-screen ">
                    {/* header */}
                    <div className='flex border-b border-stone-300'>
                        <div className='py-2 border-b-2 border-green-700'>
                            <span className='px-1 text-xl'>THÔNG TIN NGƯỜI DÙNG</span>
                        </div>
                    </div>
                    {/* content */}
                    <Row className='mt-4'>
                        {/* content left */}
                        <Col xs={24} md={14} className=''>
                            {/* edit name */}
                            <Row className='mb-4' >
                                <Col xs={4} className='my-auto ml-4'>
                                    <span className='text-sm'  >Họ tên: </span>
                                </Col>
                                <Col xs={18}>
                                    <InputForm
                                        type="account"
                                        placeholder="Nhập tên người dùng..."
                                        className='rounded-0 w-max-full'
                                        value={name}
                                        onChange={handleOnchangeName}
                                    />
                                </Col>
                            </Row>
                            {/* edit email */}
                            <Row className='mb-4' >
                                <Col xs={4} className='my-auto ml-4'>
                                    <span className='text-sm'  >Email: </span>
                                </Col>
                                <Col xs={18}>
                                    <InputForm
                                        type="account"
                                        placeholder="Nhập Email..."
                                        className='rounded-0 w-max-full'
                                        value={email}
                                        onChange={handleOnchangeEmail}
                                    />
                                </Col>
                            </Row>
                            {/* edit address */}
                            <Row className='mb-4' >
                                <Col xs={4} className='my-auto ml-4'>
                                    <span className='text-sm'  >Địa chỉ: </span>
                                </Col>
                                <Col xs={18}>
                                    <InputForm
                                        type="account"
                                        placeholder="Nhập địa chỉ..."
                                        className='rounded-0 w-max-full'
                                        value={address}
                                        onChange={handleOnchangeAddress}
                                    />
                                </Col>

                            </Row>
                        </Col>
                        {/* content right */}
                        <Col xs={24} md={10} className=''>
                            {/* edit phone */}
                            <Row className='mb-4' >
                                <Col xs={6} className='my-auto ml-4'>
                                    <span className='text-sm'  >Số điện thoại: </span>
                                </Col>
                                <Col xs={16}>
                                    <InputForm
                                        type="account"
                                        placeholder="Nhập số điện thoại..."
                                        className='rounded-0 w-max-full'
                                        value={phone}
                                        onChange={handleOnchangePhone}
                                    />
                                </Col>
                            </Row>
                            {/* edit avatar */}
                            <Row className='mb-4' >
                                <Col xs={6} className='my-auto ml-4'>
                                    <span className='text-sm'  >Ảnh đại diện: </span>
                                </Col>
                                <Col xs={16} >
                                    <Upload onChange={handleOnchangeAvatar} maxCount={1} className='upload-list-inline' listType="picture">
                                        <Button className='rounded-0' variant='outline-success' size='sm'> <UploadOutlined className='my-auto' sx={{ fontSize: 16 }} /><span className='text-xs my-auto'>Cập nhật ảnh đại diện</span></Button>
                                    </Upload>
                                </Col>
                            </Row>
                            {/* button update */}
                            <Row>
                                {['Cập nhật'].map((placement, idx) => (
                                    <OffCanvasExample key={idx} placement='bottom' name={placement} />
                                ))}
                            </Row>
                        </Col>
                    </Row>
                    <hr />
                    <Row className=''>
                        asdasd
                    </Row>
                </div>
                <div className="col-span-1"></div>
            </nav>
        </div>
    )
}

export default ProfilePage