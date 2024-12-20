/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import UserInfo from "../../UserInfo";
import { getUseOidcAccessToken, NoSSOUserInfo } from "../../SSODisabledDefaults";
import { SSOEnabled } from "../../configuration";
import { CardBody, CardText, Container } from "reactstrap";

const UserProfile: React.FunctionComponent = () => {
    const { accessTokenPayload } = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo
    
    function isActive() {
        if (userInfo.groups.includes("active")) return "Active";
        else return "Alumni";
    }

    // This currently will always show non-voting b/c there is no group for whether someone is voting or not
    // This cant just check if the user is in the active group, bc intro members before 6 weeks are shown as Active and non-voting
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
            <img className="pfp" src={`https://profiles.csh.rit.edu/image/${userInfo.preferred_username}`}
                alt="Profile picture" />
            <CardBody className="center-vertical">
                <CardText className="text-item">{userInfo.name}</CardText>
                {/* CSH email, formatted as username@csh.rit.edu */}
                <CardText className="text-item">{userInfo.email}</CardText>

                <Container className="inline-cards">
                    <CardText className={isActive() === "Active" ? "active-member" : "alumni-member"}> 
                        {isActive()}
                    </CardText>
                    <CardText className={isVoting() === "Voting" ? "voting-member" : "non-voting-member"}>
                        {isVoting()}
                    </CardText>
                    <CardText className={isOnFloor() === "On Floor Status" ? "on-floor-status" : "off-floor-status"}>
                        {isOnFloor()}
                    </CardText>
                    <CardText className="unused empty"></CardText>
                </Container>
            </CardBody>
        </Container>
    )
}

export default UserProfile