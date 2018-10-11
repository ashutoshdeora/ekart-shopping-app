package com.ekart.shopping.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Notification.
 */
@Entity
@Table(name = "notification")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "notification_date")
    private LocalDate notificationDate;

    @Column(name = "notification_status")
    private Float notificationStatus;

    @Column(name = "reciepent_address")
    private String reciepentAddress;

    @Column(name = "notification_body")
    private String notificationBody;

    @OneToOne    @JoinColumn(unique = true)
    private OrderBook orderDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getNotificationDate() {
        return notificationDate;
    }

    public Notification notificationDate(LocalDate notificationDate) {
        this.notificationDate = notificationDate;
        return this;
    }

    public void setNotificationDate(LocalDate notificationDate) {
        this.notificationDate = notificationDate;
    }

    public Float getNotificationStatus() {
        return notificationStatus;
    }

    public Notification notificationStatus(Float notificationStatus) {
        this.notificationStatus = notificationStatus;
        return this;
    }

    public void setNotificationStatus(Float notificationStatus) {
        this.notificationStatus = notificationStatus;
    }

    public String getReciepentAddress() {
        return reciepentAddress;
    }

    public Notification reciepentAddress(String reciepentAddress) {
        this.reciepentAddress = reciepentAddress;
        return this;
    }

    public void setReciepentAddress(String reciepentAddress) {
        this.reciepentAddress = reciepentAddress;
    }

    public String getNotificationBody() {
        return notificationBody;
    }

    public Notification notificationBody(String notificationBody) {
        this.notificationBody = notificationBody;
        return this;
    }

    public void setNotificationBody(String notificationBody) {
        this.notificationBody = notificationBody;
    }

    public OrderBook getOrderDetails() {
        return orderDetails;
    }

    public Notification orderDetails(OrderBook orderBook) {
        this.orderDetails = orderBook;
        return this;
    }

    public void setOrderDetails(OrderBook orderBook) {
        this.orderDetails = orderBook;
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
        Notification notification = (Notification) o;
        if (notification.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), notification.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Notification{" +
            "id=" + getId() +
            ", notificationDate='" + getNotificationDate() + "'" +
            ", notificationStatus=" + getNotificationStatus() +
            ", reciepentAddress='" + getReciepentAddress() + "'" +
            ", notificationBody='" + getNotificationBody() + "'" +
            "}";
    }
}
