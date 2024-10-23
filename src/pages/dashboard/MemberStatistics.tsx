import React, {useEffect, useState} from "react";
import {getUseOidcAccessToken, getUseOidcHook, NoSSOUserInfo} from "../../SSODisabledDefaults";
import UserInfo from "../../UserInfo";
import { API_URL, SSOEnabled} from "../../configuration";
import {Table} from "reactstrap";


const MemberStatistics: React.FunctionComponent = () => {
    const {login, logout, isAuthenticated} = getUseOidcHook()()
    const {accessTokenPayload} = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    // API urls
    const url_numVoting = `http://${API_URL}/api/users/voting_count`;
    const url_numActive = `http://${API_URL}/api/users/active_count`;

    const [votingCount, setVoting] = useState([]);
    const [activeCount, setActive] = useState([]);

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
        <div>
            <Table className="info-table box-shadow">
                <thead>
                <tr className="table-header">
                    <td colSpan={2}>Member Statistics</td>
                </tr>

                <tr>
                    <td>Category</td>
                    <td className="right-align">Members</td>
                </tr>
                </thead>

                <tbody>

                {/* Shows number of voting members */}
                <tr>
                    <td>Voting Members</td>
                    <td className="right-align">{votingCount}</td>
                </tr>

                {/* Shows number of active members */}
                <tr>
                    <td>Active Members</td>
                    <td className="right-align">{activeCount}</td>
                </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default MemberStatistics