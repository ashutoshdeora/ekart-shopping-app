package com.ekart.shopping.service.mapper;

import com.ekart.shopping.domain.*;
import com.ekart.shopping.service.dto.NotificationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Notification and its DTO NotificationDTO.
 */
@Mapper(componentModel = "spring", uses = {OrderBookMapper.class})
public interface NotificationMapper extends EntityMapper<NotificationDTO, Notification> {

    @Mapping(source = "orderDetails.id", target = "orderDetailsId")
    NotificationDTO toDto(Notification notification);

    @Mapping(source = "orderDetailsId", target = "orderDetails")
    Notification toEntity(NotificationDTO notificationDTO);

    default Notification fromId(Long id) {
        if (id == null) {
            return null;
        }
        Notification notification = new Notification();
        notification.setId(id);
        return notification;
    }
}
