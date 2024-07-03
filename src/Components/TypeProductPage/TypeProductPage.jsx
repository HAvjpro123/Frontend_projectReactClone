import React from 'react'
import NavbarComponent from '../NavbarComponent/NavbarComponent'
import CardComponent from '../CardComponent/CardComponent'
import './TypeProductP'
//material
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import * as ProductService from '../../service/ProductService'


import '../../CSS/HomePage.css'
//material

import { useQuery } from '@tanstack/react-query';


const TypeProductPage = () => {
    window.addEventListener('resize', function () {
        var screenWidth = window.innerWidth;
        var navbar = document.getElementById('navbar');
        var cardlist = document.getElementById('cardlist');
        if (screenWidth > 800) {
            navbar.classList.remove('col-span-12');
            navbar.classList.add('col-span-3');
            cardlist.classList.remove('col-span-12');
            cardlist.classList.add('col-span-9');
        } else {
            navbar.classList.add('col-span-12');
            navbar.classList.remove('col-span-3');
            cardlist.classList.add('col-span-12');
            cardlist.classList.remove('col-span-9');
        }
    });
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct()
        console.log("ressss", res)
        return res
      }
    const [page, setPage] = React.useState(1);
    const onChange = (event, value) => {
        setPage(value);
    };
    const { isLoading, data: products } = useQuery({ queryKey: ['products'], queryFn: fetchProductAll, retry: 3, retryDelay: 1000 })
    console.log("data", products)


    return (
        <div>
            <div className='grid grid-cols-12 mt-4' >
                <div class="px-4 col-span-3" id='navbar'>
                    <div className='py-4 bg-gray-100'>
                        <NavbarComponent />
                    </div>
                </div>
                <div class=" col-span-9" id='cardlist'>
                    <div className='flex flex-wrap justify-normal'>
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
                    <div >
                        <Stack spacing={2} >
                            <Typography>Page: {page}</Typography>
                            <Pagination className='mx-auto my-4' count={10} page={page} color='success' onChange={onChange} />
                        </Stack>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TypeProductPage

