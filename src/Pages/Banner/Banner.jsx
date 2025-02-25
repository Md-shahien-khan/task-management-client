import React from 'react';
import banner from '../../assets/images/banner.png';

const Banner = () => {
    return (
        <div
            className="w-full h-[300px] md:h-[600px] bg-cover bg-center"
            style={{ backgroundImage: `url(${banner})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}
        >
            <div className="flex flex-col justify-center items-center h-full text-white text-center">
                <h1 className="text-2xl md:text-6xl font-bold mb-4 text-black">Welcome to Task Maven</h1>
                <p className="md:text-xl max-w-2xl text-black">
                    This is a responsive banner with a background image. It looks great on all devices!
                </p>
            </div>
        </div>
    );
};

export default Banner;