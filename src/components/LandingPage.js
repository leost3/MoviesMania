import React from 'react'
// import axios from 'axios';

function Home() {

    const slides = document.querySelectorAll('.slide');
    const auto = false; // Auto scroll
    const intervalTime = 5000;
    let slideInterval;
        
    const showNext = () => {
        // Get current class
        const current = document.querySelector('.current');
        // Remove current class
        current.classList.remove('current');
        // Check for next slide
        if (current.nextElementSibling) {
            // Add current to next sibling
            current.nextElementSibling.classList.add('current');
        } else {
            // Add current to start
            
            slides[0].classList.add('current');
        }
        setTimeout(() => current.classList.remove('current'));
    }


    const showPrev = () => {
        // Get current class
        const current = document.querySelector('.current');
        // Remove current class
        current.classList.remove('current');
        // Check for prev slide
        if (current.previousElementSibling) {
            // Add current to prev sibling
            current.previousElementSibling.classList.add('current');
        } else {
            // Add current to last
            slides[slides.length - 1].classList.add('current');
        }
        setTimeout(() => current.classList.remove('current'));
    }

    const nextSlide = () => {
        showNext();
        if (auto) {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        }
    }
    const prevSlide = () => {
        showPrev();
        if (auto) {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        }
    }

    // Auto slide
    if (auto) {
        // Run next slide at interval time
        slideInterval = setInterval(nextSlide, intervalTime);
    }
  
    const renderSliders = () => {

    }


    return (
        <div className="home">
            <div className="slider">
                <div className="slide ">
                    <div className="content">
                        <h1>Slider One</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ipsum facere ratione expedita qui modi, beatae aliquam esse officiis suscipit temporibus inventore aspernatur ut consequatur eos, adipisci et aliquid aut.</p>
                    </div>
                </div>
                <div className="slide current">
                    <div className="content">
                        <h1>Slider Two</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ipsum facere ratione expedita qui modi, beatae aliquam esse officiis suscipit temporibus inventore aspernatur ut consequatur eos, adipisci et aliquid aut.</p>
                    </div>
                </div>
                <div className="slide">
                    <div className="content">
                        <h1>Slider Three</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ipsum facere ratione expedita qui modi, beatae aliquam esse officiis suscipit temporibus inventore aspernatur ut consequatur eos, adipisci et aliquid aut.</p>
                    </div>
                </div>
                <div className="slide">
                    <div className="content">
                        <h1>Slider Four</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ipsum facere ratione expedita qui modi, beatae aliquam esse officiis suscipit temporibus inventore aspernatur ut consequatur eos, adipisci et aliquid aut.</p>
                    </div>
                </div>
                <div className="slide">
                    <div className="content">
                        <h1>Slider Five</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ipsum facere ratione expedita qui modi, beatae aliquam esse officiis suscipit temporibus inventore aspernatur ut consequatur eos, adipisci et aliquid aut.</p>
                    </div>
                </div>
                <div className="slide">
                    <div className="content">
                        <h1>Slider Six</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ipsum facere ratione expedita qui modi, beatae aliquam esse officiis suscipit temporibus inventore aspernatur ut consequatur eos, adipisci et aliquid aut.</p>
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={prevSlide} id="prev"><i className="fas fa-arrow-left"></i></button>
                    <button onClick={nextSlide} id="next"><i className="fas fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
    )
}

export default Home;
