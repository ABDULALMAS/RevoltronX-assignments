/* eslint-disable */
import React, {useEffect} from "react";
import {Pagination, PaginationItem} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { getArticles } from "../../actions/Articles";
 


interface Paginate {
  page: number | string;
  
}

const Paginate: React.FC<Paginate> = ({ page}) => { 
  const { numberOfPages } = useSelector((state: any) => state.articles);
    
    const dispatch = useDispatch();
    useEffect(() => {
    if(page) {
      dispatch<any>(getArticles(page));
    }
    }, [page]);


return ( 
    <Pagination 
    sx={{
      borderRadius: 4,
    marginTop: "1rem",
    padding: "16px",
    }}
     
      count={numberOfPages} 
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
         <PaginationItem  { ...item} component={Link} to={`/articles?page=${item.page}`} />
      )}
    />
) }

export default Paginate;