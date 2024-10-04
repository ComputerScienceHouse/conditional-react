import React from 'react'
import UserProfile from './dashboard/UserProfile'
import MembershipEvals from './dashboard/MembershipEvals'
import MemberStatistics from './dashboard/MemberStatistics'
import DirectorshipMeetingAttendance from './dashboard/DirectorshipMeetingAttendance'
import HousingStatus from './dashboard/HousingStatus'
import MissedHouseMeetings from './dashboard/MissedHouseMeetings'
import SeminarAttendance from './dashboard/SeminarAttendance'
import '../css/dashboard.css'


const Home = () => {
    // important hooks
    // const { accessTokenPayload } = useOidcAccessToken()   // this contains the user info in raw json format
    // const userInfo = accessTokenPayload as UserInfo       //
    // const { idToken, idTokenPayload } = useOidcIdToken()  // this is how you get the users id token
    // const { login, logout, isAuthenticated } = useOidc()  // this gets the functions to login and logout and the logout state


    return (
        <div>
            <UserProfile/>

            <div className="twocolumn">
                <div className="left-column">
                    <div className='item'>
                        <MembershipEvals/>
                    </div>
                    <div className='item'>
                        <MemberStatistics/>
                    </div>
                    <div className='item'>
                        <DirectorshipMeetingAttendance/>
                    </div>
                </div>

                <div className='right-column'>
                    <div className='item'>
                        <HousingStatus/>
                    </div>
                    <div className='item'>
                        <MissedHouseMeetings/>
                    </div>
                    <div className='item'>
                        <SeminarAttendance/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home
