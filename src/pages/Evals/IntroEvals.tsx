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
        // API url for the intro evals route
        const apiUrl = 'http://localhost:8080/api/evals/intro';
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })

            // Takes the returned data and maps it to an object to store all the intro member data
            .then((data) => {
                let mappedIntroMemberData: IntroMemberData[] = data.map((item: any) => ({
                    directorships: Number(item.directorships),
                    fid: item.fid === undefined ? undefined : Number(item.fid), // Freshman id, or undefined if the user has a CSH account
                    max_signatures: Number(item.max_signatures),                // Number of possible signatures on this user's packet
                    missed_hms: Number(item.missed_hms),                        // Number of missed house meetings (excluding excused absences)
                    name: String(item.name),                                    // First and last name
                    seminars: Number(item.seminars),                            // Number of seminars attended
                    signatures: Number(item.signatures),                        // Number of packet signatures the user got
                    uid: item.uid === null ? undefined : String(item.uid)       // CSH username, or undefined if the user doesnt have a CSH account
                }));

                // Sorts by number of packet signatures in descending order
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
                                {/* Pulls profile picture from profiles */}
                                <img className="profilepicture" src={`https://profiles.csh.rit.edu/image/${introMember.uid}`} alt="User profile picture" />
                            </div>
                            <div className='name-id'>
                                <h2 className='name'>{introMember.name}</h2>
                                {/* Shows CSH username if the user has one, or freshman id if not */}
                                <h3 className='username'>{introMember.uid == null ? introMember.fid : introMember.uid}</h3>
                            </div>

                            {/* Shows the completion status of 6 weeks requirements */}
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
