const BACKEND_URL = `http://localhost:5000`

export const addNotice = (notice) => {
    return fetch(`${BACKEND_URL}/addnotice`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(notice)
    })
        .then(response => (response.json()))
        .catch(error => (console.log(error)))
}

export const getAllNotices = () =>{
    return fetch(`${BACKEND_URL}/allnotices`)
    .then(response=>(response.json()))
    .catch(error=>(console.log(error)))
}

export const deleteNotice=(id)=>{
    return fetch(`${BACKEND_URL}/deletenotice/${id}`,{
        method:'DELETE'
    })
    .then(response => (response.json()))
    .catch(error => (console.log(error)))
}

export const editNotice=(id,notice)=>{
    return fetch(`${BACKEND_URL}/editnotice/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(notice)
    })
    .then(response => (response.json()))
    .catch(error => (console.log(error)))
}

export const addEvent=(event)=>{
    return fetch(`${BACKEND_URL}/addevent`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(event)
    })
    .then(response => (response.json()))
    .catch(error => (console.log(error)))
}

export const allEvents = ()=>{
    return fetch(`${BACKEND_URL}/allevents`)
    .then(response => (response.json()))
    .catch(error => (console.log(error)))
}

export const editEvent=(id,event)=>{
    return fetch(`${BACKEND_URL}/editevent/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(event)

    })
    .then(response => (response.json()))
    .catch(error => (console.log(error)))
}

export const deleteEvent=(id)=>{
    return fetch(`${BACKEND_URL}/deleteevent/${id}`,{
        method:'DELETE'
    })
    .then(response => (response.json()))
    .catch(error => (console.log(error)))
}

    
