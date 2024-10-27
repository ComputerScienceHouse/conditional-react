import React, {useEffect, useState} from "react";
import {getUseOidcAccessToken, getUseOidcHook, NoSSOUserInfo} from "../../SSODisabledDefaults";
import UserInfo from "../../UserInfo";
import { API_URL, SSOEnabled} from "../../configuration";
import {Table} from "reactstrap";
import { useOidcFetch } from "@axa-fr/react-oidc";


const MemberStatistics: React.FunctionComponent = () => {
    const {login, logout, isAuthenticated} = getUseOidcHook()()
    const {accessTokenPayload} = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    const { fetch } = useOidcFetch();

    const urlActiveCount = `${API_URL}/api/users/active_count`;
    const urlVotingCount = `${API_URL}/api/users/voting_count`;

    const [activeCount, setActiveCount] = useState([]);
    const [votingCount, setVotingCount] = useState([]);

    // Gets the number of active members
    useEffect(() => {
        fetch(urlActiveCount, {
            method: "GET",
            headers: {
                'Authorization': accessTokenPayload,
            }
        })
        .then((res) => res.json())
        .then((numActive) => setActiveCount(numActive))
    }, []);

    // Gets the number of voting members
    useEffect(() => {
        fetch(urlVotingCount, {
            method: "GET",
            headers: {
                'Authorization': accessTokenPayload,
            }
        })
        .then((res) => res.json())
        .then((numVoting) => setVotingCount(numVoting))
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