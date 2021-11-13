import { Card, Collapse, InputBase, makeStyles, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Link } from 'react-router-dom';
import stockService from '../services/stock-service';
import { Empty } from 'antd';
const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center'
  },
  searchbar: {
    width: '70%',
    padding: theme.spacing(1),
    borderRadius: theme.spacing(5),
    marginBottom: theme.spacing(2),
    position: 'absolute',
    zIndex: 100
  },
  input: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(2)
  },
  searchResults: {
    marginLeft: theme.spacing(1),
  },
  head: {
    fontFamily: 'Bungee',
    fontSize: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

  },
  rows: {
    "&:hover": {
      backgroundColor: '#eef2f2',
      transition: "all 0.3s ease-out",
      cursor: 'pointer'
    }
  },
  papers: {
    marginBottom: theme.spacing(3),
    width: "100%"
  },
  text: {
    fontFamily: 'Bungee',
    fontSize: theme.spacing(5),
    color: '#FF954A',
    marginLeft: theme.spacing(1),
  },
  rise: {
    backgroundColor: '#e1f2e7',
    padding: '3px 10px',
    borderRadius: theme.spacing(1),
    display: 'flex',
    alignContent: 'center',
    color: 'green',
    maxWidth: 'fit-content'
  },
  decline: {
    backgroundColor: '#fee5e3',
    padding: '3px 10px',
    borderRadius: theme.spacing(1),
    display: 'flex',
    alignContent: 'center',
    color: '#a50e0e',
    maxWidth: 'fit-content'
  },
  symbol: {
    display: 'flex'
  }
}))

export default function SearchBar({ }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState('');
  //先把搜索结果设置为a开头股票
  // stockService.stockSearchByName('a').then(res => setData(res.data))

  useEffect(() => {
    if (search) {
      stockService.stockSearchByName(search)
        // .then(res=>setData(res.data))
        .then(res => setResult((res.data.data)))
        .catch(err => console.log(err))
    } else{
      setExpanded(false)
    }
  }, [search])

  //  用于防抖，减少用户请求
  let t = null

  const handleInput = (e) => {
    if (expanded === false) {
      setExpanded(true)
    }

    if (e.target.value !== null) {
      clearTimeout(t)
    }
    t = setTimeout(() => setSearch(e.target.value), 500)
  }


  return (
    <div>
      <div className={classes.search} >
        <Card elevation={3} className={classes.searchbar} >
          <div className={classes.input}>
            <SearchIcon className={classes.icon} />
            <InputBase
              placeholder={"Search for stocks or companies"}
              style={{ width: '100%' }}
              onChange={handleInput}
              onClick={() => setExpanded(!expanded)}
            />
          </div>

          <Collapse in={expanded} className={classes.searchResults} >
            <div className={classes.head}>
              Symbols
            </div>

            {
              !result.length
                ? <Empty />
                : <TableContainer >
                  <Table size="small">
                    <TableBody>
                      {result && (<>
                        {result.map((stock) => (
                          <TableRow key={stock.symbol} className={classes.rows}>
                            <TableCell style={{ width: '10%' }} >
                              <Link to='' style={{ textDecoration: 'none', color: '#555' }}>
                                <div className={classes.symbol} >
                                  <Typography variant='subtitle2'>{stock.symbol}</Typography>
                                </div>
                              </Link>
                            </TableCell>
                            <TableCell align="left"><Typography variant='caption'>{stock.enname}</Typography></TableCell>
                            {/* <TableCell align="left">{stock.price}</TableCell> */}
                          </TableRow>
                        ))}
                      </>)}

                    </TableBody>
                  </Table>
                </TableContainer>


            }
          </Collapse>
        </Card>
      </div>
    </div>
  )
}
