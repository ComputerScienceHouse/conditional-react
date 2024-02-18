import React from "react";
import UserInfo from "../../UserInfo";
import { NoSSOUserInfo, getUseOidcAccessToken, getUseOidcHook } from "../../SSODisabledDefaults";
import { SSOEnabled } from "../../configuration";
import { Card, CardBody, CardDeck, CardImg, CardText, Container } from "reactstrap";

const UserProfile: React.FunctionComponent = () => {
    const { login, logout, isAuthenticated } = getUseOidcHook()()
    const { accessTokenPayload } = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    return (
        <Container className='userprofile'>
            <img className="profilepicture" src={`https://profiles.csh.rit.edu/image/${userInfo.preferred_username}`} alt="User profile picture" />
            <CardBody className="userinfo">
                <CardText className="info">{userInfo.name}</CardText>
                {/* CSH email, formatted as username@csh.rit.edu */}
                <CardText className="info">{userInfo.email}</CardText>
                {/* need to add the little badges that show active/inactive, voting/non-voting, and on floor/off floor */}
            </CardBody>
        </Container>
    )
}

export default UserProfile