import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  PrivateRoute,
  Home,
  LogIn,
  SignUp,
  Dashboard,
  SellerAccount,
  NotFound,
  NotAuthorized,
  StripeCallback,
  StripeCancel,
  StripeSucces,
  CreateHotel,
  UpdateHotel,
  getOneHotel,
  SearchResults,
} from "./allComponentsFiles";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/search-results" component={SearchResults} />
      <Route exact path="/" component={Home} />
      <Route exact path="/log-in" component={LogIn} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/hotel-detail/:hotelId" component={getOneHotel} />
      <PrivateRoute exact path="/account" component={Dashboard} />
      <PrivateRoute exact path="/sellerAccount" component={SellerAccount} />
      <PrivateRoute exact path="/addhotel" component={CreateHotel} />
      <PrivateRoute exact path="/stripe/callback" component={StripeCallback} />
      <PrivateRoute
        exact
        path="/update-hotel/:hotelId"
        component={UpdateHotel}
      />
      <PrivateRoute
        exact
        path="/stripe/success/:hotelId"
        component={StripeSucces}
      />
      <PrivateRoute exact path="/stripe/cancel" component={StripeCancel} />
      <Route exact path="/notAuthorized" component={NotAuthorized} />
      <Route exact path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
