import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import {authToken} from "../../../../helper/authorization";

class UserIndex extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            offset: 0,          // pagination variable offset, limit, pagecount
            limit: 5,
            pageCount: 0,
            pageTitle: 'User Management',
            users: [],
            userCount: 0,         // to count the total no of user 
            message:"",
            search: {
                firstName: "",
                lastName: "",
                email: ""
            }
        }
    }

    componentDidMount() {
        this.loadDataFromServer();
    }

    handleDelete = (id) => {
        axios.delete(process.env.REACT_APP_API_HOST_URL+'/user/delete/'+id)
            .then((response) => {
                this.loadDataFromServer();
            })
            .catch(err => err);
    };

    loadDataFromServer = () => {

        // Get All data from API and update the state
        axios.get(process.env.REACT_APP_API_HOST_URL+'/user/',  {
            headers: authToken(),
            params: {
                limit: this.state.limit,
                offset: this.state.offset,
                search: this.state.search
            }
            })
            .then((response) => {

                let totalData = response.data.count;

                this.setState( state => {
                    state.users = response.data.data;
                    state.userCount = totalData;
                    state.pageCount = Math.ceil(totalData / this.state.limit);
                    return state;
                });

            })
            .catch(err => err);
    };

    handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.state.limit);

        this.setState({ offset: offset }, () => {
            this.loadDataFromServer();
        });
    };

    // searchFirstName = (event) => {
    //     let firstName = event.target.value;

    //     this.setState( state => {
    //         state.search.firstName = firstName;
    //         return state;
    //     }, () => {
    //         this.loadDataFromServer();
    //     });
    // };

    searchHandle = (event) => {
        let name = event.target.name;
        let value =event.target.value;

        this.setState(state=> {
            state.search[name] = value;
            return state;
        }, ()=>{
            this.loadDataFromServer();
        })
    }

    // searhByEmail = (event) => {
    //     let email = event.target.value;

    //     this.setState( state => {
    //         state.search.email = email;
    //         return state;
    //     }, () => {
    //         this.loadDataFromServer();
    //     });
    // };

    render() {
        return(
            <div>
                <h2>{ this.state.pageTitle}</h2>
                <div className={'row'}>
                    <div className={'col2'}>
                        <div className={'form-group'}>
                            <label>First Name</label>
                            <input type={'text'} placeholder={'First Name'} 
                            name={'firstName'} value={this.state.search.firstName} 
                            className={'form-control'} onChange={this.searchHandle}/>
                        </div>
                    </div>
                    <div className={'col2'}>
                        <div className={'form-group'}>
                            <label>Last Name</label>
                            <input typ={'text'} placeholder={'Last Name'} 
                            className={'form-control'} 
                            name={'lastName'} value={this.state.search.lastName} onChange={this.searchHandle}/>
                        </div>
                    </div>
                    <div className={'col2'}>
                        <div className={'form-group'}>
                            <label>Email</label>
                            <input type={'text'} placeholder={'Email'} 
                            className={'form-control'} 
                            name={'email'} value={this.state.search.email} onChange={this.searchHandle}/>
                        </div>
                    </div>
                </div>

                <Link to="/admin/user/create" className="btn btn-primary float-right">Create User</Link>
                <div className="card-body">
                    <h5 className="card-title">Users({this.state.userCount})</h5>
                    <div className="card">
                        <table className={'table'}>
                            <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Phone</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                               this.state.users.map((user, i) => {
                                   return (
                                       <tr key={i}>
                                           <td>{user.firstName}</td>
                                           <td>{user.lastName}</td>
                                           <td>{user.email}</td>
                                           <td>{user.password}</td>
                                           <td>{user.phone}</td>
                                           <td><Link to={'/admin/user/edit/' + user._id} 
                                                    className={'btn btn-primary'}>
                                                    Edit
                                                </Link>
                                            </td>
                                           <td><button type={'button'} onClick={() => this.handleDelete(user._id)} 
                                                    className={'btn btn-danger'}>
                                                    Delete
                                                </button>
                                            </td>
                                       </tr>
                                   )
                               })
                            }
                            </tbody>
                        </table>
                    </div>
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        pageClassName={'page-item'}
                        previousClassName={'page-item'}
                        nextClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousLinkClassName={'page-link'}
                        nextLinkClassName={'page-link'}
                        activeClassName={'active'}
                    />
                </div>

            </div>
        )
    }
}

export default UserIndex;