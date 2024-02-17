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
    const { accessTokenPayload } = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    const [seminars, setSeminars] = useState<TechnicalSeminar[]>([]);

    useEffect(() => {
        // API url for a user's seminar attendance
        const apiUrl = `http://localhost:8080/api/attendance/seminar/${userInfo.preferred_username}`;

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
        <div>

            <table className="table table-striped box-shadow">
                <thead className="table-header">
                    <tr>
                        {/* Table name */}
                        <td className="table-striped header-label">Technical Seminar Attendance</td>
                    </tr>
                    <tr>
                        {/* Row labels */}
                        <td className="table-striped header-label">Event</td>
                        <td className="table-striped header-data">Date</td>
                    </tr>
                </thead>

                <tbody>

                    {/* Displays title and date for each seminar in its own row */}
                    {seminars
                        // Only shows seminars that have been approved
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
