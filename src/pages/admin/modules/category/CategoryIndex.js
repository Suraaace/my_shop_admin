import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {authToken} from "../../../../helper/authorization";

export default class CategoryIndex extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            pageTitle: 'Category Management',
            categories: [],
        }
    }

    componentDidMount(){
        this.loadDataFromServer();
    }

    handleDelete = (id) => {
        axios.delete(process.env.REACT_APP_API_HOST_URL+'/category/delete/'+id)
            .then((response) => {
                this.loadDataFromServer();
            })
            .catch(err => err);
    };

    loadDataFromServer= () => {
        axios.get(process.env.REACT_APP_API_HOST_URL+'/category/', {
            headers: authToken()
        })
                .then((response) => {
                    this.setState({categories: response.data.data });
                })
                .catch(err => err);
        
    }

    // loadDataFromServer = ()=>{
    //     // API call to fetch list of product in Nodejs
    //     axios.get(process.env.REACT_APP_API_HOST_URL+'/category/',{
    //         // params: {
    //         //     limit: this.state.limit,
    //         //     offset: this.state.offset,
    //         // } 
    //     })
    //     .then((response) => {
    //        // let totalData = response.data.count;

    //         this.setState(state => {
    //             state.categories = response.data.data;
    //             // state.productCount = totalData;
    //             // state.pageCount = Math.ceil(totalData/this.state.limit);
    //             return state;  // returns back the value 
    //          });
    //     })
    //     .catch(err => err);
    // }



    render() {
        return(
            <div>
                <h2> {this.state.pageTitle} </h2>
                <Link to ="/admin/category/create" className="btn btn-primary float-right"> Create Category</Link>
                <div className = "card-body">
                <h5 className = "card-title">Category</h5> 
                <div className="card">
                <table className = {"table"}>    
                <thead>
                <tr>
                    <th>Name</th>
                    <th colSpan={2}>Action</th>
                </tr>
                </thead>
                <tbody>{
                    this.state.categories.map((category,i)=>{
                        return (
                            <tr key = {i}>
                                <td>{category.name}</td>
                                <td><Link to={'/admin/category/edit/'+category._id}>Edit</Link></td>
                                <td><button type={'button'} onClick={()=>this.handleDelete(category._id)} className={'btn btn-danger'}>Delete</button></td>
                            </tr>
                        )
                    })
                    }
                </tbody>
                </table>
                </div>
                   
                </div>    
                
            </div>
        )
    }
}