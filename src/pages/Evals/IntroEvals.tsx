// code
import { useOidcAccessToken, useOidc, useOidcIdToken } from '@axa-fr/react-oidc'
import React, { Component, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Authenticating from '../../callbacks/Authenticating'
import AuthenticationError from '../../callbacks/AuthenticationError'
import SessionLost from '../../callbacks/SessionLost'
import UserProfile from '../dashboard/UserProfile'
import UserInfo from '../../UserInfo';
import '../../css/intro-evals.css'

interface IntroMemberData {
    directorships: number,
    fid: number | undefined,
    max_signatures: number,
    missed_hms: number,
    name: string,
    seminars: number,
    signatures: number,
    uid: string | undefined
}

const IntroEvals = () => {
    // important hooks
    const { accessTokenPayload } = useOidcAccessToken()   // this contains the user info in raw json format
    const userInfo = accessTokenPayload as UserInfo       //
    const { idToken, idTokenPayload } = useOidcIdToken()  // this is how you get the users id token
    const { login, logout, isAuthenticated } = useOidc()  // this gets the functions to login and logout and the logout state

    const [introMembers, setIntroMemberData] = useState<IntroMemberData[]>([]);

    useEffect(() => {
        // Fetch directorships data from the API (you can use the fetchDirectorshipsFromAPI function)
        const apiUrl = 'http://localhost:8080/api/evals/intro';
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                let mappedIntroMemberData: IntroMemberData[] = data.map((item: any) => ({
                    directorships: Number(item.directorships),
                    fid: item.fid === undefined ? undefined : Number(item.fid),
                    max_signatures: Number(item.max_signatures),
                    missed_hms: Number(item.missed_hms),
                    name: String(item.name),
                    seminars: Number(item.seminars),
                    signatures: Number(item.signatures),
                    uid: item.uid === null ? undefined : String(item.uid)
                }));
                mappedIntroMemberData.sort((a, b) => b.signatures - a.signatures);
                setIntroMemberData(mappedIntroMemberData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            {
                introMembers
                    .map((introMember, index) => (
                        <div className='intro-member'>
                            <div className="profilepicture">
                                <img className="profilepicture" src={`https://profiles.csh.rit.edu/image/${introMember.uid}`} alt="User profile picture" />
                            </div>
                            <div className='name-id'>
                                <h2>{introMember.name}</h2>
                                <h3>{introMember.uid == null ? introMember.fid : introMember.uid}</h3>
                            </div>

                            <div className='evals-status'>
                                <p className='intro-req'>{`Packet Percent ${((introMember.signatures / introMember.max_signatures) * 100).toFixed(0)}%`}</p>
                                <p className='intro-req'>{`Directorship Meetings ${introMember.directorships} / 6`}</p>
                                <p className='intro-req'>{`Technical Seminars ${introMember.seminars} / 2`}</p>
                                <p className='intro-req'>{`House Meetings Missed ${introMember.missed_hms}`}</p>
                            </div>
                        </div>
                    ))
            }
        </ >
    )
}

export default IntroEvals
