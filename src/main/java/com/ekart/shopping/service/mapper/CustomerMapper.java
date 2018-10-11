package com.ekart.shopping.service.mapper;

import com.ekart.shopping.domain.*;
import com.ekart.shopping.service.dto.CustomerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Customer and its DTO CustomerDTO.
 */
@Mapper(componentModel = "spring", uses = {AddressMapper.class, ContactMapper.class})
public interface CustomerMapper extends EntityMapper<CustomerDTO, Customer> {

    @Mapping(source = "billToAddress.id", target = "billToAddressId")
    @Mapping(source = "shipToAddress.id", target = "shipToAddressId")
    @Mapping(source = "contactDetails.id", target = "contactDetailsId")
    CustomerDTO toDto(Customer customer);

    @Mapping(source = "billToAddressId", target = "billToAddress")
    @Mapping(source = "shipToAddressId", target = "shipToAddress")
    @Mapping(source = "contactDetailsId", target = "contactDetails")
    Customer toEntity(CustomerDTO customerDTO);

    default Customer fromId(Long id) {
        if (id == null) {
            return null;
        }
        Customer customer = new Customer();
        customer.setId(id);
        return customer;
    }
}
