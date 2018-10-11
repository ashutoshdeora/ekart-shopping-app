package com.ekart.shopping.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * The Customer entity.
 */
@ApiModel(description = "The Customer entity.")
@Entity
@Table(name = "customer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "customer_category")
    private Long customerCategory;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "credit_rating")
    private String creditRating;

    @OneToOne    @JoinColumn(unique = true)
    private Address billToAddress;

    @OneToOne    @JoinColumn(unique = true)
    private Address shipToAddress;

    @OneToOne    @JoinColumn(unique = true)
    private Contact contactDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public Customer customerName(String customerName) {
        this.customerName = customerName;
        return this;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public Long getCustomerCategory() {
        return customerCategory;
    }

    public Customer customerCategory(Long customerCategory) {
        this.customerCategory = customerCategory;
        return this;
    }

    public void setCustomerCategory(Long customerCategory) {
        this.customerCategory = customerCategory;
    }

    public String getUserId() {
        return userId;
    }

    public Customer userId(String userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCreditRating() {
        return creditRating;
    }

    public Customer creditRating(String creditRating) {
        this.creditRating = creditRating;
        return this;
    }

    public void setCreditRating(String creditRating) {
        this.creditRating = creditRating;
    }

    public Address getBillToAddress() {
        return billToAddress;
    }

    public Customer billToAddress(Address address) {
        this.billToAddress = address;
        return this;
    }

    public void setBillToAddress(Address address) {
        this.billToAddress = address;
    }

    public Address getShipToAddress() {
        return shipToAddress;
    }

    public Customer shipToAddress(Address address) {
        this.shipToAddress = address;
        return this;
    }

    public void setShipToAddress(Address address) {
        this.shipToAddress = address;
    }

    public Contact getContactDetails() {
        return contactDetails;
    }

    public Customer contactDetails(Contact contact) {
        this.contactDetails = contact;
        return this;
    }

    public void setContactDetails(Contact contact) {
        this.contactDetails = contact;
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
        Customer customer = (Customer) o;
        if (customer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", customerName='" + getCustomerName() + "'" +
            ", customerCategory=" + getCustomerCategory() +
            ", userId='" + getUserId() + "'" +
            ", creditRating='" + getCreditRating() + "'" +
            "}";
    }
}
