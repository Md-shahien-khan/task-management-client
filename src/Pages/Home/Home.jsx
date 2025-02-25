import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import Navbar from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import TaskForm from '../TaskForm/TaskForm';

const Home = () => {
    return (
        <div>
            {/* Navbar with animation */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <Navbar />
            </motion.div>

            {/* Banner with animation */}
            <motion.div
                initial={{ y: 50, opacity: 0 }} // Start slightly below and invisible
                animate={{ y: 0, opacity: 1 }} // Animate to natural position and fully visible
                transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }} // Delay to appear after Navbar
            >
                <Banner />
            </motion.div>

            {/* TaskForm with animation */}
            <motion.div
                initial={{ y: 50, opacity: 0 }} // Start slightly below and invisible
                animate={{ y: 0, opacity: 1 }} // Animate to natural position and fully visible
                transition={{ delay: 1, duration: 0.5, ease: 'easeOut' }} // Delay to appear after Banner
            >
                <TaskForm />
            </motion.div>
        </div>
    );
};

export default Home;