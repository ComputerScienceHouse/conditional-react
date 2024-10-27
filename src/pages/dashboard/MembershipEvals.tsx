import React, {useEffect, useState} from "react";
import {getUseOidcAccessToken, getUseOidcHook, NoSSOUserInfo} from "../../SSODisabledDefaults";
import UserInfo from "../../UserInfo";
import {API_URL, SSOEnabled} from "../../configuration";
import {Table} from "reactstrap";
import {TableBody, TableHead, TableRow} from "@mui/material";
import { useOidcFetch } from "@axa-fr/react-oidc";

const MembershipEvals: React.FunctionComponent = () => {
    const {login, logout, isAuthenticated} = getUseOidcHook()()
    const {accessTokenPayload} = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    const { fetch } = useOidcFetch();

    const directorshipAttendanceUrl = `${API_URL}/api/attendance/directorship/self`;
    const hmAttendanceUrl = `${API_URL}/api/attendance/house/self`;

    const [directorshipAttendance, setDirectorshipAttendance] = useState([]);
    const [hmAttendance, setHMAttendance] = useState([]);

    // Gets the number of directorships attended
    useEffect(() => {
        fetch(directorshipAttendanceUrl, {
            method: "GET",
            headers: {
                'Authorization': accessTokenPayload,
            }
        })
        .then((res) => res.json())
        .then((directorships) => setDirectorshipAttendance(directorships))
    }, []);  
    
    // Gets the number of house meetings missed
    useEffect(() => {
        fetch(hmAttendanceUrl, {
            method: "GET",
            headers: {
                'Authorization': accessTokenPayload,
            }
        })
        .then((res) => res.json())
        .then((hm) => setHMAttendance(hm))
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
                        <td className="right-align">{hmAttendance.length}</td>
                    </TableRow>

                    {/* Number of major projects passed */}
                    <TableRow>
                        <td>Major Project</td>
                        <td className="right-align">Route Not Implemented</td>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}


export default MembershipEvals