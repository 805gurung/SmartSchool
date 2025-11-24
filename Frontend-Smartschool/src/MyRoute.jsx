import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import AdminLayout from './components/layouts/AdminLayout'
import AdminDashboard from './components/dashboard/AdminDashboard'
import VerifyAdminEmail from './pages/VerifyAdminEmail'
import VerifyStudentEmail from './pages/VerifyStudentEmail'
import AdminLogin from './components/login/AdminLogin'
import StudentLogin from './components/login/StudentLogin'
import TeacherLogin from './components/login/TeacherLogin'
import AdminSignUp from './components/login/AdminSignUp'
import StudentSignUp from './components/login/StudentSignUp'
import TeacherSignUp from './components/login/TeacherSignUp'
import TeacherLayout from './components/layouts/TeacherLayout'
import TeacherDashboard from './components/dashboard/TeacherDashboard'
import StudentTable from './components/tables/StudentTable'
import TeacherTable from './components/tables/TeacherTable'
import ClassesTable from './components/tables/ClassesTable'
import ResultsTable from './components/tables/ResultsTable'
import NoticesTable from './components/tables/NoticesTable'
import EventsTable from './components/tables/EventsTable'
import ExamsTable from './components/tables/ExamsTable'
import UpdateTeachers from './components/tables/UpdateTeachers'
import StudentLayout from './components/layouts/StudentLayout'
import StudentDashboard from './components/dashboard/StudentDashboard'
import AddExam from './components/tables/AddExam'
import UpdateExam from './components/tables/UpdateExam'
import AssignmentTable from './components/tables/AssignmentTable'
import GradeAssignments from './components/tables/GradeAssignments'
import MarksEntry from './components/forms/MarksEntry'
import UpdateStudents from './components/tables/UpdateStudents'


const MyRoute = () => {
  return (
    <div>
      <Router>
        
        <Routes
        >
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/adminlogin' element={<AdminLogin />} />
          <Route path='/studentlogin' element={<StudentLogin />} />
          <Route path='/teacherlogin' element={<TeacherLogin />} />
          <Route path='/adminsignup' element={<AdminSignUp />} />
          <Route path='/studentsignup' element={<StudentSignUp />} />
          <Route path='/teachersignup' element={<TeacherSignUp />} />
          
          <Route path='/admin' element={<AdminLayout />}>
              <Route path='dashboard' element={<AdminDashboard />} />
              <Route path='students' element={<StudentTable />} />
              <Route path='students/updatestudent/:id' element={<UpdateStudents />} /> 
              <Route path='teachers' element={<TeacherTable />} />
              <Route path='teachers/update/:id' element={<UpdateTeachers />} />
              <Route path='examroutines' element={<ExamsTable />} />
              <Route path='examroutines/add' element={<AddExam/>}/>
            <Route path='examroutines/update/:id' element={<UpdateExam/>}/>
              <Route path='results' element={<ClassesTable />} />
              <Route path='notices' element={<NoticesTable />} />
              <Route path='events' element={<EventsTable />} />
            </Route>

          <Route path='/teacher' element={<TeacherLayout/>}>
            <Route path='dashboard' element={< TeacherDashboard/>} />
            <Route path='students' element={<StudentTable/>}/>
            <Route path='examroutines' element={<ExamsTable showBtns={false}/>}/>
            <Route path='assignments' element={<AssignmentTable/>}/>
            <Route path='results' element={<ClassesTable/>}/>
          </Route>

          <Route path='/student' element={<StudentLayout/>}>
            <Route path='dashboard' element={<StudentDashboard/>} />
            <Route path='classes' element={<ClassesTable/>}/>
            <Route path='results' element={<ResultsTable/>}/>
            <Route path='examroutines' element={<ExamsTable showBtns={false}/>}/>
            <Route path='assignments' element={<AssignmentTable/>}/>
          {/* <Route path='grade/:grade/assignments' element={<GradeAssignments showForm={false}/>}/> */}
          </Route>

          <Route path='/verify/:token' element={<VerifyAdminEmail />} />
          <Route path='/verifystudent/:token' element={<VerifyStudentEmail />} />
          {/* <Route path='examroutines' element={<ExamsTable/>}/> */}
          <Route path='/grade/:grade/assignments' element={<GradeAssignments/>}/>
          <Route path='/grade/:grade/results' element={<MarksEntry/>}/>


          
        </Routes>
      </Router>
    </div>
  )
}

export default MyRoute




        


