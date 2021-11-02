import React, { useState } from "react";
import { useHistory } from "react-router";
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
  item: {
    padding: theme.spacing(1.2),
  },
  paginator: {
    justifyContent: "center",
    padding: "10px",
  },
}));

export default function StockList() {
  let history = useHistory();
  const classes = useStyles();
  const itemsPerPage = 10;
  let [page, setPage] = useState(1);
  let [noOfPages] = useState(Math.ceil(window.allStocks.length / itemsPerPage));
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleClick = (event) => {
    let id = event.currentTarget.id;
    let name = event.currentTarget.getAttribute("name")
    console.log(event.currentTarget);
    window.stockName = name
    console.log(window.stockName);
    history.push(`/stock/${id}`);
  };

  return (
    <>
      <List dense compoent='span'>
        {window.allStocks
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((ele) => {
            let stockName = ele.enname;
            let stockCode = ele.tsCode;
            let stockExchange = ele.exchange;
            return (
              <>
                <ListItem
                  id={`${ele.sid}`}
                  name = {`${ele.enname}`}
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
      <Box>
      <Pagination
          count={noOfPages}
          page={page}
          onChange={handleChange}
          defaultPage={1}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
          classes={{ ul: classes.paginator }}
        />
      </Box>
    </>
  );
}
