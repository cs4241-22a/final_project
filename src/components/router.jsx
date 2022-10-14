import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Account from "../pages/account";
import CreateEvent from "../pages/createEvent";
import DisplayEvent from "../pages/displayEvent";
import Login from "../pages/login";

export default () => (
  <Routes>
    <Route path="/" element={<Login />} />

    <Route path="/event">
      <Route path=":eventName" element={<DisplayEvent />} />
      <Route path="new" element={<CreateEvent />} />
    </Route>

    <Route path="/user">
      <Route path=":id" element={<Account />} />
    </Route>

    <Route
      path="*"
      element={
        <div>
          <p>404: Page Not Found</p>
        </div>
      }
    />
  </Routes>
);
