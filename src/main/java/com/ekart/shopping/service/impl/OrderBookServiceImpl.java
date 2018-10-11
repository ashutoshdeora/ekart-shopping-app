package com.ekart.shopping.service.impl;

import com.ekart.shopping.service.OrderBookService;
import com.ekart.shopping.domain.OrderBook;
import com.ekart.shopping.repository.OrderBookRepository;
import com.ekart.shopping.service.dto.OrderBookDTO;
import com.ekart.shopping.service.mapper.OrderBookMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing OrderBook.
 */
@Service
@Transactional
public class OrderBookServiceImpl implements OrderBookService {

    private final Logger log = LoggerFactory.getLogger(OrderBookServiceImpl.class);

    private final OrderBookRepository orderBookRepository;

    private final OrderBookMapper orderBookMapper;

    public OrderBookServiceImpl(OrderBookRepository orderBookRepository, OrderBookMapper orderBookMapper) {
        this.orderBookRepository = orderBookRepository;
        this.orderBookMapper = orderBookMapper;
    }

    /**
     * Save a orderBook.
     *
     * @param orderBookDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public OrderBookDTO save(OrderBookDTO orderBookDTO) {
        log.debug("Request to save OrderBook : {}", orderBookDTO);

        OrderBook orderBook = orderBookMapper.toEntity(orderBookDTO);
        orderBook = orderBookRepository.save(orderBook);
        return orderBookMapper.toDto(orderBook);
    }

    /**
     * Get all the orderBooks.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<OrderBookDTO> findAll() {
        log.debug("Request to get all OrderBooks");
        return orderBookRepository.findAll().stream()
            .map(orderBookMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one orderBook by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<OrderBookDTO> findOne(Long id) {
        log.debug("Request to get OrderBook : {}", id);
        return orderBookRepository.findById(id)
            .map(orderBookMapper::toDto);
    }

    /**
     * Delete the orderBook by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete OrderBook : {}", id);
        orderBookRepository.deleteById(id);
    }
}
