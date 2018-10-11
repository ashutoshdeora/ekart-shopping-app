package com.ekart.shopping.service.mapper;

import com.ekart.shopping.domain.*;
import com.ekart.shopping.service.dto.OrderLineDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrderLine and its DTO OrderLineDTO.
 */
@Mapper(componentModel = "spring", uses = {OrderBookMapper.class, ProductMapper.class})
public interface OrderLineMapper extends EntityMapper<OrderLineDTO, OrderLine> {

    @Mapping(source = "orderBook.id", target = "orderBookId")
    @Mapping(source = "item.id", target = "itemId")
    OrderLineDTO toDto(OrderLine orderLine);

    @Mapping(source = "orderBookId", target = "orderBook")
    @Mapping(source = "itemId", target = "item")
    OrderLine toEntity(OrderLineDTO orderLineDTO);

    default OrderLine fromId(Long id) {
        if (id == null) {
            return null;
        }
        OrderLine orderLine = new OrderLine();
        orderLine.setId(id);
        return orderLine;
    }
}
