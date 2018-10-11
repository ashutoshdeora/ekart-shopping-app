package com.ekart.shopping.service.mapper;

import com.ekart.shopping.domain.*;
import com.ekart.shopping.service.dto.OrderBookDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrderBook and its DTO OrderBookDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class, AddressMapper.class})
public interface OrderBookMapper extends EntityMapper<OrderBookDTO, OrderBook> {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "deliveryAddress.id", target = "deliveryAddressId")
    OrderBookDTO toDto(OrderBook orderBook);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(source = "deliveryAddressId", target = "deliveryAddress")
    @Mapping(target = "orderLineItems", ignore = true)
    OrderBook toEntity(OrderBookDTO orderBookDTO);

    default OrderBook fromId(Long id) {
        if (id == null) {
            return null;
        }
        OrderBook orderBook = new OrderBook();
        orderBook.setId(id);
        return orderBook;
    }
}
