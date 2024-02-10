import React, { useEffect, useState } from "react";
import { getUseOidcHook, getUseOidcAccessToken, NoSSOUserInfo } from "../../SSODisabledDefaults";
import UserInfo from "../../UserInfo";
import { SSOEnabled } from "../../configuration";
import { request } from "http";

const MemberStatistics: React.FunctionComponent = () => {
    const { login, logout, isAuthenticated } = getUseOidcHook()()
    const { accessTokenPayload } = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    // API urls
    const url_numVoting = 'http://localhost:8080/api/users/voting_count';
    const url_numActive = 'http://localhost:8080/api/users/active_count';

    const [votingCount, setVoting] = useState([]);
    const [activeCount, setActive] = useState([]);

    let numVoting: number = 0;

    // Gets the number of voting members from the API
    const fetchInfo_Voting = () => {
        return fetch(url_numVoting)
            .then((res) => res.json())
            .then((voting) => setVoting(voting))
    }

    useEffect(() => {
        fetchInfo_Voting();
    }, []);

    // Gets the number of active members from the API
    const fetchInfo_Active = () => {
        return fetch(url_numActive)
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