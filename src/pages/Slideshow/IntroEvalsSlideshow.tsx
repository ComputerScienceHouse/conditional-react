import { useEffect, useReducer, useState } from "react"
import Reveal from "reveal.js";
import Slide from "./Slide"
import 'reveal.js/dist/reset.css'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/white.css'
import './index.css'
import { IntroEvalsSummary } from "../../API/Types";
import { getJSON, toastError } from "../../API/API";
import { Container } from "reactstrap";
import BatchSlide from "./BatchSlide";

const IntroEvalsSlideshow = () => {

    const initSlides = () => {
        let slides = new Reveal({
            backgroundTransition: 'slide',
            transition: 'slide'
        });
        slides.initialize();
    }

    const [frosh, setFrosh] = useState<IntroEvalsSummary[]>([]);

    useEffect(() => {
        getJSON<IntroEvalsSummary[]>("/api/evals/intro")
            .then(setFrosh).then(initSlides)
            .catch(toastError("Unable to fetch Intro Evals data"));
    }, [])

    interface Batch {
        name: string,
        names: string[],
    }

    const batches: Batch[] = [];

    return (
        <div className="reveal vh-100 vw-100">
            <div className="slides w-100" data-transition="slide">
                <section data-transition="slide" className="vw-100">
                    <Container className="d-flex flex-column vh-100 px-0 d-xl-flex w-100">
                        <h2>Intro Evals Slideshow</h2>
                        {/* placeholder, because slideshow doesn't work unless at least one slide is present from the beginning*/}
                    </Container>
                </section>
                {
                    batches.map((b, i) =>
                        <BatchSlide key={i} name={b.name} names={b.names} onPassFail={(pass) => setFrosh(frosh.filter(f => !b.names.includes(f.name)))} />
                    )
                }

                {
                    frosh.sort((a, b) => a.name.localeCompare(b.name)).map((f, i) =>
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
