import React from 'react';
import { Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';

const SeminarAttendance = () => {
    return (
        <>
            <Container className="main">
                <h3 className="page-title">Seminar Attendance</h3>
                <form data-module="attendanceForm" data-type="seminar">
                    {/* Seminar Name */}
                    <Row>
                        <Col xs="12" sm="12" md="12">
                            <div className="panel panel-default">
                                <div className="panel-body" style={{ paddingTop: '10px' }}>
                                    <FormGroup className="is-empty">
                                        <Label for="name">Seminar Name</Label>
                                        <Input type="text" name="name" />
                                    </FormGroup>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {/* Date */}
                    <Row>
                        <Col xs="12" sm="12" md="12">
                            <div className="panel panel-default">
                                <div className="panel-body" style={{ paddingTop: '10px' }}>
                                    <FormGroup className="is-empty">
                                        <Label for="date">Date</Label>
                                        <Input type="text" name="date" value="{{date}}" data-module="datepicker" />
                                    </FormGroup>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {/* Attendees */}
                    <Row>
                        <Col xs="12" sm="12" md="12">
                            <div className="panel panel-default">
                                <div className="panel-body" style={{ paddingTop: '20px' }}>
                                    <FormGroup className="is-empty">
                                        <Label for="attendees">Attendees</Label>
                                        <Input type="text" name="attendees" data-module="memberSelect" data-src="ts_members" />
                                    </FormGroup>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {/* Submit Button */}
                    <Button type="submit" color="primary" style={{ width: '100%' }}>Submit Form</Button>
                </form>
            </Container>
        </>
    );
}

export default SeminarAttendance;
