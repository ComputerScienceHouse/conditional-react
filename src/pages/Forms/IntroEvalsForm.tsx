import React from 'react';
import { Button, Container, Form, FormGroup, Label, Input, Col, Alert, Card } from 'reactstrap';
import '../../css/intro-evals-form.css';

const IntroEvalsForm: React.FC = () => {
    // Assuming is_open is a boolean state/prop that determines form visibility
    const is_open = true;

    return (
        <Container>
            <h3 className='page-title'>Introductory Evaluations Form</h3>
            {is_open ? (
                <Form>
                    <FormGroup>
                        <Card className='form-card'>
                            <FormGroup>
                                <Label for="social-events" className='input-label'>
                                    Social Events
                                </Label>
                                <Col>
                                    <Input type="textarea" id="social-events" />
                                </Col>
                            </FormGroup>
                        </Card>
                        <Card className='form-card'>
                            <FormGroup>
                                <Label for="comments" className='input-label'>
                                    Comments
                                </Label>
                                <Col>
                                    <Input type="textarea" id="comments" placeholder='Other notes' />
                                </Col>
                            </FormGroup>
                        </Card>
                    </FormGroup>
                    <Button color="primary" type="submit" className="btn-raised btn-submit">
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
