import { useState } from "react";
import { Button, Col, Container, Row } from "reactstrap"
import { Batch } from "../../API/Types";

const BatchSlide = (props: {
    batch: Batch,
    onPassFail: (passed: boolean) => void
}) => {

    const [passed, setPassed] = useState<string | null>(null);

    return (
        <section data-transition="slide">
            <section data-transition="slide" className="vw-100">
                <Container className="d-flex flex-column vh-100 px-0 w-100">
                    <Row>
                        <Col className="text-center">
                            <h2>{props.batch.name}</h2>
                        </Col>
                    </Row>
                    <Row>
                        {
                            props.batch.members.map((f, i) =>
                                <Col key={i} className="py-0 m-0 col-2">
                                    <p className="batch-name py-1 m-0">{f}</p>
                                </Col>
                            )
                        }
                    </Row>
                    {
                        passed == null ?
                            <Row className="text-center m-3 py-3 align-self-center">
                                <Button
                                    className="mr-3 shadow-none border-success border rounded pf-button"
                                    onClick={_ => {
                                        props.onPassFail(true);
                                        setPassed("Passed");
                                    }}
                                >
                                    <h1 className="text-success px-5">Pass</h1>
                                </Button>
                                <Button
                                    className="mr-3 shadow-none disband-gray border rounded pf-button"
                                    onClick={_ => setPassed("Disbanded")}
                                >
                                    <h1 className="px-5 disband-gray">Disband</h1>
                                </Button>
                                <Button
                                    className="mr-3 shadow-none border-danger border rounded pf-button"
                                    onClick={_ => {
                                        props.onPassFail(false);
                                        setPassed("Failed");
                                    }}
                                >
                                    <h1 className="text-danger px-5">Fail</h1>
                                </Button>
                            </Row>
                            :
                            <h3 className={`py-3 my-3 ${passed === "Passed" ? "text-success" : (passed == "Failed" ? "text-danger" : "")}`}>{passed}</h3>
                    }
                </Container>
            </section>
            <section data-transition="slide" className="vw-100">
                <Container className="d-flex flex-column vh-100 px-0 w-100">
                    <Row>
                        <Col>
                            <h2>Creator: {props.batch.creator}</h2>
                        </Col>
                    </Row>
                    <Row className="py-3">
                        <Col>
                            {props.batch.conditions.map(c => <p>{c}</p>)}
                        </Col>
                    </Row>
                </Container>
            </section>
        </section>
    )
}

export default BatchSlide
