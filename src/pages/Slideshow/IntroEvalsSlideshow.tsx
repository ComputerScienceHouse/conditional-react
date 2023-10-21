import { useEffect, useReducer, useState } from "react"
import Reveal from "reveal.js";
import Slide from "./Slide"
import 'reveal.js/dist/reset.css'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/white.css'
import './index.css'
import { Batch, IntroEvalsSummary } from "../../API/Types";
import { getJSON, toastError } from "../../API/API";
import { Col, Container, Row } from "reactstrap";
import BatchSlide from "./BatchSlide";
import NumberBox from "./NumberBox";

const IntroEvalsSlideshow = () => {

    const initSlides = () => {
        let slides = new Reveal({
            backgroundTransition: 'slide',
            transition: 'slide'
        });
        slides.initialize();
    }

    const [removedMembers, setRemovedMembers] = useState<string[]>([]);

    const [frosh, setFrosh] = useState<IntroEvalsSummary[]>([]);

    useEffect(() => {
        getJSON<IntroEvalsSummary[]>("/api/evals/intro")
            .then(setFrosh)
            .then(initSlides)
            .catch(toastError("Unable to fetch Intro Evals data"));
    }, [])

    const [batches, setBatches] = useState<Batch[]>([]);

    useEffect(() => {
        getJSON<Batch[]>("/api/batch")
            .then(e => setBatches(e.map(b => ({
                ...b,
                members: b.members.map(m => m.split(",")[0]),
            }))))
            .catch(toastError("Unable to fetch Batches"))
    }, []);

    const passFailBatch = (batch: Batch) => (pass: boolean) => {
        setRemovedMembers([...removedMembers, ...batch.members])
    }

    return (
        <div className="reveal vh-100 vw-100">
            <div className="slides w-100" data-transition="slide">
                {/* placeholder, because slideshow doesn't work unless at least one slide is present from the beginning*/}
                <section data-transition="slide" className="vw-100">
                    <section data-transition="slide" className="vw-100">
                        <Container className="d-flex flex-column vh-100 px-0 d-xl-flex w-100">
                            <h2>Intro Evals Slideshow</h2>
                            <Row className="text-center align-self-center w-100 justify-content-center py-3">
                                <Col className="col-3">
                                    <NumberBox text={`${frosh.length}`} subtext="Intro Members" success={true} />
                                </Col>
                                <Col className="col-3">
                                    <NumberBox text={`${batches.length}`} subtext="Batches" success={true} />
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <section data-transition="slide" className="vw-100">
                        <Container className="d-flex flex-column vh-100 px-0 d-xl-flex w-100">
                            <p>Hi :)</p>
                        </Container>
                    </section>
                </section>
                {
                    batches.map((b, i) =>
                        <BatchSlide
                            key={i}
                            batch={b}
                            onPassFail={passFailBatch(b)}
                        />
                    )
                }

                {
                    frosh.filter(f => !removedMembers.includes(f.name)).sort((a, b) => a.name.localeCompare(b.name)).map((f, i) =>
                        <Slide
                            key={i}
                            uid={f.uid}
                            name={f.name}
                            packet={Math.trunc(100 * f.signatures / f.max_signatures)}
                            hm_absences={f.missed_hms}
                            directorships={f.directorships}
                            seminars={f.seminars} />)
                }
            </div>
        </div>

    )
}

export default IntroEvalsSlideshow
