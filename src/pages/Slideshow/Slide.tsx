import { useEffect, useState } from "react"
import { Button, Card, CardText, Col, Container, Row } from "reactstrap"
import { getJSON, toastError } from "../../API/API";
import { IntroEvalsForm } from "../../API/Types";
import NumberBox from "./NumberBox"

const Slide = (props: {
    name: string,
    uid: string | null,
    packet: number, // number from 0 - 100
    hm_absences: number,
    directorships: number,
    seminars: number,
}) => {

    const [comments, setComments] = useState<string>("");
    const [socials, setSocials] = useState<string>("");

    useEffect(() => {
        if (props.uid !== null) {
            getJSON<IntroEvalsForm[]>(`/api/forms/intro/${props.uid}`)
                .then(e => {
                    setComments(comments + (e[0].comments || ""));
                    setSocials(socials + (e[0].social_events || ""));
                })
                .catch(toastError(`Unable to fetch Data for ${props.uid}`))
        }
    }, []);

    return (
        <section data-transition="slide">
            <section data-transition="slide" className="vw-100">
                <Container className="d-flex flex-column vh-100 px-0 d-xl-flex w-100">
                    <Row className="">
                        <Col className="text-center mb-3 py-3">
                            <h1 className="text-capitalize">{props.name}</h1>
                        </Col>
                    </Row>
                    <Row className="text-center align-self-center w-100">
                        <Col className="col-3">
                            <NumberBox text={`${props.packet}%`} subtext="Packet Signatures" success={props.packet >= 60} />
                        </Col>
                        <Col className="col-3">
                            <NumberBox text={`${props.hm_absences}`} subtext="House Meeting Absences" success={props.hm_absences <= 1} />
                        </Col>
                        <Col className="col-3">
                            <NumberBox text={`${props.directorships}`} subtext="Directorship Meetings" success={props.directorships >= 6} />
                        </Col>
                        <Col className="col-3">
                            <NumberBox text={`${props.seminars}`} subtext="Techincal Seminars" success={props.seminars >= 2} />
                        </Col>
                    </Row>
                    <Row className="text-center m-3 py-3 align-self-center">
                        <Button className="mr-3 shadow-none border-success border rounded pf-button"><h1 className="text-success px-5">Pass</h1></Button>
                        <Button className="mr-3 shadow-none border-danger border rounded pf-button"><h1 className="text-danger px-5">Fail</h1></Button>
                    </Row>
                </Container>
            </section>
            <section data-transition="slide" className="vw-100">
                <Container className="d-flex flex-column vh-100 px-0 d-xl-flex w-100">
                    <Row>
                        <Col className="col-6">
                            <p>Comments</p>
                        </Col>
                        <Col className="col-6">
                            <p>Social Events</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-6">
                            <p className="soc-com">{comments}</p>
                        </Col>
                        <Col className="col-6">
                            <p className="soc-com">{socials}</p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </section>
    )
}

export default Slide
