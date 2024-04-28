import React from 'react'
import { Button, Card } from 'react-bootstrap';
import banner1 from '../../assets/imgs/banner1.png'
import '../../CSS/CardComponent.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const CardComponent = () => {
    return (
        <div>
            
            <div style={{ width: '17rem' }}  className=' border-1 border-transparent hover:border-stone-40 card-item'>
                <Card.Body className='m-3'>
                    <Card.Img className='mb-1' variant="top" src={banner1} />
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 ">
                        {/* <span className='text-sm text-stone-500  '><del>10.000.000 VNĐ</del> </span> 
                        <span className='text-sm text-red-500'>-10%</span> */}
                    </Card.Subtitle>
                    <Card.Subtitle className="my-2 ml-auto">
                        <span className=''>9.000.000₫</span>
                    </Card.Subtitle>
                    <div className='flex card-info'>
                        <Button className='mr-auto py-1 rounded-0'variant="outline-success">
                            <span className='text-sm'><AddShoppingCartIcon className='text-sm mb-1' sx={{ fontSize: 14 }}/> THÊM VÀO GIỎ</span>
                        </Button>
                        <Button className='ml-auto py-1 rounded-0 'variant="outline-dark">
                            <span className='text-sm'> XEM THÊM</span>
                        </Button>
                    </div>
                </Card.Body>
            </div>
        </div>
    )
}

export default CardComponent