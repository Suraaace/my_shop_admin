import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import history from "../../../../helper/history";
import ReactPaginate from 'react-paginate';
import {authToken} from "../../../../helper/authorization";



export default class ProductIndex extends React.Component{ // exporting and defing at the same time
// class ProductIndex extends React.Component{ 

    constructor(props) {
        super(props);

        this.state = {
            offset:0,
            limit: 5,
            pageCount: 0,
            pageTitle: 'Product Management',
            products: [],
            productCount: 0,
            search: {
                name: "",
                price: "",
                category: "",
            }
        }
    }

    componentDidMount() {
        this.loadDataFromServer();
    }

    handleDelete = (id) => {
        axios.delete(process.env.REACT_APP_API_HOST_URL+'/product/delete/'+id)
            .then((response) => {
                this.loadDataFromServer();
            })
            .catch(err => err);
    };

    loadDataFromServer = ()=>{
        // API call to fetch list of product in Nodejs
        axios.get(process.env.REACT_APP_API_HOST_URL+'/product/',{
            headers: authToken(),
            params: {
                limit: this.state.limit,
                offset: this.state.offset,
                category: this.state.search.category,
                search: this.state.search
            }
        })
        .then((response) => {
            let totalData = response.data.count;

            this.setState(state => {
                state.products = response.data.data;
                state.productCount = totalData;
                state.pageCount = Math.ceil(totalData/this.state.limit);
                return state;  // returns back the value 
                });
        })
        .catch(err => err);
    };


    searchHandle = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        this.setState(state=> {
            state.search[name] = value;
            return state;
        }, ()=>{
            this.loadDataFromServer();
        })
    };


    handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.state.limit);

        this.setState({ offset: offset }, () => {
            this.loadDataFromServer();
        });
    };


    render() {
        return(
            <div>
                <h2>{this.state.pageTitle}</h2>
                <div className={'row'}>
                    <div className={'col2'}>
                        <div className={'form-group'}>
                            <label> Product Name </label>
                            <input type={'text'} placeholder={'Product Name'}
                            name={'name'} value={this.state.search.name}
                            className={'form-control'} onChange={this.searchHandle} />
                        </div>
                    </div> 
                    <div className={'col2'}>
                        <div className={'form-group'}>  
                            <label>Product Price</label> 
                            <input type={'text'} placeholder={'Product Price'}
                            name={'price'} value={this.state.search.price}
                            className={'form-control'} onChange={this.searchHandle} />
                        </div>

                    </div>
                </div> 

                <Link to="/admin/product/create" className="btn btn-primary float-right">Create Product</Link>
                <div className="card-body">
                <h5 className="card-title">Products({this.state.productCount})</h5>
                <div className="card">
                <table className={"table"}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Featured</th>
                        <th>Popular</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.products.map((product,i)=>{
                                return(
                                    <tr key ={i}>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category ? product.category.name : ''}</td>
                                        <td>{product.isFeatured === 1 ? 'Yes' : 'No'}</td>
                                        <td>{product.isPopular === 1 ? 'Yes' : 'No'}</td>
                                        <td> <Link to={'/admin/product/edit/'+ product._id}>Edit</Link></td>
                                        <td> <button type={'button'} onClick={()=>this.handleDelete(product._id)} 
                                            className={'btn btn-danger'}>Delete</button> 
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

// export default ProductIndex;