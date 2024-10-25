import React, {useEffect, useState} from 'react';
import {getUseOidcAccessToken, getUseOidcHook, NoSSOUserInfo} from '../../SSODisabledDefaults';
import UserInfo from '../../UserInfo';
import { API_URL, SSOEnabled} from '../../configuration';
import {Table} from 'reactstrap';

interface Directorship {
    name: string
    approved: boolean
    timestamp: Date
}

const DirectorshipMeetingAttendance: React.FC = () => {

    const {login, logout, isAuthenticated} = getUseOidcHook()()
    const {accessTokenPayload} = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    const [directorships, setDirectorships] = useState<Directorship[]>([]);

    useEffect(() => {
        // Fetch directorships data from the API (you can use the fetchDirectorshipsFromAPI function)
        const apiUrl = `${API_URL}/api/attendance/directorship/self`;
        fetch(apiUrl)
            .then((response) => {

                // If api returns anything other than a 200 (ok), throw an error to the console with the response details
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
                }

                return response.json();
            })

            // Maps the json data to a directorship object
            .then((data) => {
                let mappedDirectorships: Directorship[] = data.map((item: any) => ({
                    name: String(item.name),
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
        <div>
            <Table className='info-table box-shadow'>
                <thead>
                <tr className='table-header'>
                    <td colSpan={2}>Directorship Meeting Attendance</td>
                </tr>
                <tr>
                    <td>Event</td>
                    <td className='right-align'>Date</td>
                </tr>
                </thead>

                <tbody>
                {directorships
                    // Only shows approved attendances
                    .filter((directorship) => directorship.approved)
                    .map((directorship, index) => (
                        <tr key={index}>
                            <td>{directorship.name}</td>
                            <td className='right-align'>{directorship.timestamp.toDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
};


export default DirectorshipMeetingAttendance;
