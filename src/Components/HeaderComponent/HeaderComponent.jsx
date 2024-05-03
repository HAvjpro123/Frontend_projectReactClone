import React from 'react'

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

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -5,
      top: -1,
      border: `1px solid ${theme.palette.background.paper}`,
      
      fontSize: 10
    },
  }));

const HeaderComponent = () => {
   
        const navigate = useNavigate()
        const handleNavigateLogin = () => {
            navigate("/sign-in")
        }
        return (
            <>
                <div >
                    <div>
                        <nav className="grid grid-cols-12 " id="myDiv">
                            <div className="col-span-1"
                            ></div>
                            <div className="col-span-2 my-auto inline-block ">
                                <span className="nav_link nav-btn spantext" type="button"><LocationOnIcon className='mb-1' sx={{ fontSize: 20 }}></LocationOnIcon></span>
                                <span className="nav_link nav-btn font-bold spantext" type="button"><PhoneInTalkIcon className='mb-1' sx={{ fontSize: 20 }}></PhoneInTalkIcon>1900 8000</span>
                            </div>

                            <div className="col-span-6 mx-auto">
                                <img
                                    src={logo}
                                    width="85"
                                    height="auto"
                                    alt=" logo"
                                />

                            </div>

                            <div className="col-span-2 my-auto text-right">
                                <span className="nav_link nav-btn spantext mr-2" type="button">
                                    <StyledBadge badgeContent={1} color="success" max={999} >
                                        <ShoppingCartIcon className='mb-1' sx={{ fontSize: 20 }}/>
                                    </StyledBadge></span>

                                <span onClick={handleNavigateLogin} style={{cursor: 'pointer'}} className="nav_link nav-btn spantext" type="button"><PersonIcon className='mb-1' sx={{ fontSize: 20 }} />Đăng nhập</span>
                            </div>
                            <div className="col-span-1"
                            ></div>
                        </nav>

                        <Navbar expand="lg" className="bg-body-tertiary" id="myDiv1">
                            <Container fluid>

                                <Navbar.Toggle aria-controls="navbarScroll" style={{ color: "black" }} />
                                <Navbar.Collapse id="navbarScroll" >
                                    <Nav
                                        className="me-auto my-2 my-lg-2 mx-auto "
                                        style={{ maxHeight: '100px' }}
                                        navbarScroll
                                    >

                                        <Nav.Link >TRANG CHỦ</Nav.Link>
                                        <Nav.Link >BÀI VIẾT</Nav.Link>
                                        <Nav.Link >LIÊN HỆ</Nav.Link>
                                        <Nav.Link >SẢN PHẨM</Nav.Link>
                                        <NavDropdown title="BỘ SƯU TẬP" id="navbarScrollingDropdown" className="nav_link">
                                            <NavDropdown.Item className="nav_link">HIỆN ĐẠI</NavDropdown.Item>
                                            <NavDropdown.Item className="nav_link">CỔ ĐIỂN</NavDropdown.Item>
                                            <NavDropdown.Item className="nav_link">SANG TRỌNG</NavDropdown.Item>
                                            <NavDropdown.Item className="nav_link">TRẺ TRUNG</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item className="nav_link">
                                                KHÁC...
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown title="PHÒNG" id="navbarScrollingDropdown" className="nav_link">
                                            <NavDropdown.Item className="nav_link">PHÒNG ĂN</NavDropdown.Item>
                                            <NavDropdown.Item className="nav_link">PHÒNG NGỦ</NavDropdown.Item>
                                            <NavDropdown.Item className="nav_link">PHÒNG LÀM VIỆC</NavDropdown.Item>
                                            <NavDropdown.Item className="nav_link">PHÒNG KHÁCH</NavDropdown.Item>
                                            <NavDropdown.Item className="nav_link">PHÒNG BẾP</NavDropdown.Item>
                                            <NavDropdown.Item className="nav_link">NGOẠI THẤT</NavDropdown.Item>
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
                    </div>

                </div>

            </>
        )
    
}

export default HeaderComponent

