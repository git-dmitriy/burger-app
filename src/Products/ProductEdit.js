import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { css } from '@emotion/css';

import { createProduct } from './ProductService';

const ProductEditStyles = css`
  color: #fff;
  background-color: #2a2c37;
  border-radius: 6px;
  padding: 15px;
  .ProductEdit {
    &-Input {
      width: 100%;
      border: 1px solid transparent;
      color: #fff;
      background-color: #1d1e26;
      padding: 10px 15px;
      margin-bottom: 5px;
      border-radius: 6px;
      outline: 0;
      &:focus {
        border-color: #50fa7b;
      }
    }

    &-Textarea {
      min-height: 80px;
      resize: none;
    }
    &-Button {
      border: 2px solid #1d1e26;
      color: #1d1e26;
      color: #757575;
      background: none;
      padding: 10px 15px;
      border-radius: 6px;
      outline: none;
      cursor: pointer;
      font-weight: 600;
      text-transform: uppercase;
      &:focus {
        border: 2px solid #50fa7b;
        color: #50fa7b;
      }
    }
  }
`;

const ProductEdit = () => {
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  const updateField = ({ name, value }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    try {
      const { id } = await createProduct(form);
      navigate(`/admin/${id}`);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    setForm({
      id: '',
      name: '',
      price: 0,
      description: '',
    });
  }, []);

  if (form === null) {
    return <div>Loading...</div>;
  }

  return (
    <form className={ProductEditStyles}>
      <input
        type='text'
        name='id'
        placeholder='ID'
        value={form.id}
        className='ProductEdit-Input'
        onChange={({ target }) => updateField(target)}
      />
      <input
        type='text'
        name='name'
        placeholder='Name'
        value={form.name}
        className='ProductEdit-Input'
        onChange={({ target }) => updateField(target)}
      />
      <input
        type='number'
        name='price'
        placeholder='Price'
        value={form.price}
        className='ProductEdit-Input'
        onChange={({ target }) => updateField(target)}
      />
      <textarea
        name='description'
        placeholder='Description'
        value={form.description}
        className='ProductEdit-Input ProductEdit-Textarea'
        onChange={({ target }) => updateField(target)}
      />
      <button
        className='ProductEdit-Button'
        type='button'
        onClick={handleCreate}
      >
        Create
      </button>
    </form>
  );
};

export default ProductEdit;
