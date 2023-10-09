import React, {useEffect, useState} from "react";
import { getUseOidcHook, getUseOidcAccessToken, NoSSOUserInfo } from "../../SSODisabledDefaults";
import UserInfo from "../../UserInfo";
import { SSOEnabled } from "../../configuration";
import { request } from "http";

const MembershipEvals : React.FunctionComponent = () => {
    const { login, logout, isAuthenticated } = getUseOidcHook()()
    const { accessTokenPayload } = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo


    const url = `http://localhost:3000/attendance/directorship/${userInfo.preferred_username}`
    const [data, setData] = useState([]);
    
    const fetchInfo = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((directorships) => setData(directorships))
        }
    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <div className="table">
            <table className="table table-striped box-shadow">
                <tr>
                    <div className="table-striped table-header">
                        <p className="table-striped header-label">Membership Evals</p>
                        <p className="table-striped header-data">Pending</p>
                    </div>
                </tr>
                <tr>
                    <div className="table-striped table-row row-index-even">
                        <p className="table-striped row-label">Directorship Meetings</p>
                        <p className="table-striped row-data">{data.length} / 30</p>
                    </div>
                </tr>
                <tr>
                    <div className="table-striped table-row row-index-odd">
                        <p className="table-striped row-label">House Meetings Missed</p>
                        <p className="table-striped row-data">None</p>
                    </div>
                </tr>
                <tr>
                    <div className="table-striped table-row row-index-even">
                        <p className="table-striped row-label">Major Project</p>
                        <p className="table-striped row-data">None</p>
                    </div>
                </tr>
            </table>
        </div>
    )
}


export default MembershipEvals