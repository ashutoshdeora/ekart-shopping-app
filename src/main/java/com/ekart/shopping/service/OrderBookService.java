package com.ekart.shopping.service;

import com.ekart.shopping.service.dto.OrderBookDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing OrderBook.
 */
public interface OrderBookService {

    /**
     * Save a orderBook.
     *
     * @param orderBookDTO the entity to save
     * @return the persisted entity
     */
    OrderBookDTO save(OrderBookDTO orderBookDTO);

    /**
     * Get all the orderBooks.
     *
     * @return the list of entities
     */
    List<OrderBookDTO> findAll();


    /**
     * Get the "id" orderBook.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<OrderBookDTO> findOne(Long id);

    /**
     * Delete the "id" orderBook.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
