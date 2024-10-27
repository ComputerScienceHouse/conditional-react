import React, {useEffect, useState} from 'react';
import {getUseOidcAccessToken, getUseOidcHook, NoSSOUserInfo} from '../../SSODisabledDefaults';
import UserInfo from '../../UserInfo';
import { API_URL, SSOEnabled} from '../../configuration';
import {Table} from 'reactstrap';
import { useOidc, useOidcFetch } from '@axa-fr/react-oidc';

interface Directorship {
    name: string
    approved: boolean
    timestamp: Date
}

const DirectorshipMeetingAttendance: React.FC = () => {

    const {login, logout, isAuthenticated} = getUseOidcHook()()
    const {accessTokenPayload} = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    const { fetch } = useOidcFetch();

    const [directorships, setDirectorships] = useState<Directorship[]>([]);

    const apiUrl = `${API_URL}/api/attendance/directorship/self`;

    useEffect(() => {
        fetch(apiUrl, {
            method: "GET",
            headers: {
                'Authorization': accessTokenPayload,
            }
        })
        .then((res) => res.json())
        .then((data) => {
            let mappedDirectorships: Directorship[] = data.map((item: any) => ({
                name: String(item.name),
                timestamp: new Date(item.timestamp),
                approved: Boolean(item.approved),
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
