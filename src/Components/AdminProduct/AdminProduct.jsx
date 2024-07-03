import React, { useEffect, useState } from 'react'
import { Button, Form, Upload } from 'antd'
import { PlusCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import TextArea from 'antd/es/input/TextArea';
import { UploadOutlined } from '@mui/icons-material';
import { getBase64 } from '../../utils';
import '../../CSS/ProfilePage.css'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as ProductService from '../../service/ProductService'
import Loading from '../LoadingComponent/Loading';
import * as message from '../../Components/MessageComponent/Message'
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';

const AdminProduct = () => {
    const [showSpinner, setShowSpinner] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete ] = useState(false)
    const user = useSelector((state) => state?.user)
    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        typeRoom: '',
        countInStock: ''
    })
    const [stateProductDetails, setStateProductDetails] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        typeRoom: '',
        countInStock: ''
    })

    const [form] = Form.useForm();
    // mutation thêm sản phẩm
    const mutation = useMutationHooks(
        (data) => {
            const { name, price, description, rating, image, type, typeRoom, countInStock } = data
            const res = ProductService.createProduct({ name, price, description, rating, image, type, typeRoom, countInStock })
            return res
        }
    )
    console.log("rowSelected", rowSelected)
    // mutationUpdate chỉnh sửa sản phẩm
    const mutationUpdate = useMutationHooks(
        (data) => {
            console.log("data", data)
            const { id, token, ...rests } = data
            const res = ProductService.updateProduct(id, token, { ...rests })
            return res
        },
    )
    // mutationDeleted xóa sản phẩm
    const mutationDeleted = useMutationHooks(
        (data) => {
            console.log("data", data)
            const { id, token } = data
            const res = ProductService.deleteProduct(id, token)
            return res
        },
    )

    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct()
        return res
    }

    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await ProductService.getDetailsProduct(rowSelected)
        if (res?.data) {
            setStateProductDetails({
                name: res?.data?.name,
                price: res?.data?.price,
                description: res?.data?.description,
                rating: res?.data?.rating,
                image: res?.data?.image,
                type: res?.data?.type,
                typeRoom: res?.data?.typeRoom,
                countInStock: res?.data?.countInStock
            })
        }
    }

    useEffect(() => {
        form.setFieldsValue(stateProductDetails)
    }, [form, stateProductDetails])

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected])

    console.log("stateProduct", stateProductDetails)
    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }

    const { data, isSuccess, isError } = mutation
    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted


    console.log("dataUpdated", dataUpdated)

    const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
    const { data: products } = queryProduct
    const renderAction = () => {
        return (
            <div className="">
                <DeleteOutlined style={{ fontSize: '20px', cursor: 'pointer' }} className='mx-1 text-red-300 hover:text-red-500' onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ fontSize: '20px', cursor: 'pointer' }} className='mx-1 text-blue-300 hover:text-blue-500' onClick={handleDetailsProduct} />
            </div>
        )
    }
    //lấy dữ liệu từ dataIndex 'name' để hiển thị dữ liệu ra từng cột
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'type',
        },
        {
            title: 'Loại phòng',
            dataIndex: 'typeRoom',
        },
        {
            title: 'Tùy chọn',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    // map product ra datatable
    const dataTable = products?.data?.length && products?.data?.map((product) => {
        return { ...product, key: product._id }
    })
    // onFinish
    const onFinish = () => {
        setShowSpinner(true);
        mutation.mutate(stateProduct, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
        setTimeout(() => {
            setShowSpinner(false);
        }, 10000);
    }
    // useEffect khi thêm sản phẩm 
    useEffect(() => {
        if (isSuccess && data?.status === 'ok') {
            message.success()
            handleCancel()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess]) 
    // useEffect Drawer để chỉnh sửa sản phẩm
    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'ok') {
            message.success()
            handleCloseDrawer()
        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessUpdated])
    // useEffect deleted để xóa sản phẩm
    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'ok') {
            message.success()
            handleCancelDelete()
        } else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDeleted])
    // handleCloseDrawer khi hoàn tất sửa sản phẩm
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetails({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            typeRoom: '',
            countInStock: ''
        })
        form.resetFields()
    };
    // handleCancelDelete khi hoàn tất xóa sản phẩm
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }
    const handleDeleteProduct = () => {
        mutationDeleted.mutate({id: rowSelected, token: user?.access_token}, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }
    // handleCancel khi hoàn tất thêm sản phẩm
    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            typeRoom: '',
            countInStock: ''
        })
        form.resetFields()
    };
    //handleOnChange
    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }
    //handleOnChangeDetails
    const handleOnChangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value
        })
    }
    //handleOnchangeAvatar
    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
    }
    //handleOnchangeAvatarDetails
    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview
        })
    }
    //onUpdateProduct
    const onUpdateProduct = () => {
        setShowSpinner(true);
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetails }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
        setTimeout(() => {
            setShowSpinner(false);
        }, 2500);
    }

    return (
        <div className=''>
            <span className='text-xl font-medium text-green-700'>QUẢN LÍ SẢN PHẨM</span>
            <div className='my-2'>
                <Button type='dashed' style={{ width: '90px', height: '90px' }} onClick={() => setIsModalOpen(true)}><PlusCircleOutlined style={{ fontSize: '20px' }} /></Button>
            </div>
            <div className='my-2'>
                <TableComponent columns={columns} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id)
                        },
                    };
                }} />
            </div>
            {/* MODAL THÊM SẢN PHẨM */}
            <ModalComponent title="Thêm Sản Phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form name="basic" labelCol={{ span: 6, }} wrapperCol={{ span: 18, }} style={{ maxWidth: 600, }} form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    {/* form tên sản phẩm */}
                    <Form.Item label="Tên sản phẩm " name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập tên sản phẩm !',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.name} onChange={handleOnChange} name='name' />
                    </Form.Item>
                    {/* form giá*/}
                    <Form.Item label="Giá tiền" name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập giá tiền!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.price} onChange={handleOnChange} name='price' />
                    </Form.Item>
                    {/* form Loại sản phẩm*/}
                    <Form.Item label="Loại sản phẩm" name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập loại sản phẩm !',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.type} onChange={handleOnChange} name='type' />
                    </Form.Item>
                    {/* form Loại phòng*/}
                    <Form.Item label=" Loại phòng" name="typeRoom"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập loại phòng !',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.typeRoom} onChange={handleOnChange} name='typeRoom' />
                    </Form.Item>
                    {/* form số lượng*/}
                    <Form.Item label="Số lượng" name="counInStock"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập số lượng!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name='countInStock' />
                    </Form.Item>
                    {/* form đánh giá*/}
                    <Form.Item label="Đánh giá" name="rating">
                        <InputComponent value={stateProduct.rating} onChange={handleOnChange} name='rating' />
                    </Form.Item>
                    {/* form ghi chú*/}
                    <Form.Item label="Ghi chú" name="description">
                        <TextArea rows={4} value={stateProduct.description} onChange={handleOnChange} name='description' />
                    </Form.Item>
                    {/* form tải ảnh*/}
                    <Form.Item label="Ảnh sản phẩm" name="image" >
                        <Upload onChange={handleOnchangeAvatar} maxCount={1} className='upload-list-inline' listType="picture" onRemove={(false)}>
                            <Button className='rounded-0' variant='outline-success' size='sm'> <UploadOutlined className='my-auto' sx={{ fontSize: 16 }} /><span className='text-xs my-auto'>Chọn ảnh sản phẩm</span></Button>
                        </Upload>
                    </Form.Item>
                    {/* button submit */}
                    <Form.Item wrapperCol={{ offset: 20, span: 6 }}>
                        <Button type="primary" htmlType="submit">
                          <span className='mx-1'>Thêm </span>  {showSpinner && <Loading  />}
                        </Button>
                    </Form.Item>
                </Form>
                <span className='text-red-500 text-xs'> * : không thể để trống</span>
            </ModalComponent>
            {/* DRAWER CHỈNH SỬA SẢN PHẨM */}
            <DrawerComponent title='Chi Tiết Sản Phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} className='' width="60%" >
                <Form name="basic" labelCol={{ span: 8, }} wrapperCol={{ span: 18, }} style={{ maxWidth: 600, }}
                    onFinish={onUpdateProduct}
                    autoComplete="off"
                    form={form}
                >
                    {/* form tên sản phẩm */}
                    <Form.Item label="Tên sản phẩm " name='name'
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập tên sản phẩm !',
                            },
                        ]}
                    >
                        <InputComponent value={stateProductDetails.name} onChange={handleOnChangeDetails} name='name' />
                    </Form.Item>
                    {/* form giá*/}
                    <Form.Item label="Giá tiền" name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập giá tiền!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProductDetails.price} onChange={handleOnChangeDetails} name='price' />
                    </Form.Item>
                    {/* form Loại sản phẩm*/}
                    <Form.Item label="Loại sản phẩm" name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập loại sản phẩm !',
                            },
                        ]}
                    >
                        <InputComponent value={stateProductDetails.type} onChange={handleOnChangeDetails} name='type' />
                    </Form.Item>
                    {/* form Loại phòng*/}
                    <Form.Item label=" Loại phòng" name="typeRoom"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập loại phòng !',
                            },
                        ]}
                    >
                        <InputComponent value={stateProductDetails.typeRoom} onChange={handleOnChangeDetails} name='typeRoom' />
                    </Form.Item>
                    {/* form số lượng*/}
                    <Form.Item label="Số lượng" name="countInStock"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập số lượng!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProductDetails.countInStock} onChange={handleOnChangeDetails} name='countInStock' />
                    </Form.Item>
                    {/* form đánh giá*/}
                    <Form.Item label="Đánh giá" name="rating">
                        <InputComponent value={stateProductDetails.rating} onChange={handleOnChangeDetails} name='rating' />
                    </Form.Item>
                    {/* form ghi chú*/}
                    <Form.Item label="Ghi chú" name="description">
                        <TextArea rows={4} value={stateProductDetails.description} onChange={handleOnChangeDetails} name='description' />
                    </Form.Item>
                    {/* form tải ảnh*/}
                    <Form.Item label="Ảnh sản phẩm" name="image" >
                        <Upload onChange={handleOnchangeAvatarDetails} maxCount={1} className='upload-list-inline' listType="picture" onRemove={(false)}>
                            <Button className='rounded-0' variant='outline-success' size='sm'> <UploadOutlined className='my-auto' sx={{ fontSize: 16 }} /><span className='text-xs my-auto'>Chọn ảnh sản phẩm</span></Button>
                        </Upload>
                    </Form.Item>
                    {/* button submit */}
                    <Form.Item wrapperCol={{ offset: 20, span: 5 }}>
                        <Button type="primary" htmlType="submit">
                            <span className='mx-1'>Chỉnh sửa</span> {showSpinner && <Loading />}
                        </Button>
                    </Form.Item>
                </Form>
                <span className='text-red-500 text-xs'> * : không thể để trống</span>
            </DrawerComponent>
            {/* MODAL XÓA SẢN PHẨM */}
            <ModalComponent title="Xóa Sản Phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct} >
                <div className="">
                    <span className='text-sm'>
                        Bạn có chắc xóa sản phẩm này không?
                    </span>
                </div>
            </ModalComponent>
        </div >
    )
}
export default AdminProduct