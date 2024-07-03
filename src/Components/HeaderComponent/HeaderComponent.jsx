import React, { useEffect, useState } from 'react'

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import '../../CSS/Header.css'
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import './Header'
// material
import logo from '../../assets/logo.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Popover } from 'antd'
import * as UserService from '../../service/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import Loading from '../LoadingComponent/Loading';
import { isJsonString } from "../../utils";
import { jwtDecode } from "jwt-decode";
import { BellOutlined } from '@ant-design/icons';
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -5,
        top: -1,
        border: `1px solid ${theme.palette.background.paper}`,

        fontSize: 10
    },
}));

const HeaderComponent = ({ isHiddenMenu = false, isHiddenNav = false, isHiddenCart = false, isHiddenLogo = false, isSetupUser = false }) => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [loading, setLoading] = useState(false)
    const handleNavigateLogin = () => {
        navigate("/sign-in")
    }

    const [showSpan, setShowSpan] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 800) {
                setShowSpan(false);
            } else {
                setShowSpan(true);
            }
        };

        handleResize(); // Kiểm tra kích thước màn hình khi load trang
        window.addEventListener('resize', handleResize); // Thêm event listener cho sự kiện resize

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup khi component unmount
        };
    }, []);

    const handleLogout = async () => {
        handleDecoded()
        setLoading(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        navigate("/")
        setLoading(false)
    }
    useEffect(() => {
        setLoading(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setLoading(false)
    }, [user?.name, user?.avatar])

    const handleDecoded = () => {
        let storageData = localStorage.removeItem('access_token')
        let decoded = {}
        if (storageData && isJsonString(storageData)) {
            storageData = JSON.parse(storageData)
            decoded = jwtDecode(storageData)
        }
        return { decoded, storageData }
    }

    const content = (
        <div className='rounded-0 p-0'>
            <p className='text-xs hover:text-green-600' style={{ cursor: 'pointer' }} onClick={() => navigate('/profile-user')} >Tài khoản của tôi</p>
            {user?.isAdmin && (
                <p className='text-xs hover:text-green-600' style={{ cursor: 'pointer' }} onClick={() => navigate('/system/admin')} >Quản lí hệ thống</p>
            )}
            <p className='text-xs hover:text-green-600' style={{ cursor: 'pointer' }} onClick={handleLogout}>Đăng xuất</p>
        </div>
    );

    console.log("user", user)
    return (
        <>
            <div className='shadow-sm'>
                <div >
                    <nav className="grid grid-cols-12  " id="myDiv">
                        {/* col-span-1 */}
                        <div className="col-span-1"
                        ></div>
                        {/* right first nav */}
                        {!isHiddenNav && (
                            <div className="col-span-2 my-auto inline-block ">
                                <span className="nav_link nav-btn spantext" type="button"><LocationOnIcon className='mb-1' sx={{ fontSize: 18 }}></LocationOnIcon></span>
                                <span className="nav_link nav-btn font-bold spantext" type="button"><PhoneInTalkIcon className='mb-1 text-sm' sx={{ fontSize: 18 }}></PhoneInTalkIcon>1900 8000</span>
                            </div>
                        )}
                        {/* mid frist nav */}
                        {!isHiddenLogo && (
                            <div className="col-span-6 mx-auto">
                                <img
                                    src={logo}
                                    width="60rem"
                                    height="auto"
                                    alt=" logo"
                                />
                            </div>
                        )}
                        {/* left first nav */}
                        {!isSetupUser ? (
                            <div className="col-span-2 my-auto ml-auto text-right flex">
                                {/* user name or login */}
                                {user?.access_token ? (
                                    <>
                                        <Popover className='rounded-0' content={content} trigger="click">
                                            <div style={{ cursor: 'pointer' }} className="nav_link nav-btn spantext ml-2 text-sm flex" type="button" >
                                                <span>
                                                    {userAvatar ? (
                                                        <img src={userAvatar} style={{
                                                            height: '20px',
                                                            width: '20px',
                                                            borderRadius: '50%',
                                                            objectFit: 'cover'
                                                        }}
                                                            alt='avatar' className='mx-1' />
                                                    ) : (
                                                        <PersonIcon className='mb-1 text-sm mx-1' sx={{ fontSize: 18 }} />
                                                    )}
                                                </span>
                                                {showSpan && <span>{userName?.length ? userName : user?.email}</span>}
                                                {loading && <Loading className=" text-white mx-auto mb-1 p-4" />}</div>
                                        </Popover>
                                    </>
                                ) : (
                                    <>
                                        <span style={{ cursor: 'pointer' }} onClick={handleNavigateLogin} ><PersonIcon className='mb-1 text-sm ' sx={{ fontSize: 18 }} /></span>
                                        {showSpan && <span onClick={handleNavigateLogin} style={{ cursor: 'pointer' }} className=" text-sm nav_link nav-btn spantext" type="button">Đăng nhập</span>}
                                    </>
                                )}
                                {/* shopping cart */}
                                {!isHiddenCart && (
                                    <span className="nav_link nav-btn spantext ml-auto" type="button">
                                        <StyledBadge badgeContent={1} color="success" max={999} >
                                            <ShoppingCartIcon className='mb-1' sx={{ fontSize: 18 }} />
                                        </StyledBadge></span>
                                )}
                            </div>) : (
                            <div className="col-span-10 my-2 ml-auto text-right flex ">
                                {/* user name or login */}
                                {user?.access_token ? (
                                    <>
                                        <span><BellOutlined style={{ fontSize: '18px', cursor: 'pointer' }} className='mt-1 hover:text-green-600' /></span>
                                        <Popover className='rounded-0' content={content} trigger="click">
                                            <div className="nav_link nav-btn spantext ml-2 text-sm flex" type="button" >
                                                <span>
                                                    {userAvatar ? (
                                                        <img src={userAvatar} style={{
                                                            height: '20px',
                                                            width: '20px',
                                                            borderRadius: '50%',
                                                            objectFit: 'cover',
                                                            cursor: 'pointer'
                                                        }}
                                                            alt='avatar' className='mx-1' />
                                                    ) : (
                                                        <PersonIcon className='mb-1 text-sm mx-1' sx={{ fontSize: 18 }} />
                                                    )}
                                                </span>
                                                {showSpan && <span style={{ cursor: 'pointer' }}>{userName?.length ? userName : user?.email}</span>}
                                                {loading && <Loading className=" text-white mx-auto mb-1 p-4" />}
                                            </div>
                                        </Popover>
                                    </>
                                ) : (
                                    <>
                                        <span style={{ cursor: 'pointer' }} onClick={handleNavigateLogin} ><PersonIcon className='mb-1 text-sm' sx={{ fontSize: 18 }} /></span>
                                        {showSpan && <span onClick={handleNavigateLogin} style={{ cursor: 'pointer' }} className=" text-sm nav_link nav-btn spantext" type="button">Đăng nhập</span>}
                                    </>
                                )}
                                {/* shopping cart */}
                                {!isHiddenCart && (
                                    <span className="nav_link nav-btn spantext ml-auto" type="button">
                                        <StyledBadge badgeContent={1} color="success" max={999} >
                                            <ShoppingCartIcon className='mb-1' sx={{ fontSize: 18 }} />
                                        </StyledBadge></span>
                                )}
                            </div>)}
                        {/* col-span-1 */}
                        <div className="col-span-1"
                        ></div>
                    </nav>
                    {/* nav */}
                    {!isHiddenMenu && (
                        <Navbar expand="lg" className="bg-body-tertiary " id="myDiv1">
                            <Container fluid>

                                <Navbar.Toggle aria-controls="navbarScroll" style={{ color: "black" }} />
                                <Navbar.Collapse id="navbarScroll" >
                                    <Nav
                                        className="me-auto my-lg-2 mx-auto "
                                        style={{ maxHeight: '100px' }}
                                        navbarScroll
                                    >
                                        <span className='text-sm'><Nav.Link >TRANG CHỦ</Nav.Link></span>
                                        <span className='text-sm'><Nav.Link >BÀI VIẾT</Nav.Link></span>
                                        <span className='text-sm'><Nav.Link >LIÊN HỆ</Nav.Link></span>
                                        <span className='text-sm'><Nav.Link >SẢN PHẨM</Nav.Link></span>
                                        <NavDropdown title="BỘ SƯU TẬP" id="navbarScrollingDropdown" className="nav_link text-sm">
                                            <NavDropdown.Item className="nav_link text-sm">HIỆN ĐẠI</NavDropdown.Item>
                                            <NavDropdown.Item className="nav_link text-sm">CỔ ĐIỂN</NavDropdown.Item>
                                            <NavDropdown.Item className="nav_link text-sm">SANG TRỌNG</NavDropdown.Item>
                                            <NavDropdown.Item className="nav_link text-sm">TRẺ TRUNG</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item className="nav_link text-sm">
                                                KHÁC...
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown title="PHÒNG" id="navbarScrollingDropdown" className="nav_link text-sm">
                                            <NavDropdown.Item className="nav_link text-sm">PHÒNG ĂN</NavDropdown.Item>
                                            <NavDropdown.Item className="nav_link text-sm">PHÒNG NGỦ</NavDropdown.Item>
                                            <NavDropdown.Item className="nav_link text-sm">PHÒNG LÀM VIỆC</NavDropdown.Item>
                                            <NavDropdown.Item className="nav_link text-sm">PHÒNG KHÁCH</NavDropdown.Item>
                                            <NavDropdown.Item className="nav_link text-sm">PHÒNG BẾP</NavDropdown.Item>
                                            <NavDropdown.Item className="nav_link text-sm">NGOẠI THẤT</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item className="nav_link">
                                                KHÁC...
                                            </NavDropdown.Item>
                                        </NavDropdown>

                                        <ButtonInputSearch
                                            placeholder="Tìm kiếm..."
                                            textButton=""
                                        />

                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    )}
                </div >
            </div >
        </>
    )
}
export default HeaderComponent

