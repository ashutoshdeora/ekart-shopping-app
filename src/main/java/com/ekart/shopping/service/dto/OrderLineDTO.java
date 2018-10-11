package com.ekart.shopping.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the OrderLine entity.
 */
public class OrderLineDTO implements Serializable {

    private Long id;

    private Integer quantity;

    private Float rate;

    private Float totalPrice;

    private Float discount;

    private Long orderBookId;

    private Long itemId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Float getRate() {
        return rate;
    }

    public void setRate(Float rate) {
        this.rate = rate;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Float getDiscount() {
        return discount;
    }

    public void setDiscount(Float discount) {
        this.discount = discount;
    }

    public Long getOrderBookId() {
        return orderBookId;
    }

    public void setOrderBookId(Long orderBookId) {
        this.orderBookId = orderBookId;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long productId) {
        this.itemId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OrderLineDTO orderLineDTO = (OrderLineDTO) o;
        if (orderLineDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderLineDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderLineDTO{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", rate=" + getRate() +
            ", totalPrice=" + getTotalPrice() +
            ", discount=" + getDiscount() +
            ", orderBook=" + getOrderBookId() +
            ", item=" + getItemId() +
            "}";
    }
}
