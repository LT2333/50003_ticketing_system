package com.example.lutong.esc01.Week10.ESC_Project_Testing;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TestAdmin {
    //For Sign up--Admin
    static String getUnRegisteredUsername = "HandsomeDuckkkk";
    static String unRegisteredEmail = "HandsomeDuck@accenture.com";
    static String unRegisteredPassword = "Escproject@9";

    //For Login
//    static String unRegisteredEmail = "georgee@accenture.com";
//    static String unRegisteredPassword = "test";
    public static void main(String[] args) throws InterruptedException {
        System.setProperty("webdriver.chrome.driver","C:\\Users\\User\\Driver_Selenium\\Chrome\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, 5);  //Wait at most 5s
        //Start from the Homepage
        driver.get("http://localhost:3000");
        // maximize the browser window
        driver.manage().window().maximize();
        Thread.sleep(1000);

        //Go to Sign up
        WebElement SignUp = driver.findElement(By.linkText("Sign Up"));
        SignUp.click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Register')]")));  //Wait until it navigates to sign-up page
        //TODO: Test Sign up page (As Admin)
        WebElement enter_username = driver.findElement(By.name("username"));
        enter_username.sendKeys(getUnRegisteredUsername);
        Thread.sleep(1000);
        WebElement enter_unregisteredEmail = driver.findElement(By.name("email"));
        enter_unregisteredEmail.sendKeys(unRegisteredEmail);
        Thread.sleep(1000);
        WebElement enter_unregisteredPassword = driver.findElement(By.name("password"));
        enter_unregisteredPassword.sendKeys(unRegisteredPassword);
        Thread.sleep(1000);
        WebElement enter_SecondUnregisteredEmail = driver.findElement(By.name("secondpass"));
        enter_SecondUnregisteredEmail.sendKeys(unRegisteredPassword);
        Thread.sleep(1000);

        WebElement ButtonRegister = driver.findElement(By.xpath("//Button[contains(.,'Register')]"));
        Thread.sleep(1000);
        ButtonRegister.click();
        Thread.sleep(5000);

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
        Thread.sleep(3000);
        LoginEmail.sendKeys(unRegisteredEmail);

        WebElement LoginPassword = driver.findElement(By.name("password"));
        Thread.sleep(3000);
       LoginPassword.sendKeys(unRegisteredPassword);

        WebElement ButtonLogin = driver.findElement(By.xpath("//Button[contains(.,'Login')]"));
        Thread.sleep(3000);
        ButtonLogin.click();


        //TODO: Test ViewRequests for Admin

        //sort by who
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Sort by who')]")));
        WebElement Sort_Priority = driver.findElement(By.xpath("//Button[contains(.,'Sort by who')]"));
        Sort_Priority.click();
        Thread.sleep(5000);
        System.out.println("Yes");

        //sort by date
        wait.until(ExpectedConditions.elementToBeClickable(By.id("viewdate")));
        WebElement Sort_Date = driver.findElement(By.id("viewdate"));
        Sort_Date.click();
        Thread.sleep(5000);
        System.out.println("Yes");

        //Print all the meassages/ requests
        java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
        for (int i = 0; i < links.size(); i=i+1) {
            System.out.println(i + " " + links.get(i).getText());
            System.out.println(i + " " + links.get(i).getAttribute("href"));
        }

        //Choose a task
        wait.until(ExpectedConditions.elementToBeClickable(By.id("myLinks")));
        WebElement mylinks = driver.findElement(By.id("myLinks"));

        Thread.sleep(5000);
        mylinks.click();

        //TODO: Take a task
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Take it')]")));
        WebElement ButtonTakeIt = driver.findElement(By.xpath("//Button[contains(.,'Take it')]"));
        ButtonTakeIt.click();

        //Go back to view all the message
//        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Take it')]")));
//        WebElement ButtonGoBack = driver.findElement(By.xpath("//Button[contains(.,'Take it')]"));
//        ButtonGoBack.click();

        //View my jobs - to check for update
        wait.until(ExpectedConditions.elementToBeClickable(By.id("adminview")));
        WebElement View_My_job = driver.findElement(By.id("adminview"));
        View_My_job.click();
        Thread.sleep(5000);


    }
}
