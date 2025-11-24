const BACKEND_URL = 'http://localhost:5000'

export const getassignments = (grade) =>{
    return fetch(`${BACKEND_URL}/getassignments/${grade}`)
    .then((res)=>res.json())
    .catch((err)=>console.log(err))

}

export const addassignment = (assignmentData) =>{
    return fetch(`${BACKEND_URL}/addassignment`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(assignmentData)
    })
    .then((res)=>res.json())
    .catch((err)=>console.log(err))
}