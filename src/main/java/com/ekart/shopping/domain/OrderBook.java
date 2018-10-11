package com.ekart.shopping.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A OrderBook.
 */
@Entity
@Table(name = "order_book")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OrderBook implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "order_date")
    private LocalDate orderDate;

    @Column(name = "total_price")
    private Float totalPrice;

    @Column(name = "discount")
    private String discount;

    @Column(name = "price_after_discount")
    private Float priceAfterDiscount;

    @Column(name = "order_status")
    private String orderStatus;

    @OneToOne    @JoinColumn(unique = true)
    private Customer customer;

    @OneToOne    @JoinColumn(unique = true)
    private Address deliveryAddress;

    @OneToMany(mappedBy = "orderBook")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OrderLine> orderLineItems = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public OrderBook orderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
        return this;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public OrderBook totalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getDiscount() {
        return discount;
    }

    public OrderBook discount(String discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(String discount) {
        this.discount = discount;
    }

    public Float getPriceAfterDiscount() {
        return priceAfterDiscount;
    }

    public OrderBook priceAfterDiscount(Float priceAfterDiscount) {
        this.priceAfterDiscount = priceAfterDiscount;
        return this;
    }

    public void setPriceAfterDiscount(Float priceAfterDiscount) {
        this.priceAfterDiscount = priceAfterDiscount;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public OrderBook orderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
        return this;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Customer getCustomer() {
        return customer;
    }

    public OrderBook customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Address getDeliveryAddress() {
        return deliveryAddress;
    }

    public OrderBook deliveryAddress(Address address) {
        this.deliveryAddress = address;
        return this;
    }

    public void setDeliveryAddress(Address address) {
        this.deliveryAddress = address;
    }

    public Set<OrderLine> getOrderLineItems() {
        return orderLineItems;
    }

    public OrderBook orderLineItems(Set<OrderLine> orderLines) {
        this.orderLineItems = orderLines;
        return this;
    }

    public OrderBook addOrderLineItem(OrderLine orderLine) {
        this.orderLineItems.add(orderLine);
        orderLine.setOrderBook(this);
        return this;
    }

    public OrderBook removeOrderLineItem(OrderLine orderLine) {
        this.orderLineItems.remove(orderLine);
        orderLine.setOrderBook(null);
        return this;
    }

    public void setOrderLineItems(Set<OrderLine> orderLines) {
        this.orderLineItems = orderLines;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        OrderBook orderBook = (OrderBook) o;
        if (orderBook.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderBook.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderBook{" +
            "id=" + getId() +
            ", orderDate='" + getOrderDate() + "'" +
            ", totalPrice=" + getTotalPrice() +
            ", discount='" + getDiscount() + "'" +
            ", priceAfterDiscount=" + getPriceAfterDiscount() +
            ", orderStatus='" + getOrderStatus() + "'" +
            "}";
    }
}
