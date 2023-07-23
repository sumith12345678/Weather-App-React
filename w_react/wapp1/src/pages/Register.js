import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "../api/axios";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import img1 from "../images/weather3.png" 

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = JSON.stringify({
                username: username,
                email: email,
            });
            const response = await axios.post("reg/", data);
            const content = response?.data;
            if (content?.success) {
                Swal.fire("", content?.message, "success");
                navigate("/");
            } else {
                Swal.fire("", content?.message, "error");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        // <div>
        //     <Form onSubmit={handleSubmit}>
        //         <Form.Group
        //             className="mb-4 registerUsername"
        //             controlId="registerUsername"
        //         >
        //             <Form.Label>Username</Form.Label>
        //             <Form.Control
        //                 onChange={(e) => setUsername(e.target.value)}
        //                 className="register-text p-2"
        //                 type="text"
        //                 placeholder="Username"
        //                 required
        //             />
        //         </Form.Group>

        //         <Form.Group className="mb-4 registerEmail" controlId="registerEmail">
        //             <Form.Label>Email</Form.Label>
        //             <Form.Control
        //                 onChange={(e) => setEmail(e.target.value)}
        //                 className="register-text p-2"
        //                 type="email"
        //                 placeholder="Email"
        //                 required
        //             />
        //         </Form.Group>
        //         <Button type="submit">Sign up</Button>
        //         <Link to="/">To Login</Link>
        //     </Form>
        // </div>
        
        <div>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                crossOrigin="anonymous"/>

            <div className="row mt-3">
                <div className="col-4"></div>
                <form
                    className="col-4 mt-4"
                    style={{ backgroundColor: "#984aea", color: "white" }}
                    onSubmit={handleSubmit}>
                    <div className="text-center pt-2">
                        <img src={img1} alt="" width="125" height="125" />
                    </div>
                    <div className="text-center pt-1">
                        <h3>
                            <strong>WeatherPlus</strong>
                        </h3>
                        <p>"Experience the weather"</p>
                    </div>
                    <hr />
                    <div className="text-center">
                        <h4>
                            <strong>Register</strong>
                        </h4>
                    </div>
                    <div className="mb-3 pt-3 px-4">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                            required/>
                    </div>
                    <div className="mb-3 px-4">
                        <label htmlFor="email" className="form-label">
                        Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                    </div>
                    <br />
                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-light"
                            style={{ color: "rgb(95, 95, 95)" }}>
                            <b>Sign up</b>
                        </button>
                        <br />
                        <hr />
                        <br />
                        <p>
                            Already have an account ?{" "}
                            <Link to="/" style={{ color: "rgb(255, 255, 255)" }}>
                                <b>Login here</b>
                            </Link>
                        </p>
                    </div>
                    <br />
                </form>
                <div className="col-4"></div>
            </div>

            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                crossOrigin="anonymous"></script>
        </div>
    );
}

export default Register;
