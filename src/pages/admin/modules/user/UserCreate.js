import React from "react";
import axios from "axios";
import history from "../../../../helper/history";

class UserCreate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phone: "",
        }
        
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        if(id) {
            axios.get(process.env.REACT_APP_API_HOST_URL+'/user/'+id)
                .then((response) => {
                    this.setState({
                        firstName: response.data.data.firstName,
                        lastName: response.data.data.lastName,
                        email: response.data.data.email,
                        password: response.data.data.password,
                        phone: response.data.data.phone,
                    });
                })
                .catch(err => err);
        }
    }

    handleChange = (event) => {
         this.setState({[event.target.name] : event.target.value });
           
         // OR 
        // let name = event.target.name;
        // let value = event.target.value;
        // this.setState({[name] : value });
        
    };

    submitHandler = () => {
        let id = this.props.match.params.id;
        if(id) {
            axios.post(process.env.REACT_APP_API_HOST_URL+'/user/update/'+id, this.state)
                .then((response) => {
                    history.push('/admin/user');
                });
        } else {
            axios.post(process.env.REACT_APP_API_HOST_URL+'/user/create', this.state)
                .then((response) => {
                    history.push('/admin/user');
                });
        }

    };

    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="firsName ">First Name</label>
                        <input type="text" className="form-control" placeholder="First Name" 
                        name={'firstName'} value={this.state.firstName} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName ">Last Name</label>
                        <input type="text" className="form-control" placeholder="Last Name" 
                        name ={'lastName'} value={this.state.lastName} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName ">Email</label>
                        <input type="text" className="form-control" placeholder="Email" 
                        name={'email'} value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password ">Password</label>
                        <input type="password" className="form-control" minlength="8" 
                        required placeholder="Password" name={'password'} value={this.state.password}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="text" className="form-control" placeholder="Phone Number" 
                        name={'phone'} value={this.state.phone} onChange={this.handleChange}/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.submitHandler}> Save</button>
                </form>

            </div>
        )
    }
}

export default UserCreate;