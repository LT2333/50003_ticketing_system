package com.example.lutong.esc01.Week10.ESC_Project_Testing;


import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.math.BigInteger;

public class MultiUserSignUp {

    public static final int numberOfUsers = 22;

    static String UnRegisteredUsername = "HungryDuckkkkDuckkkk";
    static String unRegisteredEmail = "HungryDuckkkk@gmail.com";
    static String unRegisteredPassword = "Escproject9";

    public static void main(String[] args) {

        SignUp[] Signups = new SignUp[numberOfUsers];

        for (int i = 0; i < numberOfUsers; i++) {
            Signups[i] = new SignUp(UnRegisteredUsername,unRegisteredEmail,unRegisteredPassword);
            Signups[i].start();
        }

        for (int i = 0; i< numberOfUsers;i++){
            try {
                Signups[i].join();

            } catch (InterruptedException e) {
                System.out.println("some thread is not finished");
                e.printStackTrace();
            }
    }



}

static class SignUp extends Thread{
     String UnRegisteredUsername ;
     String unRegisteredEmail ;
     String unRegisteredPassword ;


    public SignUp(String myUnRegisteredUsername, String myunRegisteredEmail, String myunRegisteredPassword ){
        UnRegisteredUsername = myUnRegisteredUsername;
        unRegisteredEmail = myunRegisteredEmail;
        unRegisteredPassword = myunRegisteredPassword;
    }

    public void run(){

        System.setProperty("webdriver.chrome.driver","C:\\Users\\User\\Driver_Selenium\\Chrome\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, 5);  //Wait at most 5s
        //Start from the Homepage
        driver.get("http://localhost:3000");
        // maximize the browser window
        driver.manage().window().maximize();
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        //Go to Sign up
        WebElement SignUp = driver.findElement(By.linkText("Sign Up"));
        SignUp.click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//Button[contains(.,'Register')]")));  //Wait until it navigates to sign-up page
        WebElement enter_username = driver.findElement(By.name("username"));
        enter_username.sendKeys(UnRegisteredUsername);
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        WebElement enter_unregisteredEmail = driver.findElement(By.name("email"));
        enter_unregisteredEmail.sendKeys(unRegisteredEmail);
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        WebElement enter_unregisteredPassword = driver.findElement(By.name("password"));
        enter_unregisteredPassword.sendKeys(unRegisteredPassword);
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        WebElement enter_SecondUnregisteredEmail = driver.findElement(By.name("secondpass"));
        enter_SecondUnregisteredEmail.sendKeys(unRegisteredPassword);
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    }


}