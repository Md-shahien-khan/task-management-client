import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import {app} from "../Firebase/firebase.config"
import axios from 'axios';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();


    // Create User
    const createUser = async(email, password) =>{
        setLoading(true);
        const userCred =  await createUserWithEmailAndPassword(auth, email, password);
        // console.log(userCred)
        setUser(userCred)
        const userInfoForDB = {
            userName : userCred?.user.displayName,
            email : userCred?.user?.email
        }

        // console.log(userInfoForDB)
        axios.post(`http://localhost:2000/users`, userInfoForDB)
    }

    // google sign in Provider
    const googleSignIn = async() => {
        setLoading(true);
        const userCred =  await signInWithPopup(auth, googleProvider)
        setUser(userCred)
        const userInfoForDB = {
            userName : userCred?.user.userName,
            email : userCred?.user?.email
        }
        // console.log(userInfoForDB)
        axios.post(`http://localhost:2000/users`, userInfoForDB)
      };
      

    // sign in
    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Logout
    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    // update user profile
    const updateUserProfile = (name, photo) =>{
        return updateProfile(auth.currentUser, {
            disPlayName : name, photoURL : photo
        });
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, currentUSer =>{
            setUser(currentUSer);
            console.log('Current User : ', currentUSer);
            setLoading(false);
        });
        return () =>{
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        googleSignIn,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProvider;