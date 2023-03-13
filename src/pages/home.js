import { Container, Row, Col, Button, ToastContainer } from "react-bootstrap"
import FormDetails from './form'
import { Link, useNavigate } from "react-router-dom";
import NavbarContent from '../components/Navbar';
import { useState, useEffect} from 'react';
import { getAuth, onAuthStateChanged} from "firebase/auth"
import React from 'react';
import icon  from '../assets/img2.jpg'

import { BrowserRouter, Routes, Route } from "react-router-dom";

function Home() {

    const [show, setShow] = useState(false);
    const auth = getAuth();
    const [user, setuser] = useState(null)

    onAuthStateChanged(auth, (currentUser) => {
        setuser(currentUser);
    });

    let navigate = useNavigate();
    const createForm = () => {
        if(user) {
            console.log("created");
            navigate("/formDetails");
        } else {
            setShow(!show);
        }
    }

    return (

        <div className="home">
            <NavbarContent />
            <Container>
                <Row className="row">
                    <Col >
                        <h4>Create a portfolio</h4>
                        <br />
                        <h5>You can make a simple <strong>portfolio</strong> here and share anywhere!</h5>
                        <br />
                        <Button onClick={createForm} >Create Portfolio</Button>
                    </Col>
                    
                    <Col className="column c2">
                        <div className="image">
                            <img 
                            src={icon}
                            alt="image" 
                            width="500"
                            height="400"
                            className = "responsive-img"
                            />
                        </div>
                        
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default Home;
