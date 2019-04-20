package com.example.lutong.esc01.Week10.ESC_Project_Testing;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TestClient_Login {
    //For Sign up--Client
    static String getUnRegisteredUsername = "PrettyDuckkkk";
    static String unRegisteredEmail = "PrettyDuckkkk@gmail.com";
    static String unRegisteredPassword = "Escproject@9";
    static String[] Password = {"Escproject@9Escproject@9","Es@9",unRegisteredPassword};

    //For Login
//    static String unRegisteredEmail = "mark@gmail.com";
//    static String unRegisteredPassword = "test";

    public static void main(String[] args) throws InterruptedException {
        System.setProperty("webdriver.chrome.driver","C:\\Users\\User\\Driver_Selenium\\Chrome\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, 7);  //Wait at most 5s
        //Start from the Homepage
        driver.get("http://localhost:3000");
        // maximize the browser window
        driver.manage().window().maximize();
        Thread.sleep(1000);

        //Go to Sign up
        WebElement SignUp = driver.findElement(By.linkText("Sign Up"));
        SignUp.click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Register')]")));  //Wait until it navigates to sign-up page
        //TODO: Test Sign up page (As Client)
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

        // Go to LogIn page
        //wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Login')]")));
        WebElement LogIn = driver.findElement(By.linkText("Login"));
        LogIn.click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Login')]")));  //Wait until it navigates to log-in page

//        //TODO: Testing Login  (As Client)
//        WebElement LoginEmail = driver.findElement(By.name("email"));
//        Thread.sleep(3000);
//        LoginEmail.sendKeys(unRegisteredEmail);
//
//        WebElement LoginPassword = driver.findElement(By.name("password"));
//        Thread.sleep(3000);
//        LoginPassword.sendKeys(unRegisteredPassword);
//
//        WebElement ButtonLogin = driver.findElement(By.xpath("//Button[contains(.,'Login')]"));
//        Thread.sleep(3000);
//        ButtonLogin.click();

        //TODO: Test Login with wrong passwords (As Client)

        WebElement LoginEmail = driver.findElement(By.name("email"));
        Thread.sleep(3000);
        LoginEmail.sendKeys(unRegisteredEmail);

        for (int i=0; i < Password.length;i++){
            WebElement LoginPassword = driver.findElement(By.name("password"));
            LoginPassword.clear();
            Thread.sleep(3000);
            LoginPassword.sendKeys(Password[i]);

            WebElement ButtonLogin = driver.findElement(By.xpath("//Button[contains(.,'Login')]"));
            Thread.sleep(3000);
            ButtonLogin.click();

            try {
                WebDriverWait wait2 = new WebDriverWait(driver, 1);  //Wait at most 2s
                // wait only until the sort element becomes visible
                wait2.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Sort by who')]")));

            } catch (Exception NoSuchElementException) {
                System.out.println("login password invalid");
            }

        }





//        //Click on "New user? Register here!" ----Under Login page
//        wait.until(ExpectedConditions.elementToBeClickable(By.linkText("New user? Register here!"))); //wait until it navigates to sign-up page
//
//        WebElement SignUpHeadear = driver.findElement(By.linkText("New user? Register here!"));
//        SignUpHeadear.click();
//        //Click on "Contact Us"
//        WebElement ContactUs = driver.findElement(By.linkText("Contact Us"));
//        ContactUs.click();

//        //TODO: Test ContactUs for Client
//        WebElement ContactUs = driver.findElement(By.linkText("Contact Us"));
//        ContactUs.click();
//
//        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Submit Now!')]")));
//        //key in Name
//        WebElement ContactUsName = ((ChromeDriver) driver).findElementByName("name");
//        ContactUsName.sendKeys("PrettyDuckkkk");
//        Thread.sleep(1000);
//        //Key in Email
//        WebElement ContactUsEmail = ((ChromeDriver) driver).findElementByName("email");
//        ContactUsEmail.sendKeys(unRegisteredEmail);
//        Thread.sleep(1000);
//        //Key in Contact Number
//        WebElement ContactUsContactNum = driver.findElement(By.name("contactnum"));
//        ContactUsContactNum.sendKeys("82222110");
//        //Key in title
//        WebElement ContactUsTitle = driver.findElement(By.name("title"));
//        ContactUsTitle.sendKeys("help");
//        //Key in description
//        WebElement ContactUsDescription = driver.findElement(By.name("problem"));
//        ContactUsDescription.sendKeys("I have a problem with my API service request that I could not solve. When can you get back to me with save me an answer. This is not so urgent");
//        //ContactUsDescription.sendKeys('print "<html>"\n print "Latest comment:"\n print database.latestComment\nprint "</html>"');
//
//        //Choose a topic
//        WebElement dropDown = driver.findElement(By.id("SelectOptions"));
//        dropDown.click();
//        Thread.sleep(2000);
//        Actions actions = new Actions(driver);
//        actions.sendKeys(Keys.ARROW_DOWN).sendKeys(Keys.ARROW_DOWN).
//                sendKeys(Keys.ARROW_DOWN).sendKeys(Keys.ARROW_DOWN).sendKeys(Keys.ENTER).perform();
//
//        //Choose a picture
//        WebElement FileUpload = driver.findElement(By.name("PrettyImage"));
//        FileUpload.sendKeys("C:\\Users\\User\\Desktop\\MongoDB_Attempt_Lutong\\API_screenshott.jpg");
//        //Submit
//        WebElement SumitButton = driver.findElement(By.xpath("//Button[contains(.,'Submit Now!')]"));
//        Actions act = new Actions(driver);
//        SumitButton.click();


        //TODO: Test ViewRequest for Client


    }
}
