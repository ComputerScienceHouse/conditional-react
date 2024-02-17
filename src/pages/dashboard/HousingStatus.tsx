import React, { useEffect, useState } from "react";
import { getUseOidcHook, getUseOidcAccessToken, NoSSOUserInfo } from "../../SSODisabledDefaults";
import UserInfo from "../../UserInfo";
import { SSOEnabled } from "../../configuration";

const HousingStatus: React.FunctionComponent = () => {
    const { login, logout, isAuthenticated } = getUseOidcHook()()
    const { accessTokenPayload } = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo


    // const housingPointsUrl = `http://localhost:8080/api/attendance/directorship/${userInfo.preferred_username}`;
    // const roomNumberUrl = `http://localhost:8080/api/attendance/house/${userInfo.preferred_username}`;

    // const [housingPoints, setHousingPoints] = useState([]);
    // const [roomNumber, setRoomNumber] = useState([]);

    // const fetchHousingPoints = () => {
    //     return fetch(housingPointsUrl)
    //         .then((res) => res.json())
    //         .then((housingPoints) => setHousingPoints(housingPoints))
    // }

    // const fetchRoomNumber = () => {
    //     return fetch(roomNumberUrl)
    //         .then((res) => res.json())
    //         .then((roomNumber) => setRoomNumber(roomNumber))
    // }

    // useEffect(() => {
    //     fetchHousingPoints();
    //     fetchRoomNumber();
    // }, []);

    return (
        <div className="table">
            <table className="table table-striped box-shadow">
                <thead className="table-header">
                    <th className="table-striped header-label">Housing Status</th>
                </thead>

                <tbody>
                    {/* Number of housing points */}
                    <tr className="table-striped table-row row-index-even">
                        <td className="table-striped row-label">Housing Points</td>
                        <td className="table-striped row-data">Route Not Implemented</td>
                    </tr>

                    {/* Room number (if the user lives on floor) */}
                    <tr className="table-striped table-row row-index-odd">
                        <td className="table-striped row-label">Room Number</td>
                        <td className="table-striped row-data">Route Not Implemented</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


export default HousingStatus