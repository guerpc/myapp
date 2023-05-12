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

import image1 from '../photos/pexels-pixabay-45170.jpg';
import image2 from '../photos/pexels-photo-1378849.jpeg';
import image3 from '../photos/pexels-lumn-406014.jpg';

function PageLayout(props, queryTarget) {
    //const [user, setUser] = useState(new User()); // Initialize a new User instance

    //user.phone = "51651669999";
    const user = props.user;
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const items = [
        {
            src: image1,
            altText: 'Slide 1',
            caption: 'Vet Home Page',
        },
        {
            src: image2,
            altText: 'Slide 2',
            caption: 'Vet Home Page',
        },
        {
            src: image3,
            altText: 'Slide 3',
            caption: 'Vet Home Page',
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
                <img src={item.src} alt={item.altText} className="img-fluid" />
                <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
        );
    });

    return (
        <Container>
            <Row>
                <Col className="bg-light border">
                    <Link to="/VetLoginPage" user={props.user} queryTarget={queryTarget}>
                        <Button color="primary" size="lg">
                            Sign In
                        </Button>
                    </Link>
                </Col>
            </Row>
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
                <Col
                    className="bg-light border"
                    sm={{
                        offset: 1,
                        size: 'auto'
                    }}
                >
                    Group 2
                </Col>
                <Col
                    className="bg-light border"
                    sm={{
                        offset: 1,
                        size: 'auto'
                    }}
                >
                    BCS 430w

                </Col>

            </Row>

           

        </Container>


        );
}
export default PageLayout;