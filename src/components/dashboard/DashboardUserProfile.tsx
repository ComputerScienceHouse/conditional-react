import React from "react";
import Profile from "../Profile";
import UserInfo from "../../UserInfo";
import { NoSSOUserInfo, getUseOidcAccessToken, getUseOidcHook } from "../../SSODisabledDefaults";
import { SSOEnabled } from "../../configuration";
import { DropdownMenu } from "reactstrap";
import { useOidcUser } from "@axa-fr/react-oidc";

const DashboardUserProfile : React.FunctionComponent = () => {
    const { login, logout, isAuthenticated } = getUseOidcHook()()
    const { accessTokenPayload } = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    return (
        <div className="dashboarduserprofile">
            <div className="profilepicture">
                <img className="profilepicture" src={`https://profiles.csh.rit.edu/image/${userInfo.preferred_username}`} alt="User profile picture"/>
            </div>
            <div className="userinfo">
                <h1>{userInfo.name}</h1>
                <h2>{userInfo.email}</h2>
                {/* need to add the little badges that show active/inactive, voting/non-voting, and on floor/off floor */}
            </div>
        </div>
    )
}

export default DashboardUserProfile