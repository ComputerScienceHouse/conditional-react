import { useOidcAccessToken, useOidc, useOidcIdToken } from '@axa-fr/react-oidc'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Authenticating from '../../callbacks/Authenticating'
import AuthenticationError from '../../callbacks/AuthenticationError'
import SessionLost from '../../callbacks/SessionLost'
import UserInfo from '../../UserInfo'
import UserProfile from '../dashboard/UserProfile'
import { Button, Container } from 'reactstrap'
import { ButtonBase, FormControl, FormControlLabel, FormLabel, Input, InputLabel, Radio, RadioGroup } from '@mui/material'
import '../../css/coop-submission.css';

const CoopSubmission = () => {
    // important hooks
    // const { accessTokenPayload } = useOidcAccessToken()   // this contains the user info in raw json format
    // const userInfo = accessTokenPayload as UserInfo       //
    // const { idToken, idTokenPayload } = useOidcIdToken()  // this is how you get the users id token
    // const { login, logout, isAuthenticated } = useOidc()  // this gets the functions to login and logout and the logout state

    return (
        <>
            <h1 className='header'>Co-op Submission</h1>
            <Container id='coop-form'>
                <FormControl>
                    <p className='info-text'>Please select one of the following options below if you are going to be on co-op during either semester this year. In the case you are going to be on co-op for both semesters, please contact the Evaluations Director and have them remove you from Active status.</p>
                    <p className='info-text'>By selecting an option and submitting this form you are forfeiting your right to vote in house matters during the selected period. You are not required to attend house meetings but are still eligible for directorship meeting attendance.</p>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        className='semester-selection'
                    >
                        <FormControlLabel className="coop-radio" value="fall" control={<Radio />} label="Fall Semester" />
                        <FormControlLabel className="coop-radio" value="spring" control={<Radio />} label="Spring Semester" />
                    </RadioGroup>
                </FormControl>

                <Button className='submit-btn' color='#b0197e'>SUBMIT FORM</Button>
            </Container>
        </>

    )
}

export default CoopSubmission
