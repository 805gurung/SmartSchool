const BACKEND_URL = `http://localhost:5000`

export const verifyEmail = (token) => {
    return fetch(`${BACKEND_URL}/verify/${token}`)
        .then((response) => response.json())
        .catch(error => console.log(error));
}

export const authenticate =(data)=>{
    localStorage.setItem('jwt', JSON.stringify(data))
}

export const isauthenticated = () =>{
  return localStorage.getItem('jwt')? JSON.parse(localStorage.getItem('jwt')):false
}

export const Signout = ()=>{
    return fetch(`${BACKEND_URL}/signout`,{
        method:'GET',
        credentials: 'include'// Ensures cookies are sent with the request
    })
    .then((response) => response.json())
    .catch(error => console.log(error));
}

//admin
export const adminRegister = (admin) =>{
    return fetch(`${BACKEND_URL}/admin/register`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(admin)
    })
    .then((response)=>response.json())
    .catch((error)=>console.log(error))
}

export const adminLogin = (admin) =>{
    return fetch(`${BACKEND_URL}/admin/login`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(admin)
    })
    .then((response) => response.json())
    .catch(error => console.log(error));
}

//teachers
export const registerteacher = (user) => {
  return fetch(`${BACKEND_URL}/registerteacher`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const loginteacher = (teacher) => {
  return fetch(`${BACKEND_URL}/loginteacher`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(teacher),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const teacherCount =()=>{
    return fetch(`${BACKEND_URL}/teachercount`)
    .then(response=>response.json())
    .catch(error=> console.log(error))
}

//students
export const register = (student) =>{
   
    return fetch(`${BACKEND_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            
        },
        body:JSON.stringify(student),
        
    })
    .then((response)=>response.json())
    .catch((error)=> console.log(error))
}

 export const login = (student) =>{
    return fetch(`${BACKEND_URL}/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(student),
    })
        .then((response)=>response.json())
        .catch((error)=> console.log(error))
 }

 export const getAllStudents = (student)=>{
    return fetch(`${BACKEND_URL}/getallstudents`)
    .then(res=>res.json())
    .catch(error=>console.log(error))
 }


 export const getStudentDetails = id =>{
    return fetch(`${BACKEND_URL}/getstudentdetails/${id}`)
    .then((res)=>res.json())
    .catch((error)=>console.log(error))
}

 export const deleteStudent  = (id, token)=>{
    return fetch(`${BACKEND_URL}/deletestudent/${id}`,{
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    )
    .then(res=>res.json())
    .catch(error=>console.log())
 }

 export const updateStudent = (id, student) =>{
    return fetch(`${BACKEND_URL}/updatestudent/${id}`,{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(student),
    })
    .then(response=>response.json())
    .catch(error=> console.log(error))
 }

export const studentCount =()=>{
    return fetch(`${BACKEND_URL}/studentcount`)
    .then(response=>response.json())
    .catch(error=> console.log(error))
}

export const verifyStudentEmail = (token)=>{
    return fetch(`${BACKEND_URL}/verifystudent/${token}`)
        .then((response) => response.json())
        .catch(error => console.log(error));
}

export const fetchStudentsByGrade=(grade)=>{
    return fetch(`${BACKEND_URL}/students/Grade-${grade}`)
    .then(response=>response.json())
    .catch(error=> console.log(error))
}




