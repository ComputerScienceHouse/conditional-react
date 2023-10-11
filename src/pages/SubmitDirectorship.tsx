import { post, toastError } from '../API/API';
import { UserInfo } from "../API/Types";
import { Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Input } from "reactstrap";
import { useState } from 'react';
import { DirectorshipType, DirectorshipTypes } from '../API/Types';
import UserSearch from "../components/UserSearch";
import { toast } from 'react-toastify';

const SubmitDirectorship = () => {

    const [meetingType, setMeetingType] = useState<DirectorshipType | undefined>(undefined);

    const [meetingDate, setMeetingDate] = useState<Date>(new Date());

    const [attendees, setAttendees] = useState<UserInfo[]>([]);

    const getDateAsStr = () => meetingDate.toISOString().split("T")[0]

    const canSubmit = () => meetingType !== undefined && attendees.length > 0

    const submit = () => {
        post("/attendance/directorship", {
            date: meetingDate.toISOString(),
            members: attendees.map(a => a.username),
            type: meetingType as string,
            frosh: [] //TODO: implement frosh
        })
            .then(() => toast.success("Submitted successfully!", { theme: "colored" }))
            .then(() => setTimeout(() => window.location.assign("/"), 3000))
            .catch(toastError("Unable to submit Attendance"))
    }

    return (
        <Container>
            <Container className="p-0 pb-3">
                <h4>Submit Directorship Attendance</h4>
            </Container>
            <Form>
                <FormGroup>
                    <Card>
                        <CardHeader>Meeting Type</CardHeader>
                        <CardBody>
                            <Input
                                id="type"
                                type="select"
                                className="form-control"
                                placeholder="Type"
                                value={meetingType || ""}
                                onChange={e => setMeetingType(e.target.value as DirectorshipType)}>
                                <option key={-1} value={undefined} hidden disabled selected></option>
                                {
                                    DirectorshipTypes.map((dt, index) =>
                                        <option key={index} value={dt}>{dt}</option>
                                    )
                                }
                            </Input>
                        </CardBody>
                    </Card>
                </FormGroup>
                <FormGroup>
                    <Card>
                        <CardHeader>Date</CardHeader>
                        <CardBody>
                            <Input id="date"
                                type="date"
                                className="form-control"
                                value={getDateAsStr()}
                                onChange={e => setMeetingDate(new Date(e.target.value))}
                            />
                        </CardBody>
                    </Card>
                </FormGroup>
                <FormGroup>
                    <Card>
                        <CardHeader>Attendees</CardHeader>
                        <CardBody>
                            <UserSearch users={[attendees, setAttendees]} />
                        </CardBody>
                    </Card>
                </FormGroup>
                <Container className="d-flex px-0">
                    <Button disabled={!canSubmit()} onClick={submit} size="sm" color="primary" className="flex-grow-1">Submit</Button>
                </Container>
            </Form>
        </Container>
    )
}

export default SubmitDirectorship
