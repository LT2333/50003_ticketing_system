package com.example.lutong.esc01.Week10.ESC_Project_Testing;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TestAdmin {
    //For Sign up--Admin
    static String getUnRegisteredUsername = "Glenn_Chia";
    static String unRegisteredEmail = "Glenn_Chia@accenture.com";
    static String unRegisteredPassword = "Escproject@9";

    //For Login
//    static String unRegisteredEmail = "georgee@accenture.com";
//    static String unRegisteredPassword = "test";
    public static void main(String[] args) throws InterruptedException {
        System.setProperty("webdriver.chrome.driver","C:\\Users\\User\\Driver_Selenium\\Chrome\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, 10);  //Wait at most 5s
        //Start from the Homepage
        driver.get("http://localhost:3000");
        // maximize the browser window
        driver.manage().window().maximize();
        Thread.sleep(1000);

//        //Go to Sign up
//        WebElement SignUp = driver.findElement(By.linkText("Sign Up"));
//        SignUp.click();
//        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Register')]")));  //Wait until it navigates to sign-up page
//        //TODO: Test Sign up page (As Admin)
//        WebElement enter_username = driver.findElement(By.name("username"));
//        enter_username.sendKeys(getUnRegisteredUsername);
//        Thread.sleep(1000);
//        WebElement enter_unregisteredEmail = driver.findElement(By.name("email"));
//        enter_unregisteredEmail.sendKeys(unRegisteredEmail);
//        Thread.sleep(1000);
//        WebElement enter_unregisteredPassword = driver.findElement(By.name("password"));
//        enter_unregisteredPassword.sendKeys(unRegisteredPassword);
//        Thread.sleep(1000);
//        WebElement enter_SecondUnregisteredEmail = driver.findElement(By.name("secondpass"));
//        enter_SecondUnregisteredEmail.sendKeys(unRegisteredPassword);
//        Thread.sleep(1000);
//
//        WebElement ButtonRegister = driver.findElement(By.xpath("//Button[contains(.,'Register')]"));
//        Thread.sleep(1000);
//        ButtonRegister.click();
//        Thread.sleep(5000);

        /*
        //Click on "New user? Register here!" ----Under Login page
        wait.until(ExpectedConditions.elementToBeClickable(By.linkText("New user? Register here!"))); //wait until it navigates to sign-up page

        WebElement SignUpHeadear = driver.findElement(By.linkText("New user? Register here!"));
        SignUpHeadear.click();
        //Click on "Contact Us"
        WebElement ContactUs = driver.findElement(By.linkText("Contact Us"));
        ContactUs.click();
*/
        // Go to LogIn page

        WebElement LogIn = driver.findElement(By.linkText("Login"));
        LogIn.click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Login')]")));  //Wait until it navigates to log-in page

        //TODO: Testing Login  (As Admin)
        WebElement LoginEmail = driver.findElement(By.name("email"));
        LoginEmail.sendKeys(unRegisteredEmail);

        WebElement LoginPassword = driver.findElement(By.name("password"));
        Thread.sleep(1000);
       LoginPassword.sendKeys(unRegisteredPassword);

        WebElement ButtonLogin = driver.findElement(By.xpath("//Button[contains(.,'Login')]"));
        ButtonLogin.click();
        Thread.sleep(3000);  //pause to view the choice
        driver.navigate().refresh();
        Thread.sleep(6000);

//        //TODO:Choose a team
//        Thread.sleep(3000);
//        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.id("API"))));
//        WebElement ButtonChooseJob = driver.findElement(By.id("API"));
//        ButtonChooseJob.click();


        //TODO: Test ViewRequests for Admin

//        //sort by who
//        Thread.sleep(5000);Keys.ENTER
//        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Sort by who')]")));
//        WebElement Sort_Priority = driver.findElement(By.xpath("//Button[contains(.,'Sort by who')]"));
//        System.out.println("Yes found sort by who");
//
//        Sort_Priority.click();



        //View all the unassigned tasks in my team
//        wait.until(ExpectedConditions.elementToBeClickable(By.id("team/unassigned")));
//        WebElement Sort_Date = driver.findElement(By.id("team/unassigned"));
//        Sort_Date.click();
//        Thread.sleep(5000);
//        System.out.println("Yes");
        wait.until(ExpectedConditions.elementToBeClickable(By.id("viewallunassigned")));
        WebElement View_all_unassigned = driver.findElement(By.id("viewallunassigned"));
        View_all_unassigned.click();
        Thread.sleep(5000);

        //Select a Filter
        wait.until(ExpectedConditions.elementToBeClickable(By.id("SelectFilter")));
        //Choose a filter
        WebElement dropDown = driver.findElement(By.id("SelectFilter"));
        dropDown.click();
        Thread.sleep(2200);
        Actions actions = new Actions(driver);
        //actions.sendKeys(Keys.ENTER).perform();
        actions.sendKeys(Keys.ARROW_DOWN).sendKeys(Keys.ARROW_DOWN).sendKeys(Keys.ENTER).perform();

        Thread.sleep(2000);

        //Print all the meassages/ requests
        java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
        for (int i = 0; i < links.size(); i=i+1) {
            System.out.println(i + " " + links.get(i).getText());
            System.out.println(i + " " + links.get(i).getAttribute("href"));
        }

        //Choose a task
        wait.until(ExpectedConditions.elementToBeClickable(By.id("myLinks")));
        WebElement mylinks = driver.findElement(By.id("myLinks"));
        mylinks.click();

        //TODO: Take a task
        Thread.sleep(5000);
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Take it')]")));
        WebElement ButtonTakeIt = driver.findElement(By.xpath("//Button[contains(.,'Take it')]"));
        ButtonTakeIt.click();
        Thread.sleep(2000);

        //Click to resume
        Actions actions2 = new Actions(driver);
        actions2.click().build().perform();
        Thread.sleep(2000);

        //TODO: Go back to view all the message
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Take it')]")));
        WebElement ButtonGoBack = driver.findElement(By.linkText("Back"));
        ButtonGoBack.click();

        //TODO: View my jobs - to check for update
        wait.until(ExpectedConditions.elementToBeClickable(By.id("adminview/uncompleteonly")));
        WebElement View_My_job = driver.findElement(By.id("adminview/uncompleteonly"));
        View_My_job.click();
        Thread.sleep(5000);



        //TODO: Chat with the client
        //Choose a task
        wait.until(ExpectedConditions.elementToBeClickable(By.id("myLinks")));
        WebElement mylinks2 = driver.findElement(By.id("myLinks"));
        mylinks2.click();
        //Go to chat board
        Thread.sleep(2000);
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Take it')]")));


        //TODO:Provide solution and click complete
        //Provide solution
        wait.until(ExpectedConditions.elementToBeClickable(By.name("chatInput")));
        WebElement chatInput = driver.findElement(By.name("chatInput"));
        chatInput.sendKeys("Hi! Could you take a screenshot of your XXX account? The problem could be solved through ...");
        WebElement ButtonSendChat = driver.findElement(By.xpath("//Button[contains(.,'Send')]"));
        ButtonSendChat.click();
        Thread.sleep(1000);
        chatInput.clear();
        Thread.sleep(4000);
        //click complete
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Complete')]")));
        WebElement ButtonCompelete = driver.findElement(By.xpath("//Button[contains(.,'Complete')]"));
        ButtonCompelete.click();
        //Submit summary
        wait.until(ExpectedConditions.elementToBeClickable(By.name("summary")));
        WebElement SummaryInput = driver.findElement(By.name("summary"));
        SummaryInput.sendKeys("The solution should be...");
        Thread.sleep(2000);
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Click to submit')]")));
        WebElement SubmitSummary = driver.findElement(By.xpath("//Button[contains(.,'Click to submit')]"));
        SubmitSummary.click();





    }
}
