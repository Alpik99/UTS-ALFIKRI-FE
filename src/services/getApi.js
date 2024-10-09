import axios from "axios"

// MEDICINE API
export const getAllMedicine = () => {
    return axios.get('http://localhost:3001/Medicine')
    .then(response => response)
}

export const createMedicine = async (a) => {
    try {
      const response = await axios.post('http://localhost:3001/Medicine/create', a);
      return response;
    } catch (error) {
      throw error;
    }
};

export const updateMedicine = async (data, id) => {
    return await axios.put(`http://localhost:3001/Medicine/update/` + id, data)
    .then(res => res.data)
}

export const deleteMedicine = async (id) => {
    return await axios.delete(`http://localhost:3001/Medicine/delete/${id}`)
    .then(res => res.data)
}

//CUSTOMER API
export const getAllCustomer = () => {
  return axios.get('http://localhost:3001/Customer')
  .then(response => response)
}

export const createCustomer = async (a) => {
  try {
    const response = await axios.post('http://localhost:3001/Customer/create', a);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateCustomer = async (data, id) => {
  return await axios.put(`http://localhost:3001/Customer/update/` + id, data)
  .then(res => res.data)
}


export const deleteCustomer = async (id) => {
  return await axios.delete(`http://localhost:3001/Customer/delete/${id}`)
  .then(res => res.data)
}