import React from 'react';
import '../css/housing.css';
import { Container, Table } from 'reactstrap';


const Housing = () => {
    const housingQueue = [
        { name: 'name', points: 420 },
        { name: 'name', points: 11 },
        { name: 'name', points: 420 },
        { name: 'name', points: 11 },
    ];

    const currentRoomNumbers = [
        { room: '3009', occupants: ['name', 'name'] },
        { room: '3013', occupants: ['name', 'name'] },
        { room: '3009', occupants: ['name', 'name'] },
        { room: '3013', occupants: ['name', 'name'] },

    ];

    return (
        <Container className="housing-container">
            <div className="panel">
                <h3 className="panel-title even">Housing Queue</h3>
                <Table className="table">
                    <tbody>
                        <tr className="odd">
                            <th>Member</th>
                            <th>Housing Points</th>
                        </tr>

                        {housingQueue.map((member, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                                <td>{member.name}</td>
                                <td>{member.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <div className="panel">
                <h3 className="panel-title even">Current Room Numbers</h3>
                <Table className="table">
                    <tbody>
                        <tr className="odd">
                            <td>Room</td>
                            <td>Occupants</td>
                        </tr>

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
                </Table>
            </div>
        </Container>
    );
};

export default Housing;