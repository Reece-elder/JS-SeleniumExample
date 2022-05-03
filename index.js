// My first selenium test
// https://www.youtube.com/watch?v=fj0Ud16YJJw - useful vid!

// Config
// npm init
// npm i mocha selenium-webdriver chai
// Download the webdriver you want from selenium-webdriver and add it to your path (test if you can do `start chromedriver` in terminal and it opens up a terminal)

const {Builder, By, Key, util} = require("selenium-webdriver");

let driver;

const firstTest = async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://www.bing.com");

    let searchBar = await driver.findElement(By.id("sb_form_q"));

    await searchBar.sendKeys("Doughnut", Key.RETURN);

    await qaTesting();
}



firstTest();