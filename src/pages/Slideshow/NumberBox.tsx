import { Card, CardText, Container, Row } from "reactstrap"

const NumberBox = (props: { text: string, subtext: string, success: boolean }) => {

    return (
        <Card className={`bg-transparent shadow-none ${props.success ? "border-success" : "border-danger"} p-3 rounded number-box h-100`}>
            <Container className="h-100 d-flex flex-column">
                <Row className="d-block justify-content-center">
                    <h1 className="number-box-text">{props.text}</h1>
                </Row>
                <Row className="d-inline number-box-subtext">
                    <p>{props.subtext}</p>
                </Row>
            </Container>
        </Card>
    )
}

export default NumberBox
