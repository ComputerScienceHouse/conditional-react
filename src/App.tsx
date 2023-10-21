import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AttendanceHistory from './pages/Attendance/AttendanceHistory'
import SubmitDirectorship from './pages/SubmitDirectorship'
import PageContainer from './containers/PageContainer'
import 'csh-material-bootstrap/dist/csh-material-bootstrap.css'
import NotFound from './pages/NotFound'
import SubmitSeminar from './pages/SubmitSeminar'
import IntroEvalsSlideshow from './pages/Slideshow/IntroEvalsSlideshow'

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
                    <Route path='/attendance/history' element={<AttendanceHistory />} />
                    <Route path='/directorship/submit' element={<SubmitDirectorship />} />
                    <Route path='/seminar/submit' element={<SubmitSeminar />} />
                    <Route path='/slideshow/intro' element={<IntroEvalsSlideshow />} />
                    <Route path='*' element={rerouteHomeOn404 ?? true ? <Home /> : <NotFound />} />
                </Routes>
            </PageContainer>
        </Router>
    )
}

export default App
