import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import '@ant-design/v5-patch-for-react-19';

const Home = () => {
  const [selectedId, setselectedId] = useState("");
  const [clicked, setclicked] = useState(false);
  const [arr, setArr] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('expenseLogin'));
  const id = user._id;

  const updateNameRef = useRef();
  const updatepriceRef = useRef();
  const updateDateRef = useRef();
  const snoRef = useRef();
  const placeRef = useRef();
  const priceRef = useRef();
  const dateRef = useRef();

  const showModal = () => setIsModalOpen(true);

  const handleOk = async () => {
    let obj = {};
    if (updateNameRef.current.value) obj.expenseName = updateNameRef.current.value;
    if (updatepriceRef.current.value) obj.price = updatepriceRef.current.value;
    if (updateDateRef.current.value) obj.date = updateDateRef.current.value;

    let res = await axios.put(`https://fullstackexpense.onrender.com/api/expense/update/${selectedId}`, obj);
    console.log(res.data);
    getData();

    updateNameRef.current.value = "";
    updatepriceRef.current.value = "";
    updateDateRef.current.value = "";
    setIsModalOpen(false);
  };

  const handleCancel = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let obj = {
      expenseName: placeRef.current.value,
      price: priceRef.current.value,
      date: dateRef.current.value,
      userId: id
    };

    try {
      let res = await axios.post('https://fullstackexpense.onrender.com/api/expense/create', obj);
      console.log(res.data);
      setclicked(!clicked);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }

    snoRef.current.value = "";
    placeRef.current.value = "";
    priceRef.current.value = "";
    dateRef.current.value = "";
  };

  const getData = async () => {
    try {
      let res = await axios.post(`https://fullstackexpense.onrender.com/api/expense/getexpense`, {
        userId: id // ✅ fixed here
      });
      console.log(res.data);
      setArr(res.data.findUser);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (ele) => {
    setselectedId(ele._id);
    showModal();
  };

  const handledelete = async (ele) => {
    let res = await axios.delete(`https://fullstackexpense.onrender.com/api/expense/delete/${ele._id}`);
    console.log(res.data);
    getData();
  };

  const [searchvalue, setsearchvalue] = useState("");
  const handleSearchChanger = (e) => setsearchvalue(e.target.value);

  const filteredExpense = searchvalue
    ? arr.filter((ele) => ele.expenseName.toLowerCase().includes(searchvalue.toLowerCase()))
    : arr;

  useEffect(() => {
    getData();
  }, [clicked]);

  return (
    <div>

      

      {/* <h1 className="text-center text-2xl font-bold my-5">This is a home page</h1> */}

      <div className='bg-black my-3 p-5 flex justify-center gap-2 w-max m-auto rounded-md'>
        <input ref={snoRef} className='py-1 px-7' type='number' placeholder='enter sno' />
        <input ref={placeRef} className='py-1 px-7' type='text' placeholder='enter a place' />
        <input ref={priceRef} className='py-1 px-7' type='number' placeholder='enter price' />
        <input ref={dateRef} className='py-1 px-7' type='date' placeholder='enter date' />
        <button onClick={handleSubmit} className='bg-blue-500 py-1 px-7 rounded-md text-white'>Add Item</button>
      </div>

      <div className='my-4 bg-red-400 w-max mx-auto'>
        <input type="text" onChange={handleSearchChanger} className='border border-yellow-400 py-1 px-4' placeholder='filter expense using place' />
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Sno</th>
              <th className="px-6 py-3">Place</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredExpense.map((ele, i) => (
                <tr key={ele._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="py-4 font-medium text-gray-900 dark:text-white">{i + 1}</th>
                  <td className="py-4">{ele?.expenseName}</td>
                  <td className="py-4">{ele?.price}</td>
                  <td className="py-4">{ele?.date}</td>
                  <td className="py-4">
                    <button onClick={() => handledelete(ele)} className='bg-green-700 text-white py-1 px-4 rounded-md'>Delete</button>
                    <button onClick={() => handleUpdate(ele)} className='bg-blue-700 text-white py-1 px-4 ml-2 rounded-md'>Update</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <Modal title="Update Expense Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className='flex flex-col'>
          <label>Expense Name</label>
          <input ref={updateNameRef} className='py-2 px-4 my-1 border border-blue-950 rounded-md' type="text" placeholder='Enter expense name...' />
          <label>Price</label>
          <input ref={updatepriceRef} className='py-2 px-4 my-1 border border-blue-950 rounded-md' type="number" placeholder='Enter price' />
          <label>Date</label>
          <input ref={updateDateRef} className='py-2 px-4 my-1 border border-blue-950 rounded-md' type="date" />
        </div>
      </Modal>
    </div>
  );
};

export default Home;
