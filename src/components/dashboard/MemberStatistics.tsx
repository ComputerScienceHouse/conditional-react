import React, {useEffect, useState} from "react";
import { getUseOidcHook, getUseOidcAccessToken, NoSSOUserInfo } from "../../SSODisabledDefaults";
import UserInfo from "../../UserInfo";
import { SSOEnabled } from "../../configuration";
import { request } from "http";

const MemberStatistics : React.FunctionComponent = () => {
    const { login, logout, isAuthenticated } = getUseOidcHook()()
    const { accessTokenPayload } = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    return (
        <div className="table">
            <table className="table table-striped box-shadow">
                <thead>
                    <tr className="table-striped table-header">
                        <td className="table-striped header-label">Member Statistics</td>
                    </tr>

                    <tr className="table-striped table-row row-index-even">
                        <td className="table-striped row-label">Category</td>
                        <td className="table-striped row-data">Members</td>
                    </tr>
                </thead>
                
                <tbody>
                    <tr className="table-striped table-row row-index-odd">
                        <td className="table-striped row-label">Voting Members</td>
                        <td className="table-striped row-data">[# of people]</td>
                    </tr>

                    <tr className="table-striped table-row row-index-even">
                        <td className="table-striped row-label">Active Members</td>
                        <td className="table-striped row-data">[# of people]</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default MemberStatistics