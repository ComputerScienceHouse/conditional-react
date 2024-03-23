import React from 'react';
import { Container, Row, Col, FormGroup, Label, Input, Button, Form, Card } from 'reactstrap';

import '../../css/technical-seminar.css'

const SeminarAttendance = () => {
    return (
        <>
            <h3 className="page-title">Seminar Attendance</h3>
            <Form>
                {/* Seminar Name */}
                <Col>
                    <Card className='form-card'>
                        <FormGroup className="form-input">
                            <Label for="name" className='input-label'>Seminar Name</Label>
                            <Input type="text" className='form-control' />
                        </FormGroup>
                    </Card>
                </Col>
                {/* Date */}
                <Col>
                    <Card className='form-card'>
                        <FormGroup className='form-input'>
                            <Label for="date" className='input-label'>Date</Label>
                            <Input type="date" id="date" />
                        </FormGroup>
                    </Card>
                </Col>
                {/* Attendees */}
                <Col>
                    <Card className='form-card'>
                        <FormGroup className='form-input'>
                            <Label for="attendees" className='input-label'>Attendees</Label>
                            <Input type="text" name="attendees" />
                        </FormGroup>
                    </Card>
                </Col>
                {/* Submit Button */}
                <Button type="submit" color="primary" className='btn-raised btn-submit'>Submit Form</Button>
            </Form>
        </>
    );
}

export default SeminarAttendance;
