import React, { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "../api/axios";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import img1 from "../images/weather3.png" 

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [type, setType] = useState('password')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = JSON.stringify({
                username: username,
                password: password,
            });
            const response = await axios.post("login/", data);
            const content = response?.data;
            if (content?.success) {
                localStorage.setItem("token", "Token " + content?.data.token);
                Swal.fire("", content?.message, "success");
                navigate("/weather/");
            } else {
                Swal.fire("", content?.message, "error");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleEye = () =>{
        type == 'password'? setType('text'):setType('password');
    }

    return (
        // <div>
        //     <Form onSubmit={handleSubmit}>
        //         <Form.Group className="mb-4 loginUsername">
        //             <Form.Label>Username</Form.Label>
        //             <Form.Control
        //                 onChange={(e) => setUsername(e.target.value)}
        //                 className="login-text p-2"
        //                 type="text"
        //                 placeholder="Username"
        //                 required
        //             />
        //         </Form.Group>

        //         <Form.Group className="mb-4 loginPassword">
        //             <Form.Label>Password</Form.Label>
        //             <Form.Control
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 className="login-text p-2"
        //                 type="password"
        //                 placeholder="Password"
        //                 required
        //             />
        //         </Form.Group>

        //         <button type="submit">Sign in</button>
        //         <Link to="/Register">To Register</Link>
        //     </Form>
        // </div>
        <div>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                crossOrigin="anonymous"/>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <div className="row mt-3">
                <div className="col-4"></div>
                <form
                    className="col-4 mt-4"
                    style={{ backgroundColor: "#7877f4", color: "white" }}
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
                            <strong>Login</strong>
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
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        
                        <div class="input-group">
                            <input
                                type={type}
                                className="form-control"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required/>
                            <span class="input-group-text" id="basic-addon1" onClick={handleEye}>
                                {type=='password'?
                                    <span className="fa fa-eye" />
                                    :
                                    <span className="fa fa-eye-slash" />
                                }
                            </span>
                        </div>
                        
                    </div>
                    <br />
                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-light"
                            style={{ color: "rgb(95, 95, 95)" }}>
                            <b>Sign in</b>
                        </button>
                        <br />
                        <hr />
                        <br />
                        <p>
                            Not Registered?{" "}
                            <Link to="/Register" style={{ color: "rgb(255, 255, 255)" }}>
                                <b>Create an account</b>
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
};
        
export default Login;
