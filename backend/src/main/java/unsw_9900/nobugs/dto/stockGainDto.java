package unsw_9900.nobugs.po;

import java.util.Date;

/**
 * Copyright (C) 2020 - 2021 ruiwang14.com, All Rights Reserved.
 * <p>
 *
 * @author: Rui
 * @date: 2021/10/31
 */
public class stockGainDto {


    private Integer sid;

    private Double lot;

    private Double oldPrice;

    private Double newPrice;

    private Double rateOfReturn;


    public Integer getSid() {
        return sid;
    }

    public void setSid(Integer sid) {
        this.sid = sid;
    }

    public Double getLot() {
        return lot;
    }

    public void setLot(Double lot) {
        this.lot = lot;
    }

    public Double getOldPrice() {
        return this.oldPrice;
    }

    public void setOldPrice(Double price) {
        this.oldPrice = price;
    }

    public Double getNewPrice() {
        return this.newPrice;
    }

    public void setNewPrice(Double price) {
        this.newPrice = price;
    }

    public Double getRate() {
        return this.rateOfReturn;
    }

    public void setRate(Double rateOfReturn) {
        this.rateOfReturn = rateOfReturn;
    }
}