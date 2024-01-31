import { useOidcAccessToken, useOidc, useOidcIdToken } from '@axa-fr/react-oidc'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Authenticating from '../../callbacks/Authenticating'
import AuthenticationError from '../../callbacks/AuthenticationError'
import SessionLost from '../../callbacks/SessionLost'
import UserInfo from '../../UserInfo'
import UserProfile from '../dashboard/UserProfile'
import '../../css/major-project-form.css'

const MajorProjectForm = () => {
    // important hooks
    // const { accessTokenPayload } = useOidcAccessToken()   // this contains the user info in raw json format
    // const userInfo = accessTokenPayload as UserInfo       //
    // const { idToken, idTokenPayload } = useOidcIdToken()  // this is how you get the users id token
    // const { login, logout, isAuthenticated } = useOidc()  // this gets the functions to login and logout and the logout state

    return (
        <div>
            <h2 className="page-title">Major Project Submission</h2>
            <form className="major-project-form">
                <div className="submission-box">
                    <h6>Project Name</h6>
                    <input type="text" placeholder="A clever name for your project, sometimes people will come up with an acronym." className="project-name-text-box"></input>
                </div>
                <div className="submission-box">
                    <h6>Description</h6>
                    <textarea placeholder="A 'two liner' description of what your project is. If you have source materials like a GitHub repo publicly available, it's also useful to include links in them." className="description-text-box"></textarea>
                </div>
            </form>
            <input type="submit" value="SUBMIT MAJOR PROJECT (Route Not Implemented)" className="submit-button"></input>
            <h2 className="major-project-title">All Major Projects</h2>
        </div>
    )
}

export default MajorProjectForm
