package com.ekart.shopping.web.rest;

import com.ekart.shopping.EkartshoppingappApp;

import com.ekart.shopping.domain.OrderBook;
import com.ekart.shopping.repository.OrderBookRepository;
import com.ekart.shopping.service.OrderBookService;
import com.ekart.shopping.service.dto.OrderBookDTO;
import com.ekart.shopping.service.mapper.OrderBookMapper;
import com.ekart.shopping.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.ekart.shopping.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the OrderBookResource REST controller.
 *
 * @see OrderBookResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EkartshoppingappApp.class)
public class OrderBookResourceIntTest {

    private static final LocalDate DEFAULT_ORDER_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ORDER_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Float DEFAULT_TOTAL_PRICE = 1F;
    private static final Float UPDATED_TOTAL_PRICE = 2F;

    private static final String DEFAULT_DISCOUNT = "AAAAAAAAAA";
    private static final String UPDATED_DISCOUNT = "BBBBBBBBBB";

    private static final Float DEFAULT_PRICE_AFTER_DISCOUNT = 1F;
    private static final Float UPDATED_PRICE_AFTER_DISCOUNT = 2F;

    private static final String DEFAULT_ORDER_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_ORDER_STATUS = "BBBBBBBBBB";

    @Autowired
    private OrderBookRepository orderBookRepository;

    @Autowired
    private OrderBookMapper orderBookMapper;
    
    @Autowired
    private OrderBookService orderBookService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrderBookMockMvc;

    private OrderBook orderBook;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderBookResource orderBookResource = new OrderBookResource(orderBookService);
        this.restOrderBookMockMvc = MockMvcBuilders.standaloneSetup(orderBookResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrderBook createEntity(EntityManager em) {
        OrderBook orderBook = new OrderBook()
            .orderDate(DEFAULT_ORDER_DATE)
            .totalPrice(DEFAULT_TOTAL_PRICE)
            .discount(DEFAULT_DISCOUNT)
            .priceAfterDiscount(DEFAULT_PRICE_AFTER_DISCOUNT)
            .orderStatus(DEFAULT_ORDER_STATUS);
        return orderBook;
    }

    @Before
    public void initTest() {
        orderBook = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrderBook() throws Exception {
        int databaseSizeBeforeCreate = orderBookRepository.findAll().size();

        // Create the OrderBook
        OrderBookDTO orderBookDTO = orderBookMapper.toDto(orderBook);
        restOrderBookMockMvc.perform(post("/api/order-books")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderBookDTO)))
            .andExpect(status().isCreated());

        // Validate the OrderBook in the database
        List<OrderBook> orderBookList = orderBookRepository.findAll();
        assertThat(orderBookList).hasSize(databaseSizeBeforeCreate + 1);
        OrderBook testOrderBook = orderBookList.get(orderBookList.size() - 1);
        assertThat(testOrderBook.getOrderDate()).isEqualTo(DEFAULT_ORDER_DATE);
        assertThat(testOrderBook.getTotalPrice()).isEqualTo(DEFAULT_TOTAL_PRICE);
        assertThat(testOrderBook.getDiscount()).isEqualTo(DEFAULT_DISCOUNT);
        assertThat(testOrderBook.getPriceAfterDiscount()).isEqualTo(DEFAULT_PRICE_AFTER_DISCOUNT);
        assertThat(testOrderBook.getOrderStatus()).isEqualTo(DEFAULT_ORDER_STATUS);
    }

    @Test
    @Transactional
    public void createOrderBookWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderBookRepository.findAll().size();

        // Create the OrderBook with an existing ID
        orderBook.setId(1L);
        OrderBookDTO orderBookDTO = orderBookMapper.toDto(orderBook);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderBookMockMvc.perform(post("/api/order-books")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderBookDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OrderBook in the database
        List<OrderBook> orderBookList = orderBookRepository.findAll();
        assertThat(orderBookList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOrderBooks() throws Exception {
        // Initialize the database
        orderBookRepository.saveAndFlush(orderBook);

        // Get all the orderBookList
        restOrderBookMockMvc.perform(get("/api/order-books?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderBook.getId().intValue())))
            .andExpect(jsonPath("$.[*].orderDate").value(hasItem(DEFAULT_ORDER_DATE.toString())))
            .andExpect(jsonPath("$.[*].totalPrice").value(hasItem(DEFAULT_TOTAL_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].discount").value(hasItem(DEFAULT_DISCOUNT.toString())))
            .andExpect(jsonPath("$.[*].priceAfterDiscount").value(hasItem(DEFAULT_PRICE_AFTER_DISCOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].orderStatus").value(hasItem(DEFAULT_ORDER_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getOrderBook() throws Exception {
        // Initialize the database
        orderBookRepository.saveAndFlush(orderBook);

        // Get the orderBook
        restOrderBookMockMvc.perform(get("/api/order-books/{id}", orderBook.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderBook.getId().intValue()))
            .andExpect(jsonPath("$.orderDate").value(DEFAULT_ORDER_DATE.toString()))
            .andExpect(jsonPath("$.totalPrice").value(DEFAULT_TOTAL_PRICE.doubleValue()))
            .andExpect(jsonPath("$.discount").value(DEFAULT_DISCOUNT.toString()))
            .andExpect(jsonPath("$.priceAfterDiscount").value(DEFAULT_PRICE_AFTER_DISCOUNT.doubleValue()))
            .andExpect(jsonPath("$.orderStatus").value(DEFAULT_ORDER_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrderBook() throws Exception {
        // Get the orderBook
        restOrderBookMockMvc.perform(get("/api/order-books/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrderBook() throws Exception {
        // Initialize the database
        orderBookRepository.saveAndFlush(orderBook);

        int databaseSizeBeforeUpdate = orderBookRepository.findAll().size();

        // Update the orderBook
        OrderBook updatedOrderBook = orderBookRepository.findById(orderBook.getId()).get();
        // Disconnect from session so that the updates on updatedOrderBook are not directly saved in db
        em.detach(updatedOrderBook);
        updatedOrderBook
            .orderDate(UPDATED_ORDER_DATE)
            .totalPrice(UPDATED_TOTAL_PRICE)
            .discount(UPDATED_DISCOUNT)
            .priceAfterDiscount(UPDATED_PRICE_AFTER_DISCOUNT)
            .orderStatus(UPDATED_ORDER_STATUS);
        OrderBookDTO orderBookDTO = orderBookMapper.toDto(updatedOrderBook);

        restOrderBookMockMvc.perform(put("/api/order-books")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderBookDTO)))
            .andExpect(status().isOk());

        // Validate the OrderBook in the database
        List<OrderBook> orderBookList = orderBookRepository.findAll();
        assertThat(orderBookList).hasSize(databaseSizeBeforeUpdate);
        OrderBook testOrderBook = orderBookList.get(orderBookList.size() - 1);
        assertThat(testOrderBook.getOrderDate()).isEqualTo(UPDATED_ORDER_DATE);
        assertThat(testOrderBook.getTotalPrice()).isEqualTo(UPDATED_TOTAL_PRICE);
        assertThat(testOrderBook.getDiscount()).isEqualTo(UPDATED_DISCOUNT);
        assertThat(testOrderBook.getPriceAfterDiscount()).isEqualTo(UPDATED_PRICE_AFTER_DISCOUNT);
        assertThat(testOrderBook.getOrderStatus()).isEqualTo(UPDATED_ORDER_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingOrderBook() throws Exception {
        int databaseSizeBeforeUpdate = orderBookRepository.findAll().size();

        // Create the OrderBook
        OrderBookDTO orderBookDTO = orderBookMapper.toDto(orderBook);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrderBookMockMvc.perform(put("/api/order-books")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderBookDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OrderBook in the database
        List<OrderBook> orderBookList = orderBookRepository.findAll();
        assertThat(orderBookList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrderBook() throws Exception {
        // Initialize the database
        orderBookRepository.saveAndFlush(orderBook);

        int databaseSizeBeforeDelete = orderBookRepository.findAll().size();

        // Get the orderBook
        restOrderBookMockMvc.perform(delete("/api/order-books/{id}", orderBook.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrderBook> orderBookList = orderBookRepository.findAll();
        assertThat(orderBookList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderBook.class);
        OrderBook orderBook1 = new OrderBook();
        orderBook1.setId(1L);
        OrderBook orderBook2 = new OrderBook();
        orderBook2.setId(orderBook1.getId());
        assertThat(orderBook1).isEqualTo(orderBook2);
        orderBook2.setId(2L);
        assertThat(orderBook1).isNotEqualTo(orderBook2);
        orderBook1.setId(null);
        assertThat(orderBook1).isNotEqualTo(orderBook2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderBookDTO.class);
        OrderBookDTO orderBookDTO1 = new OrderBookDTO();
        orderBookDTO1.setId(1L);
        OrderBookDTO orderBookDTO2 = new OrderBookDTO();
        assertThat(orderBookDTO1).isNotEqualTo(orderBookDTO2);
        orderBookDTO2.setId(orderBookDTO1.getId());
        assertThat(orderBookDTO1).isEqualTo(orderBookDTO2);
        orderBookDTO2.setId(2L);
        assertThat(orderBookDTO1).isNotEqualTo(orderBookDTO2);
        orderBookDTO1.setId(null);
        assertThat(orderBookDTO1).isNotEqualTo(orderBookDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(orderBookMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(orderBookMapper.fromId(null)).isNull();
    }
}
