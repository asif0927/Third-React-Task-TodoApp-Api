import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function Api() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [isDiscounted, setIsDiscounted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://northwind.vercel.app/api/products');
      setData(result.data);
    };
    fetchData();
  }, []);

  const handleSortByPrice = () => {
    setData([...data].sort((a, b) => a.unitPrice - b.unitPrice));
  };

  const handleIsDiscounted = () => {
    setData([...data].filter((item)=>item.discontinued==true));
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Bu mehsili silmeye eminsiz?');
    if (confirmDelete) {
      axios.delete(`https://northwind.vercel.app/api/products/${id}`).then(() => {
        setData(data.filter((item) => item.id !== id));
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id:uuidv4(),
      name: e.target.name.value,
      unitPrice: e.target.unitPrice.value,
      isDiscounted: e.target.isDiscounted.checked,
    };
    if(e.target.unitPrice.value<=0){
        alert('mehsulun qiymeti 0-dan asagi ola bilmez');
        return
    }
    axios.post('https://northwind.vercel.app/api/products', newProduct).then((response) => {
      setData([...data, response.data]);
      e.target.name.value="";
      e.target.unitPrice.value="";
      e.target.isDiscounted.checked=false;
    });
  };

  return (
    <>
      <div className='header-list-item'>
        <input type='search' value={search} onChange={(e) => setSearch(e.target.value)} className='search-inp' placeholder='search list name' />
        <button className='sortbtn' onClick={handleSortByPrice}>SortByPrice</button>
        <button className='sortbtn' onClick={handleIsDiscounted}>Is Discounted </button>
      </div>
      <ul className='task-1-ul'>
      {data&&data.filter((item) => item.name && item.name.toLowerCase().includes(search.toLowerCase()))
        .filter((item) => (isDiscounted ? item.isDiscounted === true : true))
         .map((item) => (
      <li className='task-1-li' key={item.id}>
      <p className='name'>{item.name}</p>&nbsp;<span className='price'>{item.unitPrice}</span>
      <button className='deletebtn' onClick={() => handleDelete(item.id)}>
        Delete
      </button>
     </li>
    ))}

      </ul>
      <form onSubmit={handleSubmit} className='form'>
        <h3 className='form-h3'>Add New Product</h3>
        <div className='name-div'>
          <label htmlFor='name'>Name:</label>
          <input type='text' name='name' required />
        </div>
        <br />
        <div className='name-div'>
         <label htmlFor='unitPrice'>Unit Price:</label>
         <input type='number' name='unitPrice'  required />
        </div>
        <br />
        <div className='name-div'>
          <label htmlFor='isDiscounted'>Is Discounted:</label>
          <input type='checkbox' name='isDiscounted' />
        </div>
        <br />
        <button type='submit'>Add Product</button>
      </form>
    </>
  );
}

export default Api;

