package com.ekart.shopping.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Notification entity.
 */
public class NotificationDTO implements Serializable {

    private Long id;

    private LocalDate notificationDate;

    private Float notificationStatus;

    private String reciepentAddress;

    private String notificationBody;

    private Long orderDetailsId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getNotificationDate() {
        return notificationDate;
    }

    public void setNotificationDate(LocalDate notificationDate) {
        this.notificationDate = notificationDate;
    }

    public Float getNotificationStatus() {
        return notificationStatus;
    }

    public void setNotificationStatus(Float notificationStatus) {
        this.notificationStatus = notificationStatus;
    }

    public String getReciepentAddress() {
        return reciepentAddress;
    }

    public void setReciepentAddress(String reciepentAddress) {
        this.reciepentAddress = reciepentAddress;
    }

    public String getNotificationBody() {
        return notificationBody;
    }

    public void setNotificationBody(String notificationBody) {
        this.notificationBody = notificationBody;
    }

    public Long getOrderDetailsId() {
        return orderDetailsId;
    }

    public void setOrderDetailsId(Long orderBookId) {
        this.orderDetailsId = orderBookId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        NotificationDTO notificationDTO = (NotificationDTO) o;
        if (notificationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), notificationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NotificationDTO{" +
            "id=" + getId() +
            ", notificationDate='" + getNotificationDate() + "'" +
            ", notificationStatus=" + getNotificationStatus() +
            ", reciepentAddress='" + getReciepentAddress() + "'" +
            ", notificationBody='" + getNotificationBody() + "'" +
            ", orderDetails=" + getOrderDetailsId() +
            "}";
    }
}
