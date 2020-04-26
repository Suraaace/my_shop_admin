import React from "react";
import axios from "axios";
import history from "../../../../helper/history";
import {authToken} from "../../../../helper/authorization";


export default class CategoryCreate extends React.Component{
    
    constructor(props){
        super(props);
        
        this.state ={
            name:"",

        }
    }

    componentDidMount(){
        let id = this.props.match.params.id;
        if(id) {
            axios.get(process.env.REACT_APP_API_HOST_URL+'/category/'+id, {
                headers: authToken()
            })
            .then((response)=>{
                this.setState({
                    name:response.data.data.name,
                });
            })
            .catch(err => err);
        }
    }

    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    };

    submitHandler = () => {
        let id = this.props.match.params.id;
        if(id) {
            axios.post(process.env.REACT_APP_API_HOST_URL+'/category/update/'+id, this.state, {
                headers: authToken()
            })
            .then((response) => {
                history.push('/admin/category');
            })
        } else {
        axios.post(process.env.REACT_APP_API_HOST_URL+'/category/create', this.state, {
            headers: authToken()
        })
            .then((response) => {
                history.push('/admin/category');
            })
        }
    }

    render(){
        return(
            <div>
                <form>
                <div className="form-group">
                    <label htmlFor = "categoryName" > Category Name </label>
                    <input type = "text" className ="form-control" placeholder = "Category Name" value={this.state.name} onChange={this.changeNameHandler}/>
                </div>
                <button type="button" className="btn btn-primary" onClick={this.submitHandler}> Save </button>
                </form>
            </div>
        )
    }
    
}