import React from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import {authToken} from "../../../../helper/authorization";

export default class OrderIndex extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            pageTitle: 'Order Management',
            orders:  [],
            search: {
                product: "",
                user: "",
                status: "",
            },
            offset: 0,
            limit: 5,
            pageCount: 0,
            orderCount: 0,
        }
    }

    componentDidMount() {
        this.loadDataFromServer();
    }

    loadDataFromServer = () => {
        axios.get(process.env.REACT_APP_API_HOST_URL+'/order/', {
            params: {
                search: this.state.search,
                limit: this.state.limit,
                offset: this.state.offset
            },
            headers: authToken()
        })
        .then((response) => {
            
            let totalData = response.data.count;

            this.setState(state => {
                state.orders = response.data.data;
                state.orderCount = totalData;
                state.pageCount = Math.ceil(totalData/this.state.limit);
                return state;
            });
        })
        .catch(err => err);
    }


    searchHandle = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        this.setState(state => {
            state.search[name] = value;
            return state;
        }, () =>{
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
            <div className = {'row'}> 
                <div className = {'col2'}>
                    <div className={'form-group'} >
                        <label>Product Name</label>
                        <input type={'text'} placeholder={'Product Name'}
                        name={'product'} value={this.state.search.product}
                        className={'form-control'} onChange={this.searchHandle}/>                        
                    </div>
                </div>
                <div className = {'col2'}>
                    <div className = {'form-group'}>
                        <label>Order By</label>
                        <input type={'text'} placeholder={'Order By'}
                        name={'user'} value={this.state.search.user}
                        className={'form-control'} onChange={this.searchHandle}/>
                    </div>
                </div>
            </div>
            <div className = "card-body">
            <div className = "card">
            <table className = {"table"}>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Order By</th>
                        <th>Status</th>
                    </tr>   
                </thead>
                <tbody>
                    {
                        this.state.orders.map((order, i)=>{
                            return(
                                <tr key = {i}>
                                   <td>{order.product ? order.product.name : ''}</td>
                                   <td>{order.user ? (order.user.firstName + " "+ order.user.lastName ) : '' }</td>
                                   <td>{order.status}</td>
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
    )}
}

