import React from "react";
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import banner4 from '../images/banner4.png';
import banner3 from '../images/banner3.png';
import banner7 from '../images/banner7.png';
import '../CSS/Home.css'


export default class Home extends React.Component {
    
    render() {
        
       
        return(
            <section className="container_home">
                    {/*---Banner---*/}
                    <div className="text-center ">

                        <img
                            className=" w-100"
                            src={banner7}
                            width='100%'
                            height="auto"
                            alt="First slide"
                        />

                        <div className="text-banner font-bold text-green-700">
                            <p className="text-black">HAPPY SEASON - ƯU ĐÃI ĐẾN</p>
                            <p className="text-8xl">50%</p>
                            <p className="text-black">TẤT CẢ NỘI THẤT VÀ TRANG TRÍ TỪ 30.2.2025</p>
                            <Button variant="outline-dark"><p className="m-0">Xem Chi Tiết</p></Button>
                        </div>

                    </div>
                <Carousel data-bs-theme="dark" >
                {/*---Carousel1---*/}
                <Carousel.Item>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="justify-between flex w-2/3 " >
                               <img
                                src={banner4}
                                alt="banner1"
                                className="my-20 mr-10 w-2/3"
                                /> 
                            <div className="my-auto w-96">
                                <h3>Setup your room </h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <Button variant="outline-success"><p className="m-0">Xem Thêm</p></Button>
                            </div>
                        </div>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="justify-between flex w-2/3 " >
                               <img
                                src={banner3}
                                alt="banner1"
                                className="my-20 mr-10 w-2/3"
                                /> 
                            <div className="my-auto w-96">
                                <h3>Setup your room </h3>
                                <br/>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <br/>
                                <Button variant="outline-success"><p className="m-0">Xem Thêm</p></Button>
                            </div>
                        </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
                <Button type="primary"></Button>
                
            </section>
        );
    }
}