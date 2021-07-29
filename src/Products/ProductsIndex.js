import React, { useState, useEffect } from 'react';
import { listProducts } from './ProductService';
import ProductCard from './ProductCard';
import { useLocation, useSearchParams } from 'react-router-dom';
import { css } from '@emotion/css';

const ProductsIndexStyles = css`
  .ProductsIndex {
    &-Radios {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        width: 35px;
        color: #fff;
        font-size: 0.8rem;
        margin-right: 10px;
      }
      label {
        display: flex;
        flex-direction: row-reverse;
        cursor: pointer;
      }
      input {
        cursor: pointer;
      }
    }
    &-List {
      padding: 0;
      list-style: none;
      margin-top: 10px;
    }
  }
`;

const ProductsIndex = () => {
  const { state } = useLocation();
  const [products, setProducts] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  let controller = new AbortController();

  useEffect(() => {
    if (state) {
      console.warn(`Nothing found for ${state.id}`);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const data = await listProducts();
      controller.signal;
      setProducts(data);
    })();
    return () => controller?.abort();
  }, []);

  const updateParams = (e) => {
    const { name, value } = e.target;
    const currentParams = Object.fromEntries([...searchParams]);
    const newParams = { ...currentParams, [name]: value };
    setSearchParams(newParams);
  };

  if (products === null) {
    return <div>Loading...</div>;
  }
  return (
    <div className={ProductsIndexStyles}>
      <div className='ProductsIndex-Radios'>
        <span>Sort:</span>
        <label>
          Name
          <input
            type='radio'
            name='sort'
            value='name'
            onChange={updateParams}
            defaultChecked={searchParams.get('sort') === 'name'}
          />
        </label>
        <label>
          Price
          <input
            type='radio'
            name='sort'
            value='price'
            onChange={updateParams}
            defaultChecked={searchParams.get('sort') === 'price'}
          />
        </label>
      </div>
      <div className='ProductsIndex-Radios'>
        <span>Order:</span>
        <label>
          Ascending
          <input
            type='radio'
            name='order'
            value='ascending'
            onChange={updateParams}
            defaultChecked={searchParams.get('order') === 'ascending'}
          />
        </label>
        <label>
          Descending
          <input
            type='radio'
            name='order'
            value='descending'
            onChange={updateParams}
            defaultChecked={searchParams.get('order') === 'descending'}
          />
        </label>
      </div>

      <ul className='ProductsIndex-List'>
        {products.map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default ProductsIndex;
