import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import PageContainer from './containers/PageContainer'
import 'csh-material-bootstrap/dist/csh-material-bootstrap.css'
import NotFound from './pages/NotFound'
import IntroEvals from './pages/Evals/IntroEvals'
import CurrentConditionals from './pages/Evals/CurrentConditionals'
import MajorProjectForm from './pages/Forms/MajorProjectForm'
import CoopSubmission from './pages/Forms/CoopSubmission'
import IntroEvalsForm from './pages/Forms/IntroEvalsForm'
import DirectorshipMeeting from './pages/Attendance/DirectorshipMeeting'
import TechnicalSeminar from './pages/Attendance/TechnicalSeminar'
import AttendanceHistory from './pages/Attendance/AttendanceHistory'
import MemberManagement from './pages/Admin/MemberManagement'
import CoopManagment from './pages/Admin/CoopManagement'
import IntroEvalsPresentation from './pages/Admin/IntroEvalsPresentation'
import MemberEvalsPresentation from './pages/Admin/MemberEvalsPresentation'
import UserLogs from './pages/Admin/UserLogs'
import ClearCache from './pages/Admin/ClearCache'
import SpringEvals from './pages/Evals/SpringEvals'

type Props = {
  rerouteHomeOn404?: boolean
}

const App: React.FC<Props> = ({ rerouteHomeOn404 = null }) => {
  return (
    <Router>
      <PageContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path="/intro_evals" element={<IntroEvals />} />
          <Route path="/spring_evals" element={<SpringEvals />} />
          <Route path="/conditionals" element={<CurrentConditionals />} />
          <Route path="/major_project" element={<MajorProjectForm />} />
          <Route path="/co_op" element={<CoopSubmission />} />
          <Route path="/intro_evals_form" element={<IntroEvalsForm />} />
          <Route path="/attendance_directorship" element={<DirectorshipMeeting />} />
          <Route path="/attendance_seminar" element={<TechnicalSeminar />} />
          <Route path="/attendance/history" element={<AttendanceHistory />} />
          <Route path="/admin/member_management" element={<MemberManagement />} />
          <Route path="/admin/co_op_management" element={<CoopManagment />} />
          <Route path="/admin/intro_evals_presentation" element={<IntroEvalsPresentation />} />
          <Route path="/admin/spring_evals_presentation" element={<MemberEvalsPresentation />} />
          <Route path="/admin/logs" element={<UserLogs />} />
          <Route path="/admin/clear_cache" element={<ClearCache />} />
          <Route path='*' element={rerouteHomeOn404 ?? true ? <Home /> : <NotFound />} />
        </Routes>
      </PageContainer>
    </Router>
  )
}

export default App
