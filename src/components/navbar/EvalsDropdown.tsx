import React from "react";
import UserInfo from "../../UserInfo";
import { NoSSOUserInfo, getUseOidcAccessToken, getUseOidcHook } from "../../SSODisabledDefaults";
import { SSOEnabled } from "../../configuration";

const EvalsDropdown : React.FunctionComponent = () => {
    const { login, logout, isAuthenticated } = getUseOidcHook()()
    const { accessTokenPayload } = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    return (
        <p>Test</p>
    )
}

export default EvalsDropdown