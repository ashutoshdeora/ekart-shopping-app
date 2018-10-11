package com.ekart.shopping.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ekart.shopping.service.OrderBookService;
import com.ekart.shopping.web.rest.errors.BadRequestAlertException;
import com.ekart.shopping.web.rest.util.HeaderUtil;
import com.ekart.shopping.service.dto.OrderBookDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing OrderBook.
 */
@RestController
@RequestMapping("/api")
public class OrderBookResource {

    private final Logger log = LoggerFactory.getLogger(OrderBookResource.class);

    private static final String ENTITY_NAME = "orderBook";

    private final OrderBookService orderBookService;

    public OrderBookResource(OrderBookService orderBookService) {
        this.orderBookService = orderBookService;
    }

    /**
     * POST  /order-books : Create a new orderBook.
     *
     * @param orderBookDTO the orderBookDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderBookDTO, or with status 400 (Bad Request) if the orderBook has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-books")
    @Timed
    public ResponseEntity<OrderBookDTO> createOrderBook(@RequestBody OrderBookDTO orderBookDTO) throws URISyntaxException {
        log.debug("REST request to save OrderBook : {}", orderBookDTO);
        if (orderBookDTO.getId() != null) {
            throw new BadRequestAlertException("A new orderBook cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderBookDTO result = orderBookService.save(orderBookDTO);
        return ResponseEntity.created(new URI("/api/order-books/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-books : Updates an existing orderBook.
     *
     * @param orderBookDTO the orderBookDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderBookDTO,
     * or with status 400 (Bad Request) if the orderBookDTO is not valid,
     * or with status 500 (Internal Server Error) if the orderBookDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-books")
    @Timed
    public ResponseEntity<OrderBookDTO> updateOrderBook(@RequestBody OrderBookDTO orderBookDTO) throws URISyntaxException {
        log.debug("REST request to update OrderBook : {}", orderBookDTO);
        if (orderBookDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderBookDTO result = orderBookService.save(orderBookDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderBookDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-books : get all the orderBooks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of orderBooks in body
     */
    @GetMapping("/order-books")
    @Timed
    public List<OrderBookDTO> getAllOrderBooks() {
        log.debug("REST request to get all OrderBooks");
        return orderBookService.findAll();
    }

    /**
     * GET  /order-books/:id : get the "id" orderBook.
     *
     * @param id the id of the orderBookDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderBookDTO, or with status 404 (Not Found)
     */
    @GetMapping("/order-books/{id}")
    @Timed
    public ResponseEntity<OrderBookDTO> getOrderBook(@PathVariable Long id) {
        log.debug("REST request to get OrderBook : {}", id);
        Optional<OrderBookDTO> orderBookDTO = orderBookService.findOne(id);
        return ResponseUtil.wrapOrNotFound(orderBookDTO);
    }

    /**
     * DELETE  /order-books/:id : delete the "id" orderBook.
     *
     * @param id the id of the orderBookDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-books/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderBook(@PathVariable Long id) {
        log.debug("REST request to delete OrderBook : {}", id);
        orderBookService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
