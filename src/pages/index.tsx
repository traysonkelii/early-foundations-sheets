import Navbar from '@/components/Navbar';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Home from './home';

const IndexPage = () => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('/api/sheets');
  //     const json = await response.json();

  //     console.log(json)

  //     setData(json.data);
  //   };

  //   fetchData();
  // }, []);

  // return (
  //   <div>
  //     {data.map((row, index) => (
  //       <div key={index}>
  //         {row.map((cell, cellIndex) => (
  //           <span key={cellIndex}>{cell}</span>
  //         ))}
  //       </div>
  //     ))}
  //   </div>
  // );
  return (
   <>
   <Home />
   </>
   
  )
};

export default IndexPage;