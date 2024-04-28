

import ProductDetalPage from "../Components/ProductDetailPage/ProductDetailPage"
import SignInPage from "../Components/SignInPage/SignInPage"
import SignUpPage from "../Components/SignUpPage/SignUpPage"
import TypeProductPage from "../Components/TypeProductPage/TypeProductPage"
import HomePage from "../pages/HomePage/HomePage"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
import OrderPage from "../pages/OrderPage/OrderPage"
import ProductPage from "../pages/ProductPage/ProductPage"

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    
    {
        path: '/orderpage',
        page: OrderPage,
        isShowHeader: true

    },
    {
        path: '/productpage',
        page: ProductPage,
        isShowHeader: true

    },
    {
        path: '/:type',
        page: TypeProductPage,
        isShowHeader: true

    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false

    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false

    },
    {
        path: '/product-detail',
        page: ProductDetalPage,
        isShowHeader: true

    },
    {
        path: '*',
        page: NotFoundPage
    },
    // {
    //     path: '/blog',
    //     page: Blog
    // },
    // {
    //     path: '/contact',
    //     page: Contact
    // },
    // {
    //     path: '/product',
    //     page: Product
    // },
    // {
    //     path: '/header',
    //     page: Header
    // },
]