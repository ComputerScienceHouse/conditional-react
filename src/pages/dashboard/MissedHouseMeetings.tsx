import React, { useEffect, useState } from 'react';
import { NoSSOUserInfo, getUseOidcAccessToken, getUseOidcHook } from '../../SSODisabledDefaults';
import UserInfo from '../../UserInfo';
import { SSOEnabled } from '../../configuration';

interface MissedHM {
    date: Date
    reason: string
}



const MissedHouseMeetings: React.FC = () => {

    const { login, logout, isAuthenticated } = getUseOidcHook()()
    const { accessTokenPayload } = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    const [missedHouseMeetings, setMissedHouseMeetings] = useState<MissedHM[]>([]);

    useEffect(() => {
        // Fetch house meeting data from the API (you can use the fetchDirectorshipsFromAPI function)
        const apiUrl = `http://localhost:8080/api/attendance/house/${userInfo.preferred_username}`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                let mappedMissedHM: MissedHM[] = data.map((item: any) => ({
                    date: new Date(item.date),
                    reason: String(item.timestamp),
                }));
                mappedMissedHM.sort((a, b) => b.date.getTime() - a.date.getTime());
                setMissedHouseMeetings(mappedMissedHM);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            {missedHouseMeetings.length == 0 ?
                <div id="noMissedHM">
                    You haven't missed any house meetings
                </div> :
                <table className="table table-striped box-shadow">
                    <thead className="table-header">
                        <tr>
                            <td className="table-striped header-label">House Meetings Missed</td>
                        </tr>
                        <tr>
                            <td className="table-striped header-label">Date</td>
                            <td className="table-striped header-data">Reason</td>
                        </tr>
                    </thead>

                    <tbody>
                        {missedHouseMeetings
                            .map((houseMeeting, index) => (
                                <tr className="table-striped" key={index}>
                                    <td className="table-striped row-label">{houseMeeting.date.toDateString()}</td>
                                    <td className="table-striped row-data">{houseMeeting.reason}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            }
        </div>

    )
};


export default MissedHouseMeetings;
