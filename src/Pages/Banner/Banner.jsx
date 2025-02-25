import React from 'react';
import banner from '../../assets/images/banner.png';

const Banner = () => {
    return (
        <div
            className="w-full h-[600px] bg-cover bg-center"
            style={{ backgroundImage: `url(${banner})`, objectFit : ''}}
        >
            <div className="flex flex-col justify-center items-center h-full text-white text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Task Maven</h1>
                <p className="text-lg md:text-xl max-w-2xl">
                    This is a responsive banner with a background image. It looks great on all devices!
                </p>
            </div>
        </div>
    );
};

export default Banner;