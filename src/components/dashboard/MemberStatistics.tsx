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
                <tr>
                    <div className="table-striped table-header">
                        <p className="table-striped header-label">Member Statistics</p>
                    </div>
                </tr>

                <tr>
                    <div className="table-striped table-row row-index-even">
                        <p className="table-striped row-label">Category</p>
                        <p className="table-striped row-data">Members</p>
                    </div>
                </tr>

                <tr>
                    <div className="table-striped table-row row-index-odd">
                        <p className="table-striped row-label">Voting Members</p>
                        <p className="table-striped row-data">[# of people]</p>
                    </div>
                </tr>

                <tr>
                    <div className="table-striped table-row row-index-even">
                        <p className="table-striped row-label">Active Members</p>
                        <p className="table-striped row-data">[# of people]</p>
                    </div>
                </tr>

            </table>
        </div>
    )
}

export default MemberStatistics