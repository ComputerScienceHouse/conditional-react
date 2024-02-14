
import { useOidcAccessToken, useOidc, useOidcIdToken } from '@axa-fr/react-oidc'
import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
import Authenticating from '../../callbacks/Authenticating'
import AuthenticationError from '../../callbacks/AuthenticationError'
import SessionLost from '../../callbacks/SessionLost'
import UserInfo from '../../UserInfo'
import UserProfile from '../dashboard/UserProfile'
import { ButtonToggle, Card, CardBody, CardColumns, CardHeader, CardText, Container, FormGroup, Input, List, ListGroupItem, ListInlineItem, ModalBody } from 'reactstrap'
import '../../css/member-management.css'

const MemberManagement = () => {
    // important hooks
    // const { accessTokenPayload } = useOidcAccessToken()   // this contains the user info in raw json format
    // const userInfo = accessTokenPayload as UserInfo       //
    // const { idToken, idTokenPayload } = useOidcIdToken()  // this is how you get the users id token
    // const { login, logout, isAuthenticated } = useOidc()  // this gets the functions to login and logout and the logout state

    const [state, setState] = useState(true);

    return (
        <>
            <Container>
                <Card>
                    <CardHeader>
                        Administration
                    </CardHeader>
                    <CardBody>
                        <List className='admin-info'>
                            <Container className='admin-item'>
                                <CardText>NUMBER</CardText>
                                <CardText>Current Students</CardText>
                            </Container>
                            <Container className='admin-item'>
                                <CardText>NUMBER</CardText>
                                <CardText>Active Members</CardText>
                            </Container>
                            <Container className='admin-item'>
                                <CardText>NUMBER</CardText>
                                <CardText>On-Floor Members</CardText>
                            </Container>
                            <Container className='admin-item'>
                                <CardText>NUMBER</CardText>
                                <CardText>Intro Accounts</CardText>
                            </Container>
                            <Container className='admin-item'>
                                <FormGroup switch>
                                    <Input
                                        type="switch"
                                        checked={state}
                                        onClick={() => {
                                            setState(!state);
                                        }}
                                    />
                                </FormGroup>
                            </Container>
                        </List>
                    </CardBody>
                </Card>
            </Container>
        </>
    )
}

export default MemberManagement
