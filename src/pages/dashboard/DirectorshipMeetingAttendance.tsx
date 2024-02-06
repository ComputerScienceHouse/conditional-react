import React, { useEffect, useState } from 'react';
import { NoSSOUserInfo, getUseOidcAccessToken } from '../../SSODisabledDefaults';
import UserInfo from '../../UserInfo';
import { SSOEnabled } from '../../configuration';

interface Directorship {
    approved: boolean
    committee: string
    timestamp: Date
}



const DirectorshipMeetingAttendance: React.FC = () => {

    const { accessToken, accessTokenPayload } = getUseOidcAccessToken()();
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    const [directorships, setDirectorships] = useState<Directorship[]>([]);

    useEffect(() => {
        // Fetch directorships data from the API (you can use the fetchDirectorshipsFromAPI function)
        const apiUrl = `http://localhost:8080/api/attendance/directorship/${userInfo.preferred_username}`;
      fetch(apiUrl, {
        headers: { "Authorization": `Bearer ${accessToken}` }
      })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                let mappedDirectorships: Directorship[] = data.map((item: any) => ({
                    committee: String(item.committee),
                    timestamp: new Date(item.timestamp),
                    approved: Boolean(item.approved), // Assuming 'approved' is a boolean property
                }));
                mappedDirectorships.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
                setDirectorships(mappedDirectorships);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>

            <table className="table table-striped box-shadow">
                <thead className="table-header">
                    <tr>
                        <td className="table-striped header-label">Directorship Meeting Attendance</td>
                    </tr>
                    <tr>
                        <td className="table-striped header-label">Event</td>
                        <td className="table-striped header-data">Date</td>
                    </tr>
                </thead>

                <tbody>
                    {directorships
                        .filter((directorship) => directorship.approved)
                        .map((directorship, index) => (
                            <tr className="table-striped" key={index}>
                                <td className="table-striped row-label">{directorship.committee}</td>
                                <td className="table-striped row-data">{directorship.timestamp.toDateString()}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>

    )
};


export default DirectorshipMeetingAttendance;
