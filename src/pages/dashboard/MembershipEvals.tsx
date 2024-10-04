import React, { useEffect, useState } from "react";
import { getUseOidcHook, getUseOidcAccessToken, NoSSOUserInfo } from "../../SSODisabledDefaults";
import UserInfo from "../../UserInfo";
import { SSOEnabled } from "../../configuration";
import { Table } from "reactstrap";
import { TableBody, TableHead, TableRow } from "@mui/material";

const MembershipEvals: React.FunctionComponent = () => {
    const { login, logout, isAuthenticated } = getUseOidcHook()()
    const { accessTokenPayload } = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    // API urls
    const directorshipAttendanceUrl = `http://localhost:8080/api/attendance/directorship/self`;
    const missedHouseMeetingsUrl = `http://localhost:8080/api/attendance/house/self`;

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
        <div>
            <Table className="info-table box-shadow">
                <TableHead>
                    <TableRow className="table-header">
                        <td>Membership Evals</td>
                        <td className="right-align">Route Not Implemented</td>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {/* Number of directorships attended */}
                    <TableRow>
                        <td>Directorship Meetings</td>
                        <td className="right-align">{directorshipAttendance.length} / 30</td>
                    </TableRow>

                    {/* Number of missed house meetings (excluding excused absences) */}
                    <TableRow>
                        <td>House Meetings Missed</td>
                        <td className="right-align">{missedHouseMeetings.length}</td>
                    </TableRow>

                    {/* Number of major projects passed */}
                    <TableRow>
                        <td>Major Project</td>
                        <td className="right-align">Route Not Implemented</td>
                    </TableRow>
                </TableBody>
            </Table>
        </div >
    )
}


export default MembershipEvals