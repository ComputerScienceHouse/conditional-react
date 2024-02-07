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
          <Route path="/evals/intro" element={<IntroEvals />} />
          <Route path="/evals/spring" element={<SpringEvals />} />
          <Route path="/evals/conditionals" element={<CurrentConditionals />} />
          <Route path="/forms/major-project" element={<MajorProjectForm />} />
          <Route path="/forms/coop" element={<CoopSubmission />} />
          <Route path="/forms/intro-evals" element={<IntroEvalsForm />} />
          <Route path="/attendance/directorship" element={<DirectorshipMeeting />} />
          <Route path="/attendance/seminar" element={<TechnicalSeminar />} />
          <Route path="/attendance/history" element={<AttendanceHistory />} />
          <Route path="/admin/member-management" element={<MemberManagement />} />
          <Route path="/admin/coop-management" element={<CoopManagment />} />
          <Route path="/admin/slideshow/intro" element={<IntroEvalsPresentation />} />
          <Route path="/admin/slideshow/spring" element={<MemberEvalsPresentation />} />
          <Route path="/admin/logs" element={<UserLogs />} />
          <Route path="/admin/clear-cache" element={<ClearCache />} />
          <Route path='*' element={rerouteHomeOn404 ?? true ? <Home /> : <NotFound />} />
        </Routes>
      </PageContainer>
    </Router>
  )
}

export default App
