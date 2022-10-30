import React from 'react'
import {Product} from '../components';
import { client } from '../lib/client';

const Products = ({products}) => (

    <div>
        <div className="products-heading">
            <h2>Selling Products</h2>
            <p>Speaker there are many variations</p>
        </div>
        <div className='products-container'>
            {products?.map((product)=><Product key={product._id} product={product} />)}
        </div>
    </div>
  );
  export const getServerSideProps = async () => {
    const query = '*[_type == "product"]';
    const products = await client.fetch(query);

    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);

    return {
      props: { products, bannerData}
    }
  }

export default Products