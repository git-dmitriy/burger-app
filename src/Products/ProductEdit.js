import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { css } from '@emotion/css';

import {
  createProduct,
  retrieveProduct,
  updateProduct,
  deleteProduct,
} from './ProductService';

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
      transition: border 0.2s, color.2s;
      &-Wrapper {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
      &:focus,
      &:hover {
        border: 2px solid #50fa7b;
        color: #50fa7b;
      }
    }
  }
`;

const ProductEdit = ({ isEdit }) => {
  const { id } = useParams();
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

  const handleUpdate = async () => {
    try {
      await updateProduct(form);
      // ! --------------------------------------
      // todo create a notification component
      alert(`Update ${form.name}`);
      navigate('/admin');
    } catch (err) {
      console.warn(err);
    }
  };

  const handleDelete = async () => {
    // ! --------------------------------------
    // todo create a notification component
    if (!window.confirm(`Delete this ${form.name} product?`)) {
      return;
    }
    try {
      await deleteProduct(form.id);
      navigate('/admin');
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (!isEdit) {
      setForm({
        id: '',
        name: '',
        price: 0,
        description: '',
      });
      return;
    }

    (async () => {
      try {
        const product = await retrieveProduct(id);
        setForm(product);
      } catch (err) {
        console.warn(err);
        navigate('/admin', { replace: true });
      }
    })();
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
      <div className='ProductEdit-Button-Wrapper'>
        {!isEdit && (
          <button
            className='ProductEdit-Button'
            type='button'
            onClick={handleCreate}
          >
            Create
          </button>
        )}
        {isEdit && (
          <button
            className='ProductEdit-Button'
            type='button'
            onClick={handleUpdate}
          >
            Update
          </button>
        )}
        {isEdit && (
          <button
            className='ProductEdit-Button'
            type='button'
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductEdit;
