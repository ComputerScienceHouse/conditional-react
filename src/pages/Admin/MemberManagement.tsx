import { useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardText, Container, Form, FormGroup, Input, Label, List } from 'reactstrap'
import '../../css/member-management.css'
import ToggleSlider from '../../components/util/ToggleSlider';

const MemberManagement = () => {
    // important hooks
    // const { accessTokenPayload } = useOidcAccessToken()   // this contains the user info in raw json format
    // const userInfo = accessTokenPayload as UserInfo       //
    // const { idToken, idTokenPayload } = useOidcIdToken()  // this is how you get the users id token
    // const { login, logout, isAuthenticated } = useOidc()  // this gets the functions to login and logout and the logout state

    const [state, setState] = useState(true);

    return (
        <>
            <Container className='admin-stats'>
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
                                <Label check>Site Lockdown</Label>
                                <ToggleSlider />
                            </Container>
                            <Container className='admin-item'>
                                <Button color='danger'><h6>New Year</h6></Button>
                            </Container>
                        </List>
                    </CardBody>
                </Card>
            </Container>

            <Container className='add-user'>
                <Card>
                    <CardHeader>Add Users</CardHeader>
                    <CardBody className='flexbox'>
                        <Container className='mass-upload'>
                            <CardText>Mass User Upload</CardText>
                            <CardText>PLACEHOLDER</CardText>
                            <Input type='file' />
                        </Container>
                        <Container className='input-user-info'>
                            <Label>Freshman Name</Label>
                            <Input />
                            <Container className='room-info'>
                                <Label>Room Number</Label>
                                <Input />
                                <Container>
                                    <Input className='on-floor-check' type="switch" />
                                    <Label>On-floor</Label>
                                </Container>
                            </Container>
                            <Button className='btn-create-user' color='primary'>Create New User</Button>
                        </Container>
                    </CardBody>
                </Card>
            </Container>
        </>
    )
}

export default MemberManagement
