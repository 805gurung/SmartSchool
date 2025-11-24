const BACKEND_URL = 'http://localhost:5000'

export const getteachers = () =>{
    return fetch(`${BACKEND_URL}/getteachers`)
    .then(res=>res.json())
    .catch(error=>console.log(error))
}

export const getteacherdetails = id =>{
    return fetch(`${BACKEND_URL}/getteacherdetails/${id}`)
    .then((res)=>res.json())
    .catch((error)=>console.log(error))
}



export const updateteacher = (id, teacher) => {
    return fetch(`${BACKEND_URL}/updateteacher/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(teacher)
    })
    .then((res) => {
        return res.json();
    })
    .catch((error) => {
        console.log(error)
    });
};

export const deleteteacher = (id, token) =>{
    return fetch(`${BACKEND_URL}/deleteteacher/${id}`,{
        method:"DELETE",
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then((res)=>res.json())
    .catch((err)=>console.log(err))

}