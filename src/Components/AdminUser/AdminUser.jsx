import React from 'react'
import { Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';


const AdminUser = () => {
    return (

        <div className=''>
            <span className='text-xl font-medium text-green-700' >QUẢN LÍ NGƯỜI DÙNG</span>
            <div className='my-2'>
                <Button type='dashed' style={{ width: '90px', height: '90px' }}><PlusCircleOutlined style={{ fontSize: '20px' }} /></Button>
            </div>
            <div className='my-2'>
                <TableComponent />
            </div>
        </div>
    )
}
export default AdminUser