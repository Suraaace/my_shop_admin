import React from "react";
import axios from "axios";
import history from "../../../../helper/history";
import Select from "react-dropdown-select";
import {authToken} from "../../../../helper/authorization";


export default class ProductCreate extends React.Component{

    constructor(props){
        super(props);

        this.state= {
            product: {
                name: "",
                description: "",
                price: "",
                category: "",
                isFeatured: "",
                isPopular: ""
            },
            categories: [],
            booleanOption: [
                {_id: 1, name: "Yes"},
                {_id: 0, name: "No"},
            ]
        };
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        if(id) {
            axios.get(process.env.REACT_APP_API_HOST_URL+'/product/'+id, {
                headers: authToken()
            })
                .then((response) => {
                    this.setState(state => {

                       state.product.name = response.data.data.name;
                       state.product.description = response.data.data.description;
                       state.product.price = response.data.data.price;
                       state.product.isFeatured = response.data.data.isFeatured;
                       state.product.isPopular = response.data.data.isPopular;
                       state.product.category = response.data.data.category;

                       return state;

                    });
                })
                .catch(err => err);
        }

        axios.get(process.env.REACT_APP_API_HOST_URL+'/category/', {
            headers: authToken()
        })
            .then((response) => {
                this.setState({
                    categories: response.data.data,
                });
            })
            .catch(err => err);
    }

    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState(state => {
            state.product[name] = value;
            return state;
        });
    };

    handleSelectedOption = (selectedOption, name) => {
        this.setState(state => {
            state.product[name] = selectedOption[0]._id;
            return state;
        });
    };

    submitHandler = () => {

        let id = this.props.match.params.id;
        if(id) {
            axios.post(process.env.REACT_APP_API_HOST_URL+'/product/update/'+id, this.state.product, {
                headers: authToken()
            })
            .then((response) => {
                history.push('/admin/product');
            })
        } else {
        axios.post(process.env.REACT_APP_API_HOST_URL+'/product/create', this.state.product, {
            headers: authToken()
        })
            .then((response) => {
                history.push('/admin/product');
            })
        }
    };
    
    render(){
        return(
            <div>
               <form>
                   <div className="form-group">
                       <label htmlFor="productName">Name</label>
                       <input type="text" className="form-control" placeholder="Product Name" name={'name'} value={this.state.product.name} onChange={this.handleChange} />
                   </div>
                    <div className="form-group">
                        <label htmlFor="productDescription">Description</label>
                        <input type="text" className="form-control" placeholder="Product Description" name={'description'} value={this.state.product.description} onChange={this.handleChange}/>
                    </div>    
                    <div className="form-group">
                        <label htmlFor="productPrice">Price</label>
                        <input type="text" className="form-control" placeholder="Product Price" name={'price'} value={this.state.product.price} onChange={this.handleChange}/>
                    </div>
                   <div className="form-group">
                       <label htmlFor="productDescription">Category</label>
                       <Select
                           labelField={'name'}
                           valueField={'_id'}
                           options={this.state.categories}
                           values={[this.state.categories.find(opt => opt._id === this.state.product.category) || {}]}
                           onChange={(values) => this.handleSelectedOption(values, 'category')} />
                   </div>
                    <div className="form-group">
                        <label htmlFor="isPopular">Popular</label>
                        <Select
                            labelField={'name'}
                            valueField={'_id'}
                            onChange={values => this.handleSelectedOption(values, 'isPopular')}
                            options={this.state.booleanOption}
                            values={[this.state.booleanOption.find(opt => opt._id === this.state.product.isPopular) || {}]} />
                    </div>

                   <div className="form-group">
                       <label htmlFor="isFeatured">Featured</label>
                       <Select
                           labelField={'name'}
                           valueField={'_id'}
                           onChange={values => this.handleSelectedOption(values, 'isFeatured')}
                           options={this.state.booleanOption}
                           values={[this.state.booleanOption.find(opt => opt._id === this.state.product.isFeatured) || {}]} />
                   </div>

                   <button type="button" className="btn btn-primary" onClick={this.submitHandler}>Save</button>
               </form>
            </div>
        )
    }
}
