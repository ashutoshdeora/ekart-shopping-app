package com.ekart.shopping.cucumber.stepdefs;

import com.ekart.shopping.EkartshoppingappApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = EkartshoppingappApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
