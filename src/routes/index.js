

import ProductDetalPage from "../pages/ProductDetailPage/ProductDetailPage"
import SignInPage from "../pages/SignInPage/SignInPage"
import SignUpPage from "../pages/SignUpPage/SignUpPage"
import TypeProductPage from "../Components/TypeProductPage/TypeProductPage"
import HomePage from "../pages/HomePage/HomePage"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
import OrderPage from "../pages/OrderPage/OrderPage"
import ProductPage from "../pages/ProductPage/ProductPage"
import ProfilePage from "../pages/Profile/ProfilePage"
import AdminPage from "../pages/AdminPage/AdminPage"

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
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true

    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
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