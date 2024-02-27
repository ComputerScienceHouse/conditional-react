import React, { useEffect, useState } from "react";
import { getUseOidcHook, getUseOidcAccessToken, NoSSOUserInfo } from "../../SSODisabledDefaults";
import UserInfo from "../../UserInfo";
import { SSOEnabled } from "../../configuration";
import { Table } from "reactstrap";

const MembershipEvals: React.FunctionComponent = () => {
    const { login, logout, isAuthenticated } = getUseOidcHook()()
    const { accessTokenPayload } = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    // API urls
    const directorshipAttendanceUrl = `http://localhost:8080/api/attendance/directorship/${userInfo.preferred_username}`;
    const missedHouseMeetingsUrl = `http://localhost:8080/api/attendance/house/${userInfo.preferred_username}`;

    const [directorshipAttendance, setDirectorshipAttendance] = useState([]);
    const [missedHouseMeetings, setHouseMeetingAttendance] = useState([]);

    // Makes call to API for list of directorships and stores the response
    const fetchDirectorshipAttendance = () => {
        return fetch(directorshipAttendanceUrl)
            .then((res) => res.json())
            .then((directorships) => setDirectorshipAttendance(directorships))
    }

    // Makes call to API for list of missed house meetings and stores the response
    const fetchHouseMeetingAttendance = () => {
        return fetch(missedHouseMeetingsUrl)
            .then((res) => res.json())
            .then((houseMeeting) => setHouseMeetingAttendance(houseMeeting))
    }

    useEffect(() => {
        fetchDirectorshipAttendance();
        fetchHouseMeetingAttendance();
    }, []);

    return (
        <>
            <Table className='info-table box-shadow'>
                <thead>
                    <tr className='table-header'>
                        <th>Membership Evals</th>
                        <th className='right-align'>Route Not Implemented</th>
                    </tr>
                </thead>

                <tbody>
                    {/* Number of directorships attended */}
                    <tr>
                        <td>Directorship Meetings</td>
                        <td className='right-align'>{directorshipAttendance.length} / 30</td>
                    </tr>

                    {/* Number of missed house meetings (excluding excused absences) */}
                    <tr>
                        <td>House Meetings Missed</td>
                        <td className='right-align'>{missedHouseMeetings.length}</td>
                    </tr>

                    {/* Number of major projects passed */}
                    <tr>
                        <td>Major Project</td>
                        <td className='right-align'>Route Not Implemented</td>
                    </tr>
                </tbody>
            </Table>
        </ >
    )
}


export default MembershipEvals