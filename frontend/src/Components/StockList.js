import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import stockService from "../services/stock-service";
import {
  List,
  ListItem,
  makeStyles,
  Divider,
  Box,
  ListItemText,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({

  paginator: {
    padding: "5px",
    // width:'100%'
  },
}));

export default function StockList() {
  let history = useHistory();
  const classes = useStyles();
  const itemsPerPage = 10;
  let [page, setPage] = useState(1);
  let [allStocks, setAllStocks] = useState(null);
  let noOfPages;
  if (allStocks) {
    noOfPages = Math.ceil(allStocks.length / itemsPerPage);
  } else {
    noOfPages = 0;
  }
  useEffect(() => {
    stockService.getAllStock().then((response) => {
      setAllStocks(response.data.data);
    });
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleClick = (event) => {
    let id = event.currentTarget.id;
    let name = event.currentTarget.getAttribute("name");
    console.log(event.currentTarget);
    window.stockName = name;
    console.log(window.stockName);
    history.push(`/stock/${id}`);
  };

  return (
    <React.Fragment>
      {allStocks && (
        <>
          <Box>
            <Pagination
              count={noOfPages}
              page={page}
              onChange={handleChange}
              variant="outlined" 
              defaultPage={1}
              color='primary'
              size='medium'
              siblingCount={0}
              showFirstButton
              showLastButton
              classes={{ ul: classes.paginator }}
            />
          </Box>
          <List dense compoent='span'>
            {allStocks
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((ele) => {
                let stockName = ele.enname;
                let stockCode = ele.tsCode;
                let stockExchange = ele.exchange;
                return (
                  <>
                    <ListItem
                      id={`${ele.sid}`}
                      name={`${ele.enname}`}
                      button
                      className={classes.item}
                      onClick={handleClick}
                    >
                      <ListItemText
                        primary={`${stockName}`}
                        secondary={`stock code: ${stockCode}; stock exchange: ${stockExchange}`}
                      />
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
          </List>
        </>
      )}
      {!allStocks && (
        <></>
      )}
    </React.Fragment>
  );
}
