import React, { useEffect, useState } from "react";
import { getUseOidcHook, getUseOidcAccessToken, NoSSOUserInfo } from "../../SSODisabledDefaults";
import UserInfo from "../../UserInfo";
import { SSOEnabled } from "../../configuration";
import { request } from "http";

const MembershipEvals: React.FunctionComponent = () => {
    const { login, logout, isAuthenticated } = getUseOidcHook()()
    const { accessTokenPayload } = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo


    const directorshipAttendanceUrl = `http://localhost:8080/api/attendance/directorship/${userInfo.preferred_username}`;
    const missedHouseMeetingsUrl = `http://localhosy:8080/api/attendance/house/${userInfo.preferred_username}`;
    
    const [directorshipAttendance, setDirectorshipAttendance] = useState([]);

    const fetchDirectorshipAttendance = () => {
        return fetch(directorshipAttendanceUrl)
            .then((res) => res.json())
            .then((directorships) => setDirectorshipAttendance(directorships))
    }
    useEffect(() => {
        fetchDirectorshipAttendance();
    }, []);

    return (
        <div className="table">
            <table className="table table-striped box-shadow">
                <thead className="table-header">
                    {/* <tr className="table-header"> */}
                    <td className="table-striped header-label">Membership Evals</td>
                    <td className="table-striped header-data">Pending</td>
                    {/* </tr> */}
                </thead>

                <tbody>
                    <tr className="table-striped table-row row-index-even">
                        <td className="table-striped row-label">Directorship Meetings</td>
                        <td className="table-striped row-data">{directorshipAttendance.length} / 30</td>
                    </tr>
                    <tr className="table-striped table-row row-index-odd">
                        <td className="table-striped row-label">House Meetings Missed</td>
                        <td className="table-striped row-data">None</td>
                    </tr>
                    <tr className="table-striped table-row row-index-even">
                        <td className="table-striped row-label">Major Project</td>
                        <td className="table-striped row-data">None</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


export default MembershipEvals