import React from 'react';
import { Carousel } from 'react-bootstrap';
import image1 from '../assets/caropubg.jpg';
import image2 from '../assets/carovalorant.jpg';
import image3 from '../assets/carogtav.jpg';
export default function ListCarousel() {
    return (
        <div className="row mb-4">
            <div className="col-md-12" >
                <Carousel>
                    <Carousel.Item style={{ height: '400px' }}>
                        <img
                            className="d-block w-75 h-100 img-fluid mx-auto rounded-5"
                            style={{ objectFit: "cover", objectPosition: "center" }}
                            src={image1}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item style={{ height: '400px' }}>
                        <img
                            className="d-block w-75 h-100 img-fluid mx-auto rounded-5"
                            style={{ objectFit: "cover", objectPosition: "center" }}
                            src={image2}
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item style={{ height: '400px' }}>
                        <img
                            className="d-block w-75 h-100 img-fluid mx-auto rounded-5"
                            style={{ objectFit: "cover", objectPosition: "center", height:"515px"}}
                            src={image3}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                    
                </Carousel>
            </div>
        </div>
    );
};