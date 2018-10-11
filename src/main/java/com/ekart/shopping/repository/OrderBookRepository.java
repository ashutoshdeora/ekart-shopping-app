package com.ekart.shopping.repository;

import com.ekart.shopping.domain.OrderBook;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OrderBook entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderBookRepository extends JpaRepository<OrderBook, Long> {

}
