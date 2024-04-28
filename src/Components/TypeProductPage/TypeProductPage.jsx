import React from 'react'
import NavbarComponent from '../NavbarComponent/NavbarComponent'
import CardComponent from '../CardComponent/CardComponent'
import './TypeProductP'
//material
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


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

    const [page, setPage] = React.useState(1);
    const onChange = (event, value) => {
        setPage(value);
    };



    return (
        <div>
            <div className='grid grid-cols-12 mt-4' >
                <div class="px-4 col-span-3" id='navbar'>
                    <div className='py-4 bg-gray-100'>
                        <NavbarComponent />
                    </div>
                </div>
                <div class=" col-span-9" id='cardlist'>
                    <div className='px-2 flex flex-wrap gap-2 justify-normal'>
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
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

