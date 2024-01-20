import React, { useEffect, useState } from "react";
import { getUseOidcHook, getUseOidcAccessToken, NoSSOUserInfo } from "../../SSODisabledDefaults";
import UserInfo from "../../UserInfo";
import { SSOEnabled } from "../../configuration";
import { request } from "http";

function displayNumVoting(e: any) {


}

const MemberStatistics: React.FunctionComponent = () => {
    const { login, logout, isAuthenticated } = getUseOidcHook()()
    const { accessTokenPayload } = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    const url_numVoting = 'http://localhost:8080/api/users/voting_count';
    const url_numActive = 'http://localhost:8080/api/users/active_count';

    const [data, setData] = useState([]);

    const fetchInfo_Voting = () => {
        return fetch(url_numVoting)
            .then((res) => res.json())
            .then((voting) => setData(voting))
    }

    // const fetchInfo_Active = () => {
    //     return fetch(url_numActive)
    //         .then((res => res.json))
    //         .then((activeMembers) => setData(activeMembers))
    // }

    useEffect(() => {
        fetchInfo_Voting();
        // fetchInfo_Active();
    }, []);

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
                        <td className="table-striped row-data">{data}</td>
                    </tr>

                    <tr className="table-striped table-row row-index-even">
                        <td className="table-striped row-label">Active Members</td>
                        <td className="table-striped row-data">[# members]</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default MemberStatistics