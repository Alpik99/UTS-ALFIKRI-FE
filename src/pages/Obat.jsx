import React from 'react'
import Sidebar from '../components/Sidebar'
import { useState, useEffect } from 'react'
import './obat.css'
import { createMedicine, deleteMedicine, getAllMedicine, updateMedicine } from '../services/getApi'
import { Modals } from '../components/editModal'

const Obat = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const openModals = () => setModalOpen(true);
    const closeModals = () => setModalOpen(false);

    const [AllMedicine, setAllMedicine] = useState()

    useEffect(() => {
        getAllMedicine(AllMedicine)
        .then((res) => {
            setAllMedicine(res.data)
        })
    }, [])
    console.log(AllMedicine);

    const [post, setPost] = useState({
        name: '',
        type: '',
        description: ''
    })

    const submit = (e) => {
        e.preventDefault();
        if (!post.name || !post.type || !post.description){
            alert('Isi form data dengan lengkap')
            return;
        }

        createMedicine(post)
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

    const handle = (e) => {
        const newPost = {...post}
        newPost[e.target.id]=e.target.value
        setPost(newPost)
    }

    //EDIT OBAT
    const [put, setPut] = useState({
        id: '', // Add ID field to match API endpoint
        name: '',
        type: '',
        description: ''
    });

    const getDataId = () => {
        updateMedicine(put, put.id)
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
    const deletedMedicine = async (id) => {
        try{
            await deleteMedicine(id)
            const updatedPost = AllMedicine.filter(post => post.id !== id);
            if(updatedPost){
                alert('Medicine successfully deleted!')
            }
            setAllMedicine(updatedPost)
        }catch (error){
            console.error('error deleting post: ', error)
        }
    }
  return (
    <div>
        <Sidebar />
        <div className="obat">
            <div className='flex justify-between items-center'>
                <div className="judul">
                    <h3 className='font-extrabold text-red-700 text-3xl '>OBAT</h3>
                </div>
                <form onSubmit={(e) => {submit(e)}} className="kolomObat flex gap-3 p-2">
                    <input  onChange = {(e) => handle(e)} id='name' value={post.name} type="text" placeholder='name' className='p-2 rounded outline outline-red-700'/>
                    <input  onChange = {(e) => handle(e)} id='type' value={post.type} type="type" placeholder='type' className='p-2 rounded outline outline-red-700'/>
                    <input  onChange = {(e) => handle(e)} id='description' value={post.description} type="description" placeholder='description' className='p-2 rounded outline outline-red-700'/>
                    <button className='p-2 bg-red-700 rounded text-white font-semibold px-3'>Submit</button>
                </form>
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
                                    AllMedicine?.map((items, key) => {
                                        return(                                        
                                        <tbody className='text-center'>
                                            <tr className='bg-white cursor-pointer' key={key}>
                                                <td className='py-3 px-6 rounded-bl-lg'>{items.id}</td>
                                                <td className='py-3 px-6'>{items.name}</td>
                                                <td className='py-3 px-6'>{items.type}</td>
                                                <td className='py-3 px-6'>{items.description}</td>
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

                                                            <input onChange = {(e) => handleData(e)} id='name' value={put.name} type="text" placeholder='nama obat...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>

                                                            <input onChange = {(e) => handleData(e)} id='type' value={put.type} type="text" placeholder='tipe obat...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>

                                                            <input onChange = {(e) => handleData(e)} id='description' value={put.description} type="text" placeholder='deskripsi...' className='w-full outline outline-2 flex rounded-md outline-blue-600 p-2 text-blue-600'/>
                                                        </div>
                                                    </Modals>
                                                    </form>
                                                    <button onClick={() => {deletedMedicine(items.id)}} className="bg-red-500 text-white font-semibold rounded p-2 px-3">Delete</button>
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
    </div>
  )
}

export default Obat