import React from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';

const DirectorshipMeeting: React.FC = () => {
    return (
        <Container className="main">
            <h3 className="page-title">Meeting Attendance</h3>
            <Form data-module="attendanceForm" data-type="committee">
                {/* Meeting Type */}
                <div className="row">
                    <Col xs={12} sm={12} md={12}>
                        <div className="panel panel-default">
                            <div className="panel-body" style={{ paddingTop: '10px' }}>
                                <FormGroup>
                                    <Label for="committee" className="control-label">Meeting Type</Label>
                                    <Input type="select" name="committee" className="form-control">
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
                            </div>
                        </div>
                    </Col>
                </div>
                {/* Date */}
                <div className="row">
                    <Col xs={12} sm={12} md={12}>
                        <div className="panel panel-default">
                            <div className="panel-body" style={{ paddingTop: '10px' }}>
                                <FormGroup className="is-empty">
                                    <Label for="date" className="control-label">Date</Label>
                                    <Input type="text" name="date" className="form-control" value="{date}" data-module="datepicker" />
                                </FormGroup>
                            </div>
                        </div>
                    </Col>
                </div>
                {/* Attendees */}
                <div className="row">
                    <Col xs={12} sm={12} md={12}>
                        <div className="panel panel-default">
                            <div className="panel-body" style={{ paddingTop: '20px' }}>
                                <FormGroup className="is-empty">
                                    <Label for="attendees" className="control-label" id="attendeeLabel">Attendees</Label>
                                    <Input type="text" name="attendees" className="form-control" data-module="memberSelect" data-src="cm_members" />
                                </FormGroup>
                            </div>
                        </div>
                    </Col>
                </div>
                <Button type="submit" role="button" color="primary" className="btn-raised" style={{ width: '100%' }}>Submit Form</Button>
            </Form>
        </Container>
    );
};

export default DirectorshipMeeting;
