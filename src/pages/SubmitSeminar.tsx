import { post, toastError } from '../API/API';
import { UserInfo } from "../API/Types";
import { Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Input } from "reactstrap";
import { useState } from 'react';
import UserSearch from "../components/UserSearch";
import { toast } from 'react-toastify';

const SubmitSeminar = () => {

    const [meetingName, setMeetingName] = useState<string>("");

    const [meetingDate, setMeetingDate] = useState<string>(new Date().toISOString().split("T")[0]);

    const [attendees, setAttendees] = useState<UserInfo[]>([
        {
            username: "ethanf108",
            fullName: "Ethan Ferguson",
        }
    ]);

    const canSubmit = () =>
        meetingName.length > 1
        && attendees.length > 0
        && (d => d instanceof Date && !isNaN(d.getTime()))(new Date(meetingDate))

    const submit = () => {
        post("/api/attendance/seminar", {
            date: meetingDate,
            members: attendees.map(a => a.username),
            name: meetingName,
            frosh: [], //TODO: implement frosh
            approved: false
        })
            .then(() => toast.success("Submitted successfully!", { theme: "colored" }))
            .then(() => setTimeout(() => window.location.assign("/"), 3000))
            .catch(toastError("Unable to submit Attendance"))
    }

    return (
        <Container>
            <Container className="p-0 pb-3">
                <h4>Submit Technical Seminar Attendance</h4>
            </Container>
            <Form>
                <FormGroup>
                    <Card>
                        <CardHeader>Seminar Name</CardHeader>
                        <CardBody>
                            <Input
                                id="type"
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={meetingName}
                                onChange={e => setMeetingName(e.target.value)} />
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
                                value={meetingDate}
                                onChange={e => setMeetingDate(e.target.value)}
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

export default SubmitSeminar
