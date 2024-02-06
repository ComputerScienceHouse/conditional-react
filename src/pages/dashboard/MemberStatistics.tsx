import React, { useEffect, useState } from "react";
import { getUseOidcHook, getUseOidcAccessToken, NoSSOUserInfo } from "../../SSODisabledDefaults";
import UserInfo from "../../UserInfo";
import { SSOEnabled } from "../../configuration";
import { request } from "http";

const MemberStatistics: React.FunctionComponent = () => {
    const { login, logout, isAuthenticated } = getUseOidcHook()();
    const { accessToken, accessTokenPayload } = getUseOidcAccessToken()();
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo;

    const url_numVoting = 'http://localhost:8080/api/users/voting_count';
    const url_numActive = 'http://localhost:8080/api/users/active_count';

    const [votingCount, setVoting] = useState([]);

    const [activeCount, setActive] = useState([]);

    let numVoting: number = 0;

    const fetchInfo_Voting = () => {
        return fetch(url_numVoting, {
        headers: { "Authorization": `Bearer ${accessToken}` }
      })
            .then((res) => res.json())
            .then((voting) => setVoting(voting))
    }

    useEffect(() => {
        fetchInfo_Voting();
    }, []);

    const fetchInfo_Active = () => {
        return fetch(url_numActive, {
        headers: { "Authorization": `Bearer ${accessToken}` }
      })
            .then((res) => res.json())
            .then((activeMembers) => setActive(activeMembers))
    }

    useEffect(() => {
        fetchInfo_Active();
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
                        <td className="table-striped row-data">{votingCount}</td>
                    </tr>

                    <tr className="table-striped table-row row-index-even">
                        <td className="table-striped row-label">Active Members</td>
                        <td className="table-striped row-data">{activeCount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default MemberStatistics
