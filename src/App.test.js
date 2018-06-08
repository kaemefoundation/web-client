import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import faker from "faker";
import puppeteer from "puppeteer";
import { auth0credentials } from "../testdata.js";
let page;
let browser;

const width = 1920;
const height = 1080;
const APP = "http://localhost:3000";
beforeAll(async () => {
	browser = await puppeteer.launch({
		headless: false,
		slowMo: 50,
		args: [`--window-size=${width},${height}`]
	});
	page = await browser.newPage();
	await page.setViewport({ width, height });
});
afterAll(() => {
	browser.close();
});

function success(promise) {
	return promise
		.then(r => {
			console.log("Succeed");
			return true;
		})
		.catch(err => {
			console.log("Error");
			return false;
		});
}

async function succeed(promise,description) {
	console.log(description);
	expect(await success(promise)).toBe(true);
}

test(
	"Log In to Kaeme",
	async () => {
		

		await page.goto("http://localhost:3000/");
		await page.waitForSelector(".red.button");

		const html = await page.$eval(".red.button", e => e.innerHTML);
		expect(html).toBe("Log in");

		const buttonClick = await page.click(".red.button");
		await page.waitFor(5000);
		await page.waitForSelector("input[name='email']");
		await succeed(page.type("input[name='email']",auth0credentials.email),'Email address type');
		const email = await page.$eval("input[name='email']",e=>e.value);
		console.log(email);
		await page.waitForSelector("input[name='password']");
		
		await succeed(page.type("input[name='password']",auth0credentials.password),'Password type');

		await page.click(".auth0-lock-submit");
		console.log("Returning back to Kaeme");
		await page.waitForSelector("a.item.logo");
		console.log("Back to Kaeme");

	},
	16000
);
test(
	"Test Orphanage Form",
	async () => {
		
		await page.goto("http://localhost:3000/orphanage");
		console.log("Browse to orphanage");
	},
	16000
);