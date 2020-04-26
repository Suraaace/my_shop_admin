import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import history from "../../../../helper/history";

export const AdminLogin = (props) => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-8 login-box">
                        <div className="col-lg-12 login-title">
                            ADMIN PANEL
                        </div>

                        <div className="col-lg-12 login-form">
                            <div className="col-lg-12 login-form">
                                { message !== "" &&
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                }
                                <form
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        axios.post(process.env.REACT_APP_API_HOST_URL+'/auth/login/', {
                                            email: email,
                                            password: password
                                        })
                                            .then((response)=>{
                                                setMessage("");

                                                localStorage.setItem('user', JSON.stringify({
                                                    _id: response.data.data._id,
                                                    email: response.data.data.email,
                                                    firstName: response.data.data.firstName,
                                                    lastName: response.data.data.lastName,
                                                    token: response.data.data.token,
                                                }));

                                                localStorage.setItem('auth_token', response.data.data.token);
                                                history.push('/admin/user');

                                            })
                                            .catch(err => {
                                                setMessage("Invalid Credentials");
                                                setPassword("")
                                            });
                                    }}>
                                    <div className="form-group">
                                        <label className="form-control-label">Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={email}
                                            onChange={(event) => {
                                                setEmail(event.target.value);
                                            }} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">Password</label>
                                        <input
                                            type="password"
                                            name={'password'}
                                            value={password}
                                            onChange={(event) => {
                                                setPassword(event.target.value);
                                            }}
                                            className="form-control" />
                                    </div>

                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-6 login-btm login-text">
                                        </div>
                                        <div className="col-lg-6 login-btm login-button">
                                            <button type="submit" className="btn btn-outline-primary">LOGIN</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to={'/admin/forgot-password'}>Forgot Password</Link>
            </div>
        </div>
    );
};