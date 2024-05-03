
// import axios from "axios";
// import { useQuery } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from './routes'

import React, { Fragment } from "react";
import DefaultComponent from "./Components/DefaultComponent/DefaultComponent";


export default function App() {

  // useEffect(() => {
  //   fetchApi()
  // }, [])
  
  // const fetchApi = async () => {
  //   const res = await axios.get(`${process.env.REACT_APP_API_KEY}/product/get-all`)
  //   return res.data
  // }

  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  // console.log("query", query)

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.path} path={route.path} element={(
                <Layout>
                  <Page />
                </Layout>
              )} />
            )
          })}
        </Routes>
      </Router>
    </div>
  );
}


