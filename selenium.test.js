const {Builder, By, Key, util} = require("selenium-webdriver");
const { expect } = require('chai');

describe('Testing Bing', function() {
    this.timeout(10000);

    let driver;

    // Makes a new driver window before each test
    beforeEach(async function() {
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().setTimeouts({ implicit: 5000 });
    })

    // Closes the driver after each test
    afterEach(async function(){
        driver.close();
    })


    it('Should search for Doughnut and print this to the screen', async function() {

        // Arrange
        // Tells driver to go to Bing.com website
        driver.get("https://www.bing.com");

        let searchBar; // <- Element to enter search string into
        let searchElement; // <-- The element we're looking for on the search page
        let searchText; // <-- The string of what we searched for

        // Act
        // Finding the search bar by id
        searchBar = driver.findElement(By.id("sb_form_q"));

        // Selecting the search bar and sending the string 'Doughnut' then pressing 'return'
        await searchBar.sendKeys("Doughnut", Key.RETURN);

        // Using await to wait until our driver resolves the promise (page loads fully)
        // Finding an element by xpath to use
        searchElement = await driver.findElement(By.xpath("/html/body/div[2]/main/div[2]/div/div/div/div/div/div/a[1]/div[2]/span[1]"));

        // getText() returns a promise so using await to wait until it is resolved, saving the string value of the element
        searchText = await searchElement.getText(); 

        // Assert
        // Checking the value of the string
        await expect(searchText).to.equal("Doughnut");

    });

    it('should contain a header saying NEWS', async function(){

        // Arrange


        // Going to the BBC page
        driver.get("https://www.bbc.co.uk/");

        // Declaring my variables before accessing them
        let headerElement;
        let headerText;

        // Act
        // Finding the element I am interested in
        headerElement = await driver.findElement(By.xpath("/html/body/div/div/header/div[3]/div/div/div/div/div"));

        // Saving the getText() value of the element
        headerText = await headerElement.getText();

        // Assert
    
        expect(headerText).to.equal("Welcome to the BBC");
    })

    it('Should have a nav bar containing Home and War in Ukraine etc when selecting news', async function(){

        // Arrange
        driver.get("https://www.bbc.co.uk/");

        let newsButton;
        let newsNavElement1;
        let nav1Text;

        // Act
        newsButton = await driver.findElement(By.xpath("/html/body/div/div/header/div[2]/nav/div[1]/div/div[1]/ul[2]/li[4]/a"));

        await newsButton.click();

        newsNavElement1 = await driver.findElement(By.xpath("/html/body/div[8]/header/div[2]/div[2]/div[1]/nav/ul/li[1]/a/span"));

        nav1Text = await newsNavElement1.getText();
        console.log(nav1Text);

        // Assert
        expect(nav1Text).to.equal("England");
    })
})