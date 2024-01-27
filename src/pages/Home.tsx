import { useOidcAccessToken, useOidc, useOidcIdToken } from '@axa-fr/react-oidc'
import React from 'react'
import { Link } from 'react-router-dom'
import Authenticating from '../callbacks/Authenticating'
import AuthenticationError from '../callbacks/AuthenticationError'
import SessionLost from '../callbacks/SessionLost'
import UserInfo from '../UserInfo'
import UserProfile from '../components/dashboard/UserProfile'
import MembershipEvals from '../components/dashboard/MembershipEvals'
import MemberStatistics from '../components/dashboard/MemberStatistics'
import DirectorshipMeetingAttendance from '../components/dashboard/DirectorshipMeetingAttendance'
import HousingStatus from '../components/dashboard/HousingStatus'
import MissedHouseMeetings from '../components/dashboard/MissedHouseMeetings'

const Home = () => {
    // important hooks
    // const { accessTokenPayload } = useOidcAccessToken()   // this contains the user info in raw json format
    // const userInfo = accessTokenPayload as UserInfo       //
    // const { idToken, idTokenPayload } = useOidcIdToken()  // this is how you get the users id token
    // const { login, logout, isAuthenticated } = useOidc()  // this gets the functions to login and logout and the logout state

    return (
        <div>
            <UserProfile />

            <div className="twocolumn">
                <div className="left-column">
                    <MembershipEvals />
                    <MemberStatistics />
                    <DirectorshipMeetingAttendance />
                </div>

                <div className='right-column'>
                    {/* Right column stuff */}
                    <HousingStatus />
                    <MissedHouseMeetings />
                </div>
            </div>

        </div>
    )
}

export default Home
