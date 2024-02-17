import React from 'react';
import '../css/housing.css'; // Make sure to create a Housing.css file for styling


const Housing = () => {
    // Placeholder data, replace with data fetching
    const housingQueue = [
        { name: 'Bing Chilling', points: 420 },
        { name: 'John Cena', points: 11 },
        { name: 'Bing Chilling', points: 420 },
        { name: 'John Cena', points: 11 },
    ];

    const currentRoomNumbers = [
        { room: '3009', occupants: ['E', 'A'] },
        { room: '3013', occupants: ['Sports', 'It\'s in the game'] },
        { room: '3009', occupants: ['E', 'A'] },
        { room: '3013', occupants: ['Sports', 'It\'s in the game'] },

    ];

    return (
        <div className="housing-container">
            <div className="panel">
                <h3 className="panel-title even">Housing Queue</h3>
                <table className="table">
                    <tbody>
                        <tr className="odd">
                            <th>Member</th>
                            <th>Housing Points</th>
                        </tr>

                        {/* Displays the name and housing points of each user in housing queue, sorted from most to least housing points */}
                        {housingQueue.map((member, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                                <td>{member.name}</td>
                                <td>{member.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="panel">
                <h3 className="panel-title even">Current Room Numbers</h3>
                <table className="table">
                    <tbody>
                        <tr className="odd">
                            <td>Room</td>
                            <td>Occupants</td>
                        </tr>

                        {/* Shows the names of all occupants of each room on floor */}
                        {currentRoomNumbers.map((room, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                                <td>
                                    <h3 className="room-number">{room.room}</h3>
                                </td>
                                <td>
                                    <ul className="occupant-list">
                                        {room.occupants.map((occupant, idx) => (
                                            <li key={idx} className="room-name">{occupant}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Housing;