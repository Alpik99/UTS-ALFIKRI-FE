import React, { useState,useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { createCustomer, deleteCustomer, getAllCustomer, updateCustomer } from '../services/getApi'
import { Modals } from '../components/editModal'


const Customers = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const openModals = () => setModalOpen(true);
    const closeModals = () => setModalOpen(false);


    const [AllCustomer, setAllCustomer] = useState()

    useEffect(() => {
        getAllCustomer(AllCustomer)
        .then((res) => {
            setAllCustomer(res.data)
        })
    }, [])
    console.log(AllCustomer);

    const [post, setPost] = useState({
        first_name: '',
        last_name: '',
        phoneNumber: ''
    })

    const submit = (e) => {
        e.preventDefault();
        if (!post.first_name || !post.last_name || !post.phoneNumber){
            alert('Isi form data dengan lengkap')
            return;
        }

        createCustomer(post)
        .then(res => {
            console.log(res);
            if(post){
                alert('Table successfully created, please refresh the page!')
            }
            return res.data;
        })
        .catch(error => {
            console.error('Error :', error)
            alert('An error occurred while creating Table. Please try again later.')
        })
    }

    const [put, setPut] = useState({
        id: '', // Add ID field to match API endpoint
        name: '',
        type: '',
        description: ''
    });

    const getDataId = () => {
        updateCustomer(put, put.id)
        .then(res => {
            console.log(res);
            if(put){
                alert('Customer successfully edited! Please refresh the page')
            }
            closeModals(); // Close the modal after successful PUT request
        })
        .catch(error => console.error('Error:', error));
    };

    function handleData(e) {
        const newPut = { ...put };
        newPut[e.target.id] = e.target.value;
        setPut(newPut);
    }

    // delete menu
    const deletedCustomer = async (id) => {
        try{
            await deleteCustomer(id)
            const updatedPost = AllCustomer.filter(post => post.id !== id);
            if(updatedPost){
                alert('customer successfully deleted!')
            }
            setAllCustomer(updatedPost)
        }catch (error){
            console.error('error deleting post: ', error)
        }
    }

    const handle = (e) => {
        const newPost = {...post}
        newPost[e.target.id]=e.target.value
        setPost(newPost)
    }
  return (
    <div>
        <Sidebar></Sidebar>
        <div className="customer m-5">
            <div className='flex justify-between items-center'>
                    <div className="judul">
                        <h3 className='font-extrabold text-red-700 text-3xl '>CUSTOMER</h3>
                    </div>
                    <form onSubmit={(e) => {submit(e)}} className="kolomObat flex gap-3 p-2">
                        <input  onChange = {(e) => handle(e)} id='first_name' value={post.first_name} type="text" placeholder='nama depan' className='p-2 rounded outline outline-red-700'/>

                        <input  onChange = {(e) => handle(e)} id='last_name' value={post.last_name} type="text" placeholder='nama akhir' className='p-2 rounded outline outline-red-700'/>

                        <input  onChange = {(e) => handle(e)} id='phoneNumber' value={post.phoneNumber} type="number" placeholder='nomor telp' className='p-2 rounded outline outline-red-700'/>

                        <button className='p-2 bg-red-700 rounded text-white font-semibold px-3'>Submit</button>
                    </form>
                </div>   
            </div>
            <div className='w-[90%] max-h-[500px] m-auto h-screen flex justify-center p-2 lg:max-w-[920px] md:max-w-[800px] sm:max-w-[700px] gap-5 overflow-x-auto' style={{ scrollbarWidth: '6px' }}>
                <div className='w-full overflow-x-auto'>
                    <table className='shadow-lg w-full min-w-[600px]'>
                        <thead className='text-white rounded-t-lg'>
                        <tr>
                            <th className='py-3 bg-red-700 rounded-tl-lg'>Id</th>
                            <th className='py-3 bg-red-700'>Name</th>
                            <th className='py-3 bg-red-700'>Type</th>
                            <th className='py-3 bg-red-700'>Description</th>
                            <th className='py-3 bg-red-700 rounded-tr-lg'>Action</th>
                        </tr>
                        </thead>
                            {
                                AllCustomer?.map((items, key) => {
                                    return(                                        
                                    <tbody className='text-center'>
                                        <tr className='bg-white cursor-pointer' key={key}>
                                            <td className='py-3 px-6 rounded-bl-lg'>{items.id}</td>
                                            <td className='py-3 px-6'>{items.first_name}</td>
                                            <td className='py-3 px-6'>{items.last_name}</td>
                                            <td className='py-3 px-6'>{items.phoneNumber}</td>
                                            <td className='py-3 px-6 rounded-br-lg gap-x-2 flex justify-center items-center'>
                                                <button onClick={openModals} className='p-2 bg-green-500 text-white rounded font-semibold px-3'>Edit</button>  
                                                <form onSubmit={(e) => { e.preventDefault(); getDataId(); }}>        
                                                <Modals
                                                    isBuka={modalOpen} 
                                                    onTutup={closeModals} 
                                                    judul="Edit"
                                                >
                                                    <div className='flex flex-col gap-y-3'>
                                                        <input onChange = {(e) => handleData(e)} id='id' value={put.id} type="text" placeholder='Enter Id...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>

                                                        <input onChange = {(e) => handleData(e)} id='first_name' value={put.first_name} type="text" placeholder='nama depan..' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>

                                                        <input onChange = {(e) => handleData(e)} id='last_name' value={put.last_name} type="text" placeholder='nama belakang..' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>

                                                        <input onChange = {(e) => handleData(e)} id='phoneNumber' value={put.phoneNumber} type="text" placeholder='nomor telp..' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>
                                                    </div>
                                                </Modals>
                                                </form>
                                                <button onClick={() => {deletedCustomer(items.id)}} className="bg-red-500 text-white font-semibold rounded p-2 px-3">Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    )
                                })
                            }
                    </table>
                </div>
            </div>
        </div>
  )
}

export default Customers