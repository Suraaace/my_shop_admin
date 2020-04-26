import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Header, Footer} from "./templates/KmTemplate";
import history from "./helper/history";
import UserIndex from "./modules/user/UserIndex";
import OrderIndex from "./modules/order/OrderIndex";
import ProductIndex from "./modules/product/ProductIndex";
import CategoryIndex from "./modules/category/CategoryIndex";
import UserCreate from "./modules/user/UserCreate";
import ProductCreate from "./modules/product/ProductCreate";
import CategoryCreate from "./modules/category/CategoryCreate";

import {PublicRoute} from "./PublicRoutes";
import Alert from "./helper/alert";
// import Header from "./templates/Header";
// import Footer from "./templates/Footer";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };

    this.setGlobalMessage = this.setGlobalMessage.bind(this);
  }

  setGlobalMessage = () => {
    this.setState({message:"abc"});
  };

  render() {
    return(
      <Router history={history}>
        {/* Header Start */}

        <Header/>
        {/* Header Ends*/}

        {/* Body Starts*/}
        <div className={'container-fluid'}>
          <div className={'row'}>

            {/* Sidebar */}
            <div className={'col-2 sidebar-wrapper'}>
            <nav className="nav flex-column" style={ {backgroundColor: "#e8e8e8"}} >
              <Link to="/admin/user" className="nav-link">User Management</Link>
              <Link to="/admin/product" className="nav-link">Product Management</Link>
              <Link to="/admin/order" className="nav-link">Order Management</Link>
              <Link to="/admin/category" className="nav-link">Category Management</Link>

            </nav>
            </div>
            {/* Body */}
            <div className={'col-10 body-wrapper'}>

              { this.state.message &&
              <div className="alert alert-success" role="alert">
                <Alert messageTitle={'abcd message'} messageType={'danger'}/>
              </div>
              }
              <Switch>
                <PublicRoute exact path={'/admin/user'} component={UserIndex}/>
                <PublicRoute exact path={'/admin/user/create'} component={UserCreate}/>
                <PublicRoute exact path={'/admin/user/edit/:id'} component={UserCreate}/>

                <PublicRoute exact path={'/admin/product'} component={ProductIndex}/>
                <PublicRoute exact path={'/admin/product/create'} component={ProductCreate}/>
                <PublicRoute exact path={'/admin/product/edit/:id'} component={ProductCreate}/>

                <PublicRoute exact path={'/admin/category'} component={CategoryIndex}/>
                <PublicRoute exact path={'/admin/category/create'} component={CategoryCreate}/>
                <PublicRoute exact path={'/admin/category/edit/:id'} component={CategoryCreate}/>



                {/* <Route exact path="/product/create"> // other way to call route
                  <ProductCreate />
                </Route> */}
                <Route exact path="/admin/order">
                  <OrderIndex />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
        {/* Body Ends*/}

        {/*Footer Starts*/}
        <div className={'container-fluid'} style={{ backgroundColor: "#d2d2d2"}}>
          <div className={'row'} style={{'height': 200}}>
            <Footer/>
          </div>
        </div>
        {/* Footer Ends*/}
      </Router>
    );
  }

}

export default App;