import React, { useState } from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    ButtonGroup, Form, FormGroup, Container, Row, Col, Label, Input, Button, Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from 'reactstrap';
import User from './User';
import queryTarget from '../index';
import './styles.css';
function PageLayout(props, queryTarget) {
    //const [user, setUser] = useState(new User()); // Initialize a new User instance

    //user.phone = "51651669999";
    const user = props.user;
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const items = [
        {
            src: '../photos/istockphoto-1152326193-612x612.jpg',
            altText: 'Slide 1',
            caption: 'Slide 1 Caption',
        },
        {
            src: '../photos/GettyImages-1044460686.jpg',
            altText: 'Slide 2',
            caption: 'Slide 2 Caption',
        },
        {
            src: '../photos/young-woman-brought-her-sick-260nw-2035728986.webp',
            altText: 'Slide 3',
            caption: 'Slide 3 Caption',
        },
    ];

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src} alt={item.altText} />
                <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
        );
    });

    return (
        <Container>
            <Row>
                <Col className="bg-light border">
                    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                        <CarouselIndicators
                            items={items}
                            activeIndex={activeIndex}
                            onClickHandler={goToIndex}
                        />
                        {slides}
                        <CarouselControl
                            direction="prev"
                            directionText="Previous"
                            onClickHandler={previous}
                        />
                        <CarouselControl
                            direction="next"
                            directionText="Next"
                            onClickHandler={next}
                        />
                    </Carousel>
                </Col>
            </Row>

            <Row>
                <div>
                    <Col className="bg-light border" bg="auto">
                        <div>
                            <Link to="/VetLoginPage" user={props.user} queryTarget={queryTarget}>
                                <Button color="primary" size="lg">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </div>

            </Row>
           

        </Container>


        );
}
export default PageLayout;