const BACKEND_URL = 'http://localhost:5000'

export const getexams = () =>{
    return fetch(`${BACKEND_URL}/getexams`)
    .then(res=>res.json())
    .catch(error=>console.log(error))
}

export const getexamdetails = (id) =>{
    return fetch(`${BACKEND_URL}/getexamdetails/${id}`)
    .then(res=>res.json())
    .catch((error)=>console.log(error))
}

export const addexam = (exam) => {
    return fetch(`${BACKEND_URL}/addexam`, {
        method: 'POST',
        body: exam // FormData object
    })
    .then((response) => response.json())
    .catch((error) => console.log(error))
}


export const updateexam = (id, exam)=>{
    return fetch(`${BACKEND_URL}/updateexam/${id}`,{
        method: "PUT",
        body: exam
    })
    .then((response)=>response.json())
    .catch((error)=>console.log(error))
}

export const deleteexam = (id,token)=>{
    return fetch(`${BACKEND_URL}/deleteexam/${id}`,{
        method:"DELETE",
        headers:{
            Authorization:`Bearer ${token}`
        }
        
    })
    .then((res)=>res.json())
    .catch((err)=>console.log(err))
}