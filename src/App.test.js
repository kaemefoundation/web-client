import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import faker from 'faker';
import puppeteer from 'puppeteer';

test('h1 loads correctly', async () => {
let browser = await puppeteer.launch({
  headless: false,
  slowmo: 80
});
let page = await browser.newPage();

await page.goto('http://localhost:3000/');
await page.waitForSelector('.red.button');

const html = await page.$eval('.red.button', e => e.innerHTML);
expect(html).toBe('Log in');

const buttonClick = await page.click('.red.button');
await page.waitForSelector('auth0-lock-submit');

browser.close();
}, 16000);

