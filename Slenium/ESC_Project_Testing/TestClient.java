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
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.Select;

public class TestClient {
        //For Sign up--Client
    static String getUnRegisteredUsername = "PrettyDuckkkk";
    static String unRegisteredEmail = "PrettyDuckkkk@gmail.com";
    static String unRegisteredPassword = "Escproject@9";

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

        //TODO: Testing Login  (As Client)
        WebElement LoginEmail = driver.findElement(By.name("email"));
        Thread.sleep(3000);
        LoginEmail.sendKeys(unRegisteredEmail);

        WebElement LoginPassword = driver.findElement(By.name("password"));
        Thread.sleep(3000);
        LoginPassword.sendKeys(unRegisteredPassword);

        WebElement ButtonLogin = driver.findElement(By.xpath("//Button[contains(.,'Login')]"));
        Thread.sleep(3000);
        ButtonLogin.click();


//        //Click on "New user? Register here!" ----Under Login page
//        wait.until(ExpectedConditions.elementToBeClickable(By.linkText("New user? Register here!"))); //wait until it navigates to sign-up page
//
//        WebElement SignUpHeadear = driver.findElement(By.linkText("New user? Register here!"));
//        SignUpHeadear.click();
//        //Click on "Contact Us"
//        WebElement ContactUs = driver.findElement(By.linkText("Contact Us"));
//        ContactUs.click();

        //TODO: Test ContactUs for Client
        WebElement ContactUs = driver.findElement(By.linkText("Contact Us"));
        ContactUs.click();


        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Submit Now!')]")));
        WebElement ContactUsName = ((ChromeDriver) driver).findElementByName("name");
        ContactUsName.sendKeys("PrettyDuckkkk");
        Thread.sleep(1000);
        WebElement ContactUsEmail = ((ChromeDriver) driver).findElementByName("email");
        ContactUsEmail.sendKeys(unRegisteredEmail);
        Thread.sleep(1000);
        WebElement ContactUsContactNum = driver.findElement(By.name("contactnum"));
        ContactUsContactNum.sendKeys("82222110");
        WebElement ContactUsTitle = driver.findElement(By.name("title"));
        ContactUsTitle.sendKeys("help");
        WebElement ContactUsDescription = driver.findElement(By.name("problem"));
        ContactUsDescription.sendKeys("Yes");
        //ContactUsDescription.sendKeys("I have a problem with my API service request that I could not solve. When can you get back to me with save me an answer. This is not so urgent");

        //wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Submit Now!')]")));
      //WebElement ContactUsTopic = driver.findElement(By.xpath("//Select[@id='ContactUsTopic']"));
        //System.out.println("Yes");
      //Actions act = new Actions(driver);

      //act.moveToElement(ContactUsTopic).click().build().perform();

      //act.click(ContactUsTopic).moveByOffset(0,4).click(ContactUsTopic).build().perform();

////        Select ContactUsTopic2 = new Select(ContactUsTopic);
////        ContactUsTopic2.selectByVisibleText("API DevOps");

//        Select ContactUsTopic2 = new Select(driver.findElement(By.xpath("//select[contains(@id,'ContactUsTopic')]")));
//        System.out.println("yes");

//        //ContactUsTopic2.selectByVisibleText("API DevOps");
//        wait.until(ExpectedConditions.elementToBeClickable(By.id("ContactUsTopic")));
//       WebElement selectList= driver.findElement(By.id("ContactUsTopic"));
//        Actions keyDown = new Actions(driver);
//        keyDown.sendKeys(Keys.chord(Keys.DOWN, Keys.DOWN)).perform();
        //keyDown.sendKeys(Keys.chord("API DevOps")).perform();

//        System.out.println(selectList.getTagName());
//        //Select select = new Select(selectList);
//        System.out.println("yes");
//        //select.selectByVisibleText("API DevOps");
//

        WebElement SumitButton = driver.findElement(By.xpath("//Button[contains(.,'Submit Now!')]"));
        Actions act = new Actions(driver);
        SumitButton.click();


//        Select ContactUsTopic2 = new Select(driver.findElement(By.id("ContactUsTopic")));
//        //ContactUsTopic.deselectByVisibleText("API DevOps");
//        ContactUsTopic2.selectByIndex(2);
//        System.out.println(ContactUsTopic2.getOptions());

        //TODO: Test ViewRequest for Client


    }
}
