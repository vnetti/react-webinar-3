import {Route, Routes} from "react-router-dom";
import Main from "./main";
import Product from "./product";
import React from "react";

export function Router() {
  return (
    <Routes>
      <Route path={'/'} element={<Main/>}/>
      <Route path={'/products/:id'} element={<Product/>}/>

      <Route path={'*'} element={<div>Page not found</div>}/>
    </Routes>
  )
}