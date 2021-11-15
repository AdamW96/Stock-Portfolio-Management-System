package unsw_9900.nobugs.dto;

import java.util.Date;

public class stockRankDto{

    private Integer sid;

    private Date tradeTime;

    private Double closedPrice;

    private Double currentPrice;

    private Double rate;

    private String symbol;

    private String enName;

    private Double priceDif;

    public Integer getSid() {
        return sid;
    }

    public void setSid(Integer sid) {
        this.sid = sid;
    }

    public Date getTradeTime() {
        return this.tradeTime;
    }

    public void setTradeTime(Date tradeTime) {
        this.tradeTime = tradeTime;
    }

    public Double getClosedPrice() {
        return this.closedPrice;
    }

    public void setClosedPrice(Double price) {
        this.closedPrice = price;
    }

    public Double getCurrentPrice() {
        return this.currentPrice;
    }

    public void setCurrentPrice(Double price) {this.currentPrice = price; }

    public Double getRate() {
        return this.rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public Double getPriceDif() {
        return this.priceDif;
    }

    public void setPriceDif(Double priceDif) {
        this.priceDif = priceDif;
    }

    public String getSymbol(){ return this.symbol; }

    public void setSymbol(String symbol) { this.symbol = symbol;}

    public String getEnName(){ return this.enName; }

    public void setEnName(String enName) { this.enName = enName;}

}

