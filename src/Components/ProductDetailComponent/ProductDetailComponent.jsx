import React from 'react'


//MATERIAL
import Container from 'react-bootstrap/Container';
import banner1 from '../../assets/imgs/banner1.png'
import banner2 from '../../assets/imgs/banner2.png'
import StarIcon from '@mui/icons-material/Star';
import { Button } from 'react-bootstrap';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Col, Image, Row, InputNumber } from 'antd';


const ProductDetailComponent = () => {

    return (
        <Container className='bg-gray-100 p-3'>
            <Row className=''>
                <Col xs={24} md={8} className='p-3'>
                    <Image src={banner1} alt="" width={'100%'} preview={true} />
                    <Row>
                        <Col span={6}><Image src={banner2} alt="small img" /></Col>
                        <Col span={6}><Image src={banner2} alt="small img" /></Col>
                        <Col span={6}><Image src={banner2} alt="small img" /></Col>
                        <Col span={6}><Image src={banner2} alt="small img" /></Col>
                    </Row>
                </Col >
                <Col xs={24} md={16} className='p-3'>
                    <p className='text-2xl '>Product detail name </p>
                    <div className='flex'>
                        <p className='text-sm text-gray-500 mr-2 '>Đã bán: <span className='text-black'>19k+ |</span> </p>
                        <p className='text-sm text-gray-500 '>Đánh giá: <span className='text-black'>5<StarIcon className='text-yellow-500 mb-1' sx={{ fontSize: 16 }}/></span> </p>

                    </div>
                    
                    <p className='text-3xl font-bold text-green-600'>200.000đ </p>
                    <div className='flex my-4'>
                        <span className='text-xl my-auto text-gray-500'>Số lượng: </span>
                        <div className='mx-2 flex '>
                            <Button className='px-3 py-1  rounded-0' variant="outline-dark">
                                <span className='text-xl font-bold'>-</span>
                            </Button>
                            <InputNumber defaultValue={1} className='my-auto rounded-none w-12 text-xl' />
                            <Button className='rounded-0' variant="outline-dark">
                                <span className='text-xl font-bold'>+</span>
                            </Button>
                            <span className='text-sm mx-2 my-auto text-gray-500 '> 1000 số lượng có sẵn  </span>
                        </div>

                    </div>
                    <div className='flex'>
                        <Button className='px-4 py-2  rounded-0' variant="outline-success">
                            <span className='text-sm'><AddShoppingCartIcon className='text-sm mb-1' sx={{ fontSize: 14 }} /> THÊM VÀO GIỎ HÀNG </span>
                        </Button>
                        <Button className='mx-4 px-4 py-2 rounded-0' variant="success">
                            <span className='text-sm'> MUA NGAY</span>
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row className='p-3'>
                <Col sm>sm=true</Col>
                <Col sm>sm=true</Col>
                <Col sm>sm=true</Col>
            </Row>
            <Row>
                <Col sm>sm=true</Col>
                <Col sm>sm=true</Col>
                <Col sm>sm=true</Col>
            </Row>
            <Row>
                <Col sm>sm=true</Col>
                <Col sm>sm=true</Col>
                <Col sm>sm=true</Col>
            </Row>
            <Row>
                <Col sm>sm=true</Col>
                <Col sm>sm=true</Col>
                <Col sm>sm=true</Col>
            </Row>
            <Row>
                <Col sm>sm=true</Col>
                <Col sm>sm=true</Col>
                <Col sm>sm=true</Col>
            </Row>
        </Container>
    )
}

export default ProductDetailComponent