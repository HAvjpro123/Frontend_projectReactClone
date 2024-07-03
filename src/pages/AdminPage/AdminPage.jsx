import { Menu } from 'antd'
import { AppstoreOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined, CopyOutlined  } from '@ant-design/icons';
import React, { useState } from 'react'
import HeaderComponent from '../../Components/HeaderComponent/HeaderComponent';
import logo1 from '../../assets/logo1.png'
import AdminUser from '../../Components/AdminUser/AdminUser';
import AdminProduct from '../../Components/AdminProduct/AdminProduct';
import { useNavigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';

const AdminPage = () => {
  const navigate = useNavigate()
  const items = [
    {
      key: 'user',
      icon: <UserOutlined />,
      label: 'Người dùng',
    },
    {
      key: 'product',
      icon: <AppstoreOutlined />,
      label: 'Sản phẩm',
    },
    {
      key: 'blog',
      icon: < CopyOutlined />,
      label: 'Bài viết ',
    },
  ];
  const [collapsed, setCollapsed] = useState(false);
  const [keySelected, setKeySelected] = useState("");

  const renderPage = (key) => {
    switch (key) {
      case 'user':
        return (
          <AdminUser />
        )
      case 'product':
        return (
          <AdminProduct />
        )
      case 'blog':
        return (
          <></>
        )
      default:
        return <></>
    }
  }

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleOnClick = ({ key }) => {
    setKeySelected(key)
  }
  const handleOut = () => {
    navigate("/")
  } 
  console.log("keySelected", keySelected)
  return (
    <>
    <ConfigProvider theme={{ token: { colorPrimary: 'rgb(22 163 74)' } }}>
      <HeaderComponent isHiddenMenu isHiddenNav isHiddenCart isHiddenLogo isSetupUser />
      <div className='flex'>
        {/* left sidebar */}
        <div className='shadow-lg ' style={{ height: '150vh' }} >
          <div onClick={toggleCollapsed} style={{ marginBottom: 16 }} className='mb-2 mt-4'>
            {collapsed ? <span><MenuUnfoldOutlined className=' flex ml-8 pt-2 cursor-pointer' /></span> :
              <div className='flex ml-7 mr-7' >
                <span className='my-auto'>
                  <MenuFoldOutlined className='cursor-pointer ' />
                </span>
                <img src={logo1} style={{ width: '28px', height: '23px' }}
                  alt=" logo" className='ml-1' />
                <span className='my-auto text-xl font-bold text-green-700'>CESPIN</span>
              </div>
            }
          </div>
          <Menu
            mode="inline"
            onClick={handleOnClick}
            inlineCollapsed={collapsed}
            items={items}
            className=''
          />
          <hr  />
          <div className=' cursor-pointer hover:text-green-600' onClick={handleOut}>
            {collapsed ? <LogoutOutlined className=' flex ml-8 mb-2' /> :
              <span className='flex ml-7 '>
                <LogoutOutlined />
                <span className='ml-2 text-sm '>Quay lại</span>
              </span>}
          </div>
        </div>
        {/* content */}
        <div className='flex-1 p-4 bg-gray-100'>
          {renderPage(keySelected)}
        </div>
      </div>
      <div>dasds</div>
      <div id='myDiv'></div>
      <div id='myDiv1'></div>
      </ConfigProvider>
    </>

  )
}

export default AdminPage