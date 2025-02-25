import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import Navbar from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import TaskForm from '../TaskForm/TaskForm';

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
            <Banner></Banner>
            <TaskForm></TaskForm>
        </div>
    );
};

export default Home;