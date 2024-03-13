import React from 'react';
import { Button, Container, Form, FormGroup, Label, Input, Col, Alert } from 'reactstrap';

const IntroEvalsForm: React.FC = () => {
    // Assuming is_open is a boolean state/prop that determines form visibility
    const is_open = true;

    return (
        <Container className="main">
            <h3>Introductory Evaluations Form</h3>
            {is_open ? (
                <Form data-module="introEvalsForm">
                    <FormGroup>
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <FormGroup row className="label-floating is-empty">
                                    <Label for="social_events" className="control-label">
                                        Social Events
                                    </Label>
                                    <Col>
                                        <Input type="textarea" name="social_events" id="social_events" />
                                    </Col>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <FormGroup row className="label-floating is-empty">
                                    <Label for="comments" className="control-label">
                                        Comments
                                    </Label>
                                    <Col>
                                        <Input type="textarea" name="comments" id="comments">
                                            Other notes
                                        </Input>
                                    </Col>
                                </FormGroup>
                            </div>
                        </div>
                    </FormGroup>
                    <Button color="primary" type="submit" className="btn-raised">
                        Submit Introductory Evaluation
                    </Button>
                </Form>
            ) : (
                <Alert color="danger">
                    <span className="glyphicon glyphicon-remove-sign"></span> The submission period for this form has ended.
                </Alert>
            )}
        </Container>
    );
};

export default IntroEvalsForm;
