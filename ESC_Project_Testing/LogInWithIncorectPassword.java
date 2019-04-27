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
    //TODO: As Client
    static String RegisteredEmail = "Kieran@gmail.com";
    static String CorrectRegisteredPassword = "Escproject@9";
    static String[] Password = {"lalala","Escproject@9Escproject@9","Es@9","Escproject@8",CorrectRegisteredPassword};


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

        //TODO: Test Login with wrong passwords (As Client)

        WebElement LoginEmail = driver.findElement(By.name("email"));
        LoginEmail.sendKeys(RegisteredEmail);

        for (int i=0; i < Password.length;i++){
            WebElement LoginPassword = driver.findElement(By.name("password"));
            LoginPassword.clear();
            Thread.sleep(1000);
            LoginPassword.sendKeys(Password[i]);

            WebElement ButtonLogin = driver.findElement(By.xpath("//Button[contains(.,'Login')]"));
            Thread.sleep(1000);
            ButtonLogin.click();

            try {
                WebDriverWait wait2 = new WebDriverWait(driver, 1);  //Wait at most 1s
                // wait only until the sort element becomes visible
                wait2.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Sort by who')]")));

            } catch (Exception NoSuchElementException) {
                System.out.println("login password invalid");
            }

        }


    }


}
