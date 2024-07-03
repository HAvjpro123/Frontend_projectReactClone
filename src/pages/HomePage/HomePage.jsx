import React from 'react'
// component
import TypeProduct from '../../Components/TypeProduct/TypeProduct'
import CardComponent from '../../Components/CardComponent/CardComponent';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import '../../CSS/HomePage.css'
//material
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import banner4 from '../../assets/imgs/banner4.png';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../service/ProductService'

const HomePage = () => {
  const arr = ['Ban', 'Ghe', 'Giuong']
  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct()
    console.log("ressss", res)
    return res
  }

  const { isLoading, data: products } = useQuery({ queryKey: ['products'], queryFn: fetchProductAll, retry: 3, retryDelay: 1000 })
  console.log("data", products)

  return (
    <div>
      {/* header */}
      <header className="masthead">
        <div className="container">
          <div className="masthead-subheading drop-shadow-md text-gray-700 ">Welcome To Our Studio!</div>
          <div className="masthead-heading drop-shadow-md   text-green-700 to-green-500">
            SALE UP TO 50%
          </div>
          <div className="masthead-subheading drop-shadow-md text-black "></div>
          <Button className='mx-auto py-1 px-4 rounded-0 ' variant="outline-dark">
            XEM THÊM
          </Button>
        </div>
      </header>
      {/* typeproduct */}
      <div className='' >
        {/* <div class="col-span-1 bg-stone-100  "></div> */}
        <div className=" bg-gradient-to-r from-green-400 to-green-600">
          <div className='flex'>
            {arr.map((item) => {
              return (
                <div key={item} className='mx-2'>
                  <TypeProduct name={item} key={item} />
                </div>
              )
            })}
          </div>
        </div>
        {/* <div class="col-span-1 bg-stone-100  "></div> */}
      </div>
      {/* cardproduct */}
      <div className='' >
        {/* <div class="col-span-1 "></div> */}
        <div >
          <div className='flex border-b border-stone-300'>
            <div className='py-2 mx-3 border-b-2 border-green-700'>
              <span className='px-1 text-xl'>SẢN PHẨM MỚI</span>
            </div>
            <div className='py-2 mx-2'>
              <button className='px-2 text-stone-500'>xem tất cả<KeyboardArrowRightIcon className='mb-1 ' /></button>
            </div>
          </div>
          <div className='mt-4 flex flex-wrap justify-normal'>
            {products?.data?.map((product) => {
              return (
                <CardComponent
                  key={product._id}
                  countInStock={product.countInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  type={product.type}
                  typeRoom={product.typeRoom}
                  selled={product.selled}
                  discount={product.discount}
                />
              )
            })}
          </div>
          
        </div>
        {/* <div class="col-span-1 "></div> */}
      </div>
      {/* homepage */}
      <div className='bg-gray-00' >
        {/* <div class="col-span-1 bg-stone-100 "></div> */}
        <div >
          <div className=''>
            {/*---Carousel---*/}
            <Carousel data-bs-theme="dark" >
              {/*---Carousel1---*/}
              <Carousel.Item>
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                  <div className="justify-between flex w-2/3 my-14  bg-gradient-to-r from-stone-300 to-stone-400	" >
                    <img
                      src={banner4}
                      alt="banner4"
                      className=" w-2/3"
                    />
                    <div className="my-auto mx-6 w-96">
                      <h4 className=''>SETUP YOUR ROOM </h4>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      <Button className='rounded-0' variant="outline-light"><p className="m-0">Xem Thêm</p></Button>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
              {/*---Carousel2---*/}
              <Carousel.Item>
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                  <div className="justify-between flex w-2/3 my-14 bg-gradient-to-r from-stone-300 to-stone-400	" >
                    <img
                      src={banner4}
                      alt="banner4"
                      className=" w-2/3"
                    />
                    <div className="my-auto mx-6 w-96">
                      <h4 className=''>SETUP YOUR ROOM </h4>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      <Button className='rounded-0' variant="outline-light"><p className="m-0">Xem Thêm</p></Button>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
        {/* <div class="col-span-1 bg-stone-100"></div> */}

      </div>

    </div>

  )
}

export default HomePage