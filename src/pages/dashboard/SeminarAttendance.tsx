import React, { useEffect, useState } from 'react';
import { NoSSOUserInfo, getUseOidcAccessToken, getUseOidcHook } from '../../SSODisabledDefaults';
import UserInfo from '../../UserInfo';
import { SSOEnabled } from '../../configuration';

interface TechnicalSeminar {
    approved: boolean
    name: string
    timestamp: Date
}



const SeminarAttendance: React.FC = () => {

    const { login, logout, isAuthenticated } = getUseOidcHook()()
    const { accessToken, accessTokenPayload } = getUseOidcAccessToken()();
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    const [seminars, setSeminars] = useState<TechnicalSeminar[]>([]);

    useEffect(() => {
        // Fetch directorships data from the API (you can use the fetchDirectorshipsFromAPI function)
        const apiUrl = `http://localhost:8080/api/attendance/seminar/${userInfo.preferred_username}`;
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
                let mappedSeminars: TechnicalSeminar[] = data.map((item: any) => ({
                    name: String(item.name),
                    timestamp: new Date(item.timestamp),
                    approved: Boolean(item.approved), // Assuming 'approved' is a boolean property
                }));
                mappedSeminars.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
                setSeminars(mappedSeminars);
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
                        <td className="table-striped header-label">Technical Seminar Attendance</td>
                    </tr>
                    <tr>
                        <td className="table-striped header-label">Event</td>
                        <td className="table-striped header-data">Date</td>
                    </tr>
                </thead>

                <tbody>
                    {seminars
                        .filter((seminar) => seminar.approved)
                        .map((seminar, index) => (
                            <tr className="table-striped" key={index}>
                                <td className="table-striped row-label">{seminar.name.toString()}</td>
                                <td className="table-striped row-data">{seminar.timestamp.toDateString()}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>

    )
};


export default SeminarAttendance;
