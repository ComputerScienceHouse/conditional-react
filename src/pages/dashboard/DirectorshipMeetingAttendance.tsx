import React, { useEffect, useState } from 'react';
import { NoSSOUserInfo, getUseOidcAccessToken, getUseOidcHook } from '../../SSODisabledDefaults';
import UserInfo from '../../UserInfo';
import { SSOEnabled } from '../../configuration';
import { CardHeader, ModalHeader, Row, Table, ToastHeader } from 'reactstrap';

interface Directorship {
    approved: boolean
    committee: string
    timestamp: Date
}

const DirectorshipMeetingAttendance: React.FC = () => {

    const { login, logout, isAuthenticated } = getUseOidcHook()()
    const { accessTokenPayload } = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    const [directorships, setDirectorships] = useState<Directorship[]>([]);

    useEffect(() => {
        // Fetch directorships data from the API (you can use the fetchDirectorshipsFromAPI function)
        const apiUrl = `http://localhost:8080/api/attendance/directorship/${userInfo.preferred_username}`;
        fetch(apiUrl)
            .then((response) => {

                // If api returns anything other than a 200 (ok), throw an error to the console with the response details
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
                }

                // If response is ok, returns the json from the response
                return response.json();
            })

            // Maps the json data to a directorship object
            .then((data) => {
                let mappedDirectorships: Directorship[] = data.map((item: any) => ({
                    committee: String(item.committee),
                    timestamp: new Date(item.timestamp),
                    approved: Boolean(item.approved), // Assuming 'approved' is a boolean property
                }));

                // Sort the directorships from most recent to least recent
                mappedDirectorships.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
                setDirectorships(mappedDirectorships);
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
                        <td colSpan={2}>Directorship Meeting Attendance</td>
                    </tr>
                    <tr>
                        <th>Event</th>
                        <th className='right-align'>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {/* Displays meeting type and date in its own row*/}
                    {directorships
                        // Only shows approved attendances
                        .filter((directorship) => directorship.approved)
                        .map((directorship, index) => (
                            <tr key={index}>
                                <td>{directorship.committee}</td>
                                <td className='right-align'>{directorship.timestamp.toDateString()}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    )
};


export default DirectorshipMeetingAttendance;
