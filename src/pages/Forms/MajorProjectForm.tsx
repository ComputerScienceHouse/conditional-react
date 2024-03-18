import React from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Col, Alert, Card } from 'reactstrap';
import '../../css/major-project-form.css'

const MajorProjectForm: React.FC = () => {
    // Assuming is_open is a boolean state/prop that determines form visibility
    const is_open = true;

    // Assuming major_projects_len and major_projects are available as props or state
    const major_projects_len = 0; // Replace with actual length
    const major_projects: any[] = []; // Replace with actual data

    // Assuming is_eval_director is a boolean determining if the user is an evaluation director
    const is_eval_director = true;

    return (
        <Container>
            <h3 className="page-title">Major Project Form</h3>
            {is_open ? (
                <Form data-module="majorProjectForm">
                    <FormGroup>
                        <div>
                            <Card className="form-card">
                                <FormGroup>
                                    <Label for="name" className='input-label'>
                                        Project Name
                                    </Label>
                                    <Col>
                                        <Input
                                            type="text"
                                            id="name"
                                            maxLength={64}
                                            placeholder="A clever name for your project, sometimes people will come up with an acronym."
                                        />
                                    </Col>
                                </FormGroup>
                            </Card>
                        </div>
                        <div>
                            <Card className="form-card">
                                <FormGroup>
                                    <Label for="description" className='input-label'>
                                        Description
                                    </Label>
                                    <Col>
                                        <Input
                                            type="textarea"
                                            rows="3"
                                            id="description"
                                            placeholder="A 'two-liner' description of what your project is. If you have source materials like a GitHub repo publicly available, it's also useful to include links to them."
                                        />
                                    </Col>
                                </FormGroup>
                            </Card>
                        </div>
                        <Button color="primary" type="submit" className="btn-raised btn-submit">
                            Submit Major Project
                        </Button>
                    </FormGroup>
                </Form>
            ) : (
                <Alert color="danger">
                    <span className="glyphicon glyphicon-remove-sign"></span> The submission period for this form has ended.
                </Alert>
            )}
            <h3 className="page-title">All Major Projects</h3>
            {major_projects_len <= 0 ? (
                <div className="panel panel-default">
                    <div className="panel-body">
                        <p className="text-center">No Pending Major Projects</p>
                    </div>
                </div>
            ) : (
                major_projects.map((p) => (
                    <div className="panel panel-default" key={p.id}>
                        <div className="panel-body">
                            <div className="col-xs-8 col-sm-10">
                                <h4>{p.proj_name}</h4>
                                <img className="table-img" src={`https://profiles.csh.rit.edu/image/${p.username}`} alt="Profile" />
                                {p.name} ({p.username})
                            </div>
                            <div className="col-xs-4 col-sm-2">
                                {is_eval_director ? (
                                    <div className="btn-group" data-module="majorProjectStatus" data-id={p.id}>
                                        <Button
                                            href="#"
                                            className={`btn btn-mp ${p.status === 'Passed' ? 'btn-success' : p.status === 'Failed' ? 'btn-danger' : 'btn-warning'}`}
                                            data-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {p.status}
                                            <span className="caret"></span>
                                        </Button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a href="#" data-option="Passed">
                                                    <span className="glyphicon glyphicon-ok-sign green"></span> Passed
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" data-option="Pending">
                                                    <span className="glyphicon glyphicon-hourglass yellow"></span> Pending
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" data-option="Failed">
                                                    <span className="glyphicon glyphicon-remove-sign red"></span> Failed
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" data-option="Delete">
                                                    <span className="glyphicon glyphicon-trash red"></span> Delete
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    <>
                                        {p.status === 'Passed' && (
                                            <h5 style={{ padding: '15px 20px', float: 'right' }}>
                                                <span className="glyphicon glyphicon-ok green"></span>
                                            </h5>
                                        )}
                                        {p.status === 'Failed' && (
                                            <h5 style={{ padding: '15px 20px', float: 'right' }}>
                                                <span className="glyphicon glyphicon-remove red"></span>
                                            </h5>
                                        )}
                                        {p.status !== 'Passed' && p.status !== 'Failed' && (
                                            <h5 style={{ padding: '15px 20px', float: 'right' }}>
                                                <span className="glyphicon glyphicon-hourglass yellow"></span>
                                            </h5>
                                        )}
                                        {p.is_owner && p.status === 'Pending' && (
                                            <Button className="btn btn-danger btn-mp" data-module="majorProjectStatus" data-id={p.id}>
                                                <span className="glyphicon glyphicon-trash"></span> Delete
                                            </Button>
                                        )}
                                    </>
                                )}
                            </div>
                            <button
                                className="btn-expand-panel"
                                role="button"
                                data-toggle="collapse"
                                ref={`#evalsCollapse-${p.id}`}
                                aria-expanded="false"
                                aria-controls={`evalsCollapse-${p.id}`}
                            >
                                <span className="glyphicon glyphicon-menu-down"></span>
                            </button>
                            <div className="collapse major-project-desc" id={`evalsCollapse-${p.id}`}>
                                {p.description}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </Container>
    );
};

export default MajorProjectForm;
