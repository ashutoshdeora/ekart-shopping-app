package com.ekart.shopping.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Customer entity.
 */
public class CustomerDTO implements Serializable {

    private Long id;

    private String customerName;

    private Long customerCategory;

    private String userId;

    private String creditRating;

    private Long billToAddressId;

    private Long shipToAddressId;

    private Long contactDetailsId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public Long getCustomerCategory() {
        return customerCategory;
    }

    public void setCustomerCategory(Long customerCategory) {
        this.customerCategory = customerCategory;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCreditRating() {
        return creditRating;
    }

    public void setCreditRating(String creditRating) {
        this.creditRating = creditRating;
    }

    public Long getBillToAddressId() {
        return billToAddressId;
    }

    public void setBillToAddressId(Long addressId) {
        this.billToAddressId = addressId;
    }

    public Long getShipToAddressId() {
        return shipToAddressId;
    }

    public void setShipToAddressId(Long addressId) {
        this.shipToAddressId = addressId;
    }

    public Long getContactDetailsId() {
        return contactDetailsId;
    }

    public void setContactDetailsId(Long contactId) {
        this.contactDetailsId = contactId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerDTO customerDTO = (CustomerDTO) o;
        if (customerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerDTO{" +
            "id=" + getId() +
            ", customerName='" + getCustomerName() + "'" +
            ", customerCategory=" + getCustomerCategory() +
            ", userId='" + getUserId() + "'" +
            ", creditRating='" + getCreditRating() + "'" +
            ", billToAddress=" + getBillToAddressId() +
            ", shipToAddress=" + getShipToAddressId() +
            ", contactDetails=" + getContactDetailsId() +
            "}";
    }
}
