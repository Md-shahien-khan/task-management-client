import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import Navbar from '../Navbar/Navbar';

const Home = () => {
    return (
        <div>
            <motion.div
                initial={{ y: -100, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 0.5, ease: 'easeOut' }} 
            >
                <Navbar />
            </motion.div>
        </div>
    );
};

export default Home;