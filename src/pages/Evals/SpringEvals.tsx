// code
import { useOidc, useOidcAccessToken, useOidcIdToken } from '@axa-fr/react-oidc'
import React, { useEffect, useState } from 'react'
import UserInfo from '../../UserInfo';
import '../../css/spring-evals.css'
import { API_URL } from '../../configuration';

interface MemberData {
    directorships: number,
    major_projects: number,
    missed_hms: number,
    name: string,
    seminars: number,
    uid: string
}

const SpringEvals = () => {
    // important hooks
    const { accessTokenPayload } = useOidcAccessToken()   // this contains the user info in raw json format
    const userInfo = accessTokenPayload as UserInfo       //
    const { idToken, idTokenPayload } = useOidcIdToken()  // this is how you get the users id token
    const { login, logout, isAuthenticated } = useOidc()  // this gets the functions to login and logout and the logout state

    const [members, setMemberData] = useState<MemberData[]>([]);

    useEffect(() => {

        // API url for the spring evals route
        const apiUrl = `http://${API_URL}/api/evals/member`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })

            // Maps the returned data to an object to store necessary spring evals info
            .then((data) => {
                let mappedMemberData: MemberData[] = data.map((item: any) => ({
                    directorships: Number(item.directorships),      // Number of directorship meetings attended
                    major_projects: Number(item.major_projects),    // Number of passed major projects
                    missed_hms: Number(item.missed_hms),            // Number of house meetings missed (excluding excused absences)
                    name: String(item.name),                        // First and last name
                    seminars: Number(item.seminars),                // Number of technical seminars attended
                    uid: String(item.uid)                           // CSH username
                }));

                // Need to make it sort by number of major projects (dec), then number of directorships (dec), then number missed hms (inc)
                mappedMemberData.sort((a, b) => b.major_projects - a.major_projects)
                setMemberData(mappedMemberData);
            })

            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            {
                members
                    .map((member, index) => (
                        <div className='member'>
                            <div className="profilepicture">
                                <img className="profilepicture" src={`https://profiles.csh.rit.edu/image/${member.uid}`}
                                    alt="User profile picture" />
                            </div>

                            {/* User's name and CSH username */}
                            <div className='name-id'>
                                <h2 className='name'>{member.name}</h2>
                                <h3 className='username'>{member.uid}</h3>
                            </div>

                            <div className='evals-status'>
                                {/* Displays completion status of spring evals requirements */}
                                <p className='spring-req'>{`Directorship Meetings ${member.directorships} / 30`}</p>
                                <p className='spring-req'>{`Major Projects ${member.major_projects}`}</p>
                                <p className='spring-req'>{`House Meetings Missed ${member.missed_hms}`}</p>
                            </div>
                        </div>
                    ))
            }
        </ >
    )
}

export default SpringEvals
