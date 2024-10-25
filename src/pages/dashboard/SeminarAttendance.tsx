import React, {useEffect, useState} from 'react';
import {getUseOidcAccessToken, getUseOidcHook, NoSSOUserInfo} from '../../SSODisabledDefaults';
import UserInfo from '../../UserInfo';
import { API_URL, SSOEnabled} from '../../configuration';
import {Table} from 'reactstrap';
import {TableBody, TableHead, TableRow} from '@mui/material';

interface TechnicalSeminar {
    approved: boolean
    name: string
    timestamp: Date
}

const SeminarAttendance: React.FC = () => {

    const {login, logout, isAuthenticated} = getUseOidcHook()()
    const {accessTokenPayload} = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    const [seminars, setSeminars] = useState<TechnicalSeminar[]>([]);

    useEffect(() => {
        // API url for a user's seminar attendance
        const apiUrl = `${API_URL}/api/attendance/seminar/self`;

        fetch(apiUrl)
            .then((response) => {

                // If api doesnt give an ok response, throws an error to the console with the details
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })

            // Maps the response data to seminar objects
            .then((data) => {
                let mappedSeminars: TechnicalSeminar[] = data.map((item: any) => ({
                    name: String(item.name),
                    timestamp: new Date(item.timestamp),
                    approved: Boolean(item.approved),
                }));

                // Sorts the seminars from most recent to least recent
                mappedSeminars.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
                setSeminars(mappedSeminars);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userInfo.preferred_username]);

    return (
        <>
            <Table className='info-table box-shadow'>
                <TableHead>
                    <TableRow className='table-header'>
                        <td colSpan={2}>Technical Seminar Attendance</td>
                    </TableRow>
                    <TableRow>
                        <td>Event</td>
                        <td className='right-align'>Date</td>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {seminars
                        // Only shows seminars that have been approved
                        .filter((seminar) => seminar.approved)
                        .map((seminar, index) => (
                            <TableRow key={index}>
                                <td>{seminar.name.toString()}</td>
                                <td className='right-align'>{seminar.timestamp.toDateString()}</td>
                            </TableRow>
                        ))}
                </TableBody>
                {/* <TableFooter>
                    <Pagination>
                        <PaginationItem>
                            <PaginationLink>0</PaginationLink>
                        </PaginationItem>
                    </Pagination>
                </TableFooter> */}
            </Table>
        </>

    )
};


export default SeminarAttendance;
