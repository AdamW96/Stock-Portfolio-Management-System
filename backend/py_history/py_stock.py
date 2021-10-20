import sqlite3
import sys
import time
from datetime import datetime
from datetime import timedelta

import argparse
import tushare as ts

pro = ts.pro_api('881ddd8e044ca6f5ca1fb55dd720ec177fc1501af9aac377c79ce053')
stock_info_by_ts_code = {}
db_path = "./9900-test-db.sqlite"


def save_stock_info():
    df = pro.stock_basic(**{
        "ts_code": "",
        "name": "",
        "exchange": "",
        "market": "",
        "is_hs": "",
        "list_status": "",
        "limit": "",
        "offset": ""
    }, fields=[
        "ts_code",
        "symbol",
        "name",
        "area",
        "industry",
        "market",
        "list_date",
        "curr_type",
        "exchange",
        "enname",
        "fullname"
    ])

    conn = sqlite3.connect(db_path)

    for i in range(len(df)):
        data = df.iloc[i]
        day = datetime.strptime(data['list_date'], '%Y%m%d').strftime('%Y-%m-%d')

        insert_sql = "INSERT INTO stock_info\
        (ts_code, symbol, name, area, industry, fullname, enname, market, exchange, list_date) VALUES\
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"

        insert_data = (
            data['ts_code'], data['symbol'], data['name'], data['area'],
            data['industry'], data['fullname'], data['enname'], data['market'],
            data['exchange'], day
        )

        try:
            cur = conn.cursor()
            cur.execute(insert_sql, insert_data)
            conn.commit()
        except sqlite3.IntegrityError:
            pass
        except:
            print("Unexpected error when insert %s:", data.values, sys.exc_info())

    conn.close()


def get_stock_info_by_ts_code():
    stock_info = {}
    conn = sqlite3.connect(db_path)

    select_sql = "select sid, ts_code from stock_info;"
    cur = conn.cursor()
    cur.execute(select_sql)
    for result in cur:
        stock_info[result[1]] = {"sid": result[0]}

    conn.close()

    return stock_info


def save_trade_df(df):
    conn = sqlite3.connect(db_path)

    for i in range(len(df)):
        data = df.iloc[i]
        trade_date = datetime.strptime(data['trade_date'], '%Y%m%d').strftime('%Y-%m-%d')

        if data['ts_code'] not in stock_info_by_ts_code:
            continue

        insert_sql = "INSERT INTO market_history (sid, open_price, highest_price,\
        lowest_price, closed_price, turnover_vol, trade_date)\
        VALUES (?, ?, ?, ?, ?, ?, ?)"

        sid = stock_info_by_ts_code[data['ts_code']]['sid']
        insert_data = (sid, data['open'], data['high'], data['low'], data['close'], data['vol'], trade_date)

        try:
            cur = conn.cursor()
            cur.execute(insert_sql, insert_data)
            conn.commit()
        except sqlite3.IntegrityError:
            pass
        except:
            print("Unexpected error when insert %s:", data.values, sys.exc_info())

    conn.close()


def get_market_trade_date_list(start_date):
    cal = pro.trade_cal(exchange='', start_date=start_date)

    trade_date = []
    for i in range(len(cal)):
        if cal.iloc[i]['is_open']:
            date = datetime.strptime(cal.iloc[i]['cal_date'], '%Y%m%d').strftime('%Y-%m-%d')
            trade_date.append(date)

    return trade_date


def get_not_record_date(starter):
    compute_date_list = []
    trade_date = get_market_trade_date_list(starter)

    conn = sqlite3.connect(db_path)
    select_sql = "select trade_date from market_history group by trade_date"
    cur = conn.cursor()
    cur.execute(select_sql)
    data = [i[0] for i in cur]
    conn.close()

    start_date = datetime.strptime(starter, '%Y%m%d')
    date = start_date
    while date < datetime.now():
        date_str = date.strftime('%Y-%m-%d')
        if date_str not in data and date_str in trade_date:
            compute_date_list.append(date)

        date += timedelta(days=1)

    return compute_date_list


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--start", help="start date (format %Y%m%d)", default="20200101", type=str)
    parser.add_argument("--db", help="sqlite path", default="./9900-test-db.sqlite", type=str)
    args = parser.parse_args()

    print("=== sync history begin ===")

    global db_path
    db_path = args.db

    global stock_info_by_ts_code
    stock_info_by_ts_code = get_stock_info_by_ts_code()

    date_list = get_not_record_date(args.start)
    total = len(date_list)
    print("prepare to get %d days data" % total)

    count = 0
    for date in date_list:
        df = pro.daily(trade_date=date.strftime('%Y%m%d'))
        save_trade_df(df)
        count += 1
        time.sleep(0.15)
        print("finish save date = %s, processing(%s/%s)" % (date.strftime('%Y%m%d'), count, total))

    print("=== sync history finish ===")


if __name__ == '__main__':
    main()
