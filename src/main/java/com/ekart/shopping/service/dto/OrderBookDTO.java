package com.ekart.shopping.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the OrderBook entity.
 */
public class OrderBookDTO implements Serializable {

    private Long id;

    private LocalDate orderDate;

    private Float totalPrice;

    private String discount;

    private Float priceAfterDiscount;

    private String orderStatus;

    private Long customerId;

    private Long deliveryAddressId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getDiscount() {
        return discount;
    }

    public void setDiscount(String discount) {
        this.discount = discount;
    }

    public Float getPriceAfterDiscount() {
        return priceAfterDiscount;
    }

    public void setPriceAfterDiscount(Float priceAfterDiscount) {
        this.priceAfterDiscount = priceAfterDiscount;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getDeliveryAddressId() {
        return deliveryAddressId;
    }

    public void setDeliveryAddressId(Long addressId) {
        this.deliveryAddressId = addressId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OrderBookDTO orderBookDTO = (OrderBookDTO) o;
        if (orderBookDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderBookDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderBookDTO{" +
            "id=" + getId() +
            ", orderDate='" + getOrderDate() + "'" +
            ", totalPrice=" + getTotalPrice() +
            ", discount='" + getDiscount() + "'" +
            ", priceAfterDiscount=" + getPriceAfterDiscount() +
            ", orderStatus='" + getOrderStatus() + "'" +
            ", customer=" + getCustomerId() +
            ", deliveryAddress=" + getDeliveryAddressId() +
            "}";
    }
}
