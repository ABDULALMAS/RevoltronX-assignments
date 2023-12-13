import React, {useEffect} from "react";
import {Pagination, PaginationItem} from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { getArticles } from "../../actions/Articles";
 
import useStyles from "./styles";

const Paginate = ({ page}) => { 
  const { numberOfPages } = useSelector((state) => state.articles);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
    if(page) {
      dispatch(getArticles(page));
    }
    }, [page]);


return ( 
    <Pagination 
    className={classes.pagination}
      classes={{ul: classes.ul}}
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