import React, {useEffect, useState} from 'react';
import {getUseOidcAccessToken, getUseOidcHook, NoSSOUserInfo} from '../../SSODisabledDefaults';
import UserInfo from '../../UserInfo';
import { API_URL, SSOEnabled} from '../../configuration';
import {Table} from 'reactstrap';
import { useOidcFetch } from '@axa-fr/react-oidc';

interface MissedHM {
    date: Date
    reason: string
}


const MissedHouseMeetings: React.FC = () => {

    const {login, logout, isAuthenticated} = getUseOidcHook()()
    const {accessTokenPayload} = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    const { fetch } = useOidcFetch();
    
    const apiUrl = `${API_URL}/api/attendance/house/self`;

    const [missedHMs, setMissedHMs] = useState<MissedHM[]>([]);

    useEffect(() => {
        fetch(apiUrl, {
            method: "GET",
            headers: {
                'Authorization': accessTokenPayload,
            }
        })
        .then((res) => res.json())

        // Maps response data to missed hm object
        .then((data) => {
            let mappedMissedHM: MissedHM[] = data.map((item: any) => ({
                date: new Date(item.date),
                reason: String(item.timestamp),
            }));

            // Sorts from most recent to least recent
            mappedMissedHM.sort((a, b) => b.date.getTime() - a.date.getTime());
            setMissedHMs(mappedMissedHM);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <>
            {/* If user has not missed any house meetings, display a box saying they have no missed hms */}
            {missedHMs.length === 0 ?
                <div className='box-green'>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 48 48">
                        <path fill="#c8e6c9"
                              d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
                        <path fill="#4caf50"
                              d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
                    </svg>
                    &nbsp;
                    You haven't missed any house meetings
                </div> :

                // Otherwise, create a table and display info about each missed hm in a row
                <Table className='info-table box-shadow'>
                    <thead>
                    <tr className='table-header'>
                        <td colSpan={2}>House Meetings Missed</td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td className='right-align'>Reason</td>
                    </tr>
                    </thead>

                    <tbody>
                    { // Shows date and excuse for each missed house meeting
                            missedHMs
                            .map((hm, index) => (
                                <tr key={index}>
                                    <td>{hm.date.toDateString()}</td>
                                    <td className='right-align'>{hm.reason}</td>
                                </tr>
                            ))
                    }
                    </tbody>
                </Table>
            }
        </>

    )
};


export default MissedHouseMeetings;
