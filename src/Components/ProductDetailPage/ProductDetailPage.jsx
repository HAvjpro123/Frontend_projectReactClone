import React from 'react'
import ProductDetailComponent from '../ProductDetailComponent/ProductDetailComponent'

const ProductDetailPage = () => {
  return (
    <div className='grid grid-cols-12'>
      <div className=' col-span-12'>
        ProductDetailPage
      </div>
      <div className=' col-span-12'>
        <ProductDetailComponent />
      </div>
    </div>
  )
}

export default ProductDetailPage