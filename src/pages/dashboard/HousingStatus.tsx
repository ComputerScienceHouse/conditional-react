import React from "react";
import {getUseOidcAccessToken, getUseOidcHook, NoSSOUserInfo} from "../../SSODisabledDefaults";
import UserInfo from "../../UserInfo";
import {SSOEnabled} from "../../configuration";
import {Table} from "reactstrap";

const HousingStatus: React.FunctionComponent = () => {
    const {login, logout, isAuthenticated} = getUseOidcHook()()
    const {accessTokenPayload} = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo


    // const housingPointsUrl = `http://${API_URL}/api/attendance/directorship/${userInfo.preferred_username}`;
    // const roomNumberUrl = `http://${API_URL}/api/attendance/house/${userInfo.preferred_username}`;

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
        <div>
            <Table className="info-table box-shadow">
                <thead>
                <th colSpan={2}>Housing Status</th>
                </thead>

                <tbody>
                {/* Number of housing points */}
                <tr>
                    <td>Housing Points</td>
                    <td className="right-align">Route Not Implemented</td>
                </tr>

                {/* Room number (if the user lives on floor) */}
                <tr>
                    <td>Room Number</td>
                    <td className="right-align">Route Not Implemented</td>
                </tr>
                </tbody>
            </Table>
        </div>
    )
}


export default HousingStatus