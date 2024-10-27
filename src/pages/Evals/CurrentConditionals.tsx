import { useOidcAccessToken, useOidcIdToken, useOidc } from '@axa-fr/react-oidc';
import React from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import UserInfo from '../../UserInfo';

const CurrentConditionals: React.FC = () => {
    const { accessTokenPayload } = useOidcAccessToken()   // this contains the user info in raw json format
    const userInfo = accessTokenPayload as UserInfo       //
    const { idToken, idTokenPayload } = useOidcIdToken()  // this is how you get the users id token
    const { login, logout, isAuthenticated } = useOidc()  // this gets the functions to login and logout and the logout state

    return (
        <div>
            <div className="container main">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Conditionals
                            {/* This button should only be visible to evals */}
                            <Button type="button" color="primary" size="sm" className="btn-conditional float-right" data-toggle="modal" data-target="#createConditional">
                                <span className="glyphicon glyphicon-plus"></span> Add
                            </Button>
                        </h3>
                    </div>
                    <div className="panel-body table-fill">
                        <div className="table-responsive">

                            {/* Display this div if there are no conditionals that exist */}
                            <div className="alert alert-info">No conditionals.</div>
                            {/* Display this table if there are any conditionals that exist right now */}
                            <Table className="table table-striped no-bottom-margin" data-module="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Date Created</th>
                                        <th>Date Due</th>
                                        <th>Description</th>
                                        {userInfo.groups.includes("eboard-evaluations") ?
                                            <th>Actions</th> : <></>
                                        }

                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Loop through the list of current conditionals */}
                                    <tr id="conditional-{{ c['id'] }}">
                                        {/* <td>{{ get_member_name(c['uid']) }}</td>
                                            <td>{{ c['date_created'] }}</td>
                                            <td>{{ c['date_due'] }}</td>
                                            <td>{{ c['description'] }}</td> */}

                                        {/* Only display this if user is evals */}
                                        {
                                            userInfo.groups.includes("eboard-evaluations") ? <td data-module="conditionalActions" data-id="{{ c['id'] }}">
                                                <Button color="success" size="sm" data-action="pass">Pass</Button>
                                                <Button color="danger" size="sm" data-action="fail">Fail</Button>
                                                <Button color="default" size="sm" data-action="delete">
                                                    <span className="glyphicon glyphicon-trash"></span> Delete
                                                </Button>
                                            </td> : <></>
                                        }

                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={false} toggle={() => { }} id="createConditional">
                <div className="vertical-alignment-helper">
                    <div className="modal-dialog vertical-align-center">
                        <div className="modal-content">
                            <ModalHeader toggle={() => { }} id="editUserTitle">Conditional</ModalHeader>
                            <Form data-module="conditionalForm" method="post">
                                <ModalBody>
                                    <FormGroup row className="user-edit-row">
                                        <Label for="memberName" className="control-label">Member Name</Label>
                                        <Col>
                                            <Input type="select" name="uid" id="memberName" className="form-control" data-module="memberSelect" data-src="cm_members" />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row className="user-edit-row">
                                        <Label for="due_date" className="control-label">Due Date</Label>
                                        <Col>
                                            <Input type="text" id="due_date" name="due_date" className="form-control" data-module="datepicker" />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row className="user-edit-row">
                                        <Label for="requirement" className="control-label">Requirement</Label>
                                        <Col>
                                            <Input type="text" className="form-control" id="requirement" name="description" />
                                        </Col>
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Input type="submit" className="btn btn-primary" value="Create" />
                                </ModalFooter>
                            </Form>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CurrentConditionals;
