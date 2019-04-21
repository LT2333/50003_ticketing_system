package com.example.lutong.esc01.Week10.ESC_Project_Testing;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static com.example.lutong.esc01.Week10.ESC_Project_Testing.LogInWithIncorectPassword.RegisteredEmail;
import static com.example.lutong.esc01.Week10.ESC_Project_Testing.LogInWithIncorectPassword.WrongRegisteredPassword;

public class NotStrongPasswordSignUp {
    //TODO: As a client
    static String getUnRegisteredUsername = "CuteDuckkkk";
    static String unRegisteredEmail = "CuteDuckkkk@gmail.com";
    static String unRegisteredPassword = "Escproject9";

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
    }
}
