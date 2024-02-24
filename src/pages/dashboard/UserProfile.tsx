import React from "react";
import UserInfo from "../../UserInfo";
import { NoSSOUserInfo, getUseOidcAccessToken, getUseOidcHook } from "../../SSODisabledDefaults";
import { SSOEnabled } from "../../configuration";
import { Card, CardBody, CardDeck, CardImg, CardText, Container } from "reactstrap";

const UserProfile: React.FunctionComponent = () => {
    const { login, logout, isAuthenticated } = getUseOidcHook()()
    const { accessTokenPayload } = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    function isActive() {
        if (userInfo.groups.includes("active")) return "Active";
        else return "Alumni";
    }

    function isVoting() {
        if (userInfo.groups.includes("voting")) return "Voting";
        else return "Non-Voting";
    }

    function isOnFloor() {
        if (userInfo.groups.includes("onfloor")) return "On Floor Status";
        else return "Off Floor Status";
    }

    return (
        <Container className="flex-container">
            <img className="pfp" src={`https://profiles.csh.rit.edu/image/${userInfo.preferred_username}`} alt="User profile picture" />
            <CardBody className="center-vertical">
                <CardText className="text-item">{userInfo.name}</CardText>
                {/* CSH email, formatted as username@csh.rit.edu */}
                <CardText className="text-item">{userInfo.email}</CardText>

                <Container className="inline-cards">
                    <CardText className={isActive() === "Active" ? "active" : "alumni"}>
                        {isActive()}
                    </CardText>
                    <CardText className={isVoting() === "Voting" ? "voting" : "non-voting"}>
                        {isVoting()}
                    </CardText>
                    <CardText className={isOnFloor() === "On Floor Status" ? "on-floor" : "off-floor"}>
                        {isOnFloor()}
                    </CardText>
                    <CardText className="unused empty"></CardText>
                </Container>
            </CardBody>
        </Container>
    )
}

export default UserProfile