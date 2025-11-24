const BACKEND_URL = `http://localhost:5000`

export const fetchallResults =(grade)=>{
 return fetch(`${BACKEND_URL}/allresults/${grade}`)
 .then(response=>(response.json()))
 .catch(error=>(console.log(error)))
}

export const addResult = (resultData)=>{
    return fetch(`${BACKEND_URL}/addresult`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(resultData)
    })
    .then((res)=>(res.json()))
    .catch((error)=>(console.log(error)))
}

export const deleteResult=(id)=>{
    return fetch(`${BACKEND_URL}/deleteresult/${id}`,{
        method:'DELETE'
    })
    .then(response => (response.json()))
    .catch(error => (console.log(error)))
}

export const studentResult=(studentid)=>{
    return fetch(`${BACKEND_URL}/studentresult/${studentid}`)
    .then(response => (response.json()))
    .catch(error => (console.log(error)))
}