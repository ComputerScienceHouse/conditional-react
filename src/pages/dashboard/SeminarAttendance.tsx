import React, { useEffect, useState } from 'react';
import { NoSSOUserInfo, getUseOidcAccessToken, getUseOidcHook } from '../../SSODisabledDefaults';
import UserInfo from '../../UserInfo';
import { SSOEnabled } from '../../configuration';
import { Table } from 'reactstrap';

interface TechnicalSeminar {
    approved: boolean
    name: string
    timestamp: Date
}

const SeminarAttendance: React.FC = () => {

    const { login, logout, isAuthenticated } = getUseOidcHook()()
    const { accessTokenPayload } = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    const [seminars, setSeminars] = useState<TechnicalSeminar[]>([]);

    useEffect(() => {
        // API url for a user's seminar attendance
        const apiUrl = 'http://localhost:8080/api/attendance/meeting/seminars/self';

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
    }, []);

    return (
        <>
            <Table className='info-table box-shadow'>
                <thead>
                    <tr className='table-header'>
                        <td colSpan={2}>Technical Seminar Attendance</td>
                    </tr>
                    <tr>
                        <th>Event</th>
                        <th className='right-align'>Date</th>
                    </tr>
                </thead>

                <tbody>

                    {seminars
                        // Only shows seminars that have been approved
                        .filter((seminar) => seminar.approved)
                        .map((seminar, index) => (
                            <tr key={index}>
                                <td>{seminar.name.toString()}</td>
                                <td className='right-align'>{seminar.timestamp.toDateString()}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>

    )
};


export default SeminarAttendance;
