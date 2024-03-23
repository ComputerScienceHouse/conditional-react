import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Col, Card } from 'reactstrap';
// import DatePicker from "react-datepicker";

import '../../css/directorship-meeting.css'
// import "react-datepicker/dist/react-datepicker.css";

const DirectorshipMeeting: React.FC = () => {

    return (
        <>
            <h3 className="page-title">Meeting Attendance</h3>
            <Form>
                {/* Meeting Type */}
                <Col>
                    <Card className='form-card'>
                        <FormGroup className='form-input'>
                            <Label for="committee" className="input-label">Meeting Type</Label>
                            <Input type="select" className='form-control'>
                                <option value="Chairman">Chairman</option>
                                <option value="Ad-Hoc">Ad-Hoc</option>
                                <option value="Evaluations">Evaluations</option>
                                <option value="Financial">Financial</option>
                                <option value="R&D">Research and Development</option>
                                <option value="House Improvements">House Improvements</option>
                                <option value="Opcomm">OpComm</option>
                                <option value="History">History</option>
                                <option value="Social">Social</option>
                                <option value="Public Relations">Public Relations</option>
                            </Input>
                        </FormGroup>
                    </Card>
                </Col>
                {/* Date */}
                <Col>
                    <Card className='form-card'>
                        <FormGroup>
                            <Label for="date" className="input-label">Date</Label>
                            <Input type='date' id='date' />
                        </FormGroup>
                    </Card>
                </Col>
                {/* Attendees */}
                <Col>
                    <Card className='form-card'>
                        <FormGroup className="form-input">
                            <Label for="attendees" className="input-label">Attendees</Label>
                            <Input type="text" name='attendees' />
                        </FormGroup>
                    </Card>
                </Col>
                <Button type="submit" color="primary" className="btn-raised btn-submit">Submit Form</Button>
            </Form>
        </>
    );
};

export default DirectorshipMeeting;
