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

public class LogInWithIncorectPassword {
    //TODO: As Admin
    static String RegisteredEmail = "georgee@accenture.com";
    static String WrongRegisteredPassword = "Nottest";
    static String CorrectRegisteredPassword = "test";

    public static void main(String[] args) throws InterruptedException {
        System.setProperty("webdriver.chrome.driver","C:\\Users\\User\\Driver_Selenium\\Chrome\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, 5);  //Wait at most 5s
        //Start from the Homepage
        driver.get("http://localhost:3000");
        // maximize the browser window
        driver.manage().window().maximize();
        Thread.sleep(1000);

        WebElement LogIn = driver.findElement(By.linkText("Login"));
        LogIn.click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Login')]")));  //Wait until it navigates to log-in page

        //TODO: Testing Login  (As Admin)
        WebElement LoginEmail = driver.findElement(By.name("email"));
        Thread.sleep(3000);
        LoginEmail.sendKeys(RegisteredEmail);

        WebElement LoginPassword = driver.findElement(By.name("password"));
        Thread.sleep(3000);
        LoginPassword.sendKeys(WrongRegisteredPassword);

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
    }


}
