const { clearTextInputValue, clickTopLeftCornerOfElement, scrollIntoViewSimple, setNewAddress, setNewAddressAndroid, setNewAddressIOS, simpleClick, selectClick, simpleTextInput, selectTextInput } = require('../utils');

const assert = require('assert');

const PAUSE_DURATION_MICROSECONDS = 1250;
const ANDROID_CONTEXT = 'WEBVIEW_org.wevote.cordova';
const IOS_CONTEXT = 'WEBVIEW_1';

describe('Basic cross-platform We Vote test',  () => {
  it('should load the app so we can run various tests', async () => {
    const { twitterUserName, twitterPassword } = driver.config;
    const { device, browserName, isAndroid, isCordovaFromAppStore, isMobileScreenSize, isIOS } = driver.config.capabilities;
    const WEB_APP_ROOT_URL = driver.config.webAppRootUrl;
    if (isCordovaFromAppStore) {
      // switch contexts and click through intro
      const contexts = await driver.getContexts();
      await browser.pause(PAUSE_DURATION_MICROSECONDS);
      const context = contexts.includes(ANDROID_CONTEXT) ? ANDROID_CONTEXT : IOS_CONTEXT;
      await browser.pause(PAUSE_DURATION_MICROSECONDS);
      await driver.switchContext(context);
      await browser.pause(PAUSE_DURATION_MICROSECONDS);
      await selectClick('div[data-index="0"] .intro-story__btn--bottom'); // Click first next button
      await selectClick('div[data-index="1"] .intro-story__btn--bottom'); // Click second next button
      await selectClick('div[data-index="2"] .intro-story__btn--bottom'); // Click third next button
    } else {
      // navigate browser to WeVote QA site
      await browser.url(`${WEB_APP_ROOT_URL}/ballot`);
      await browser.pause(PAUSE_DURATION_MICROSECONDS);
    }
    // //////////////////////
    // Sign in using Twitter, when in browser
    if (!isCordovaFromAppStore && twitterUserName && twitterPassword) {
      await simpleClick('signInHeaderBar'); // Clicks on Sign in
      await simpleClick('twitterSignIn-splitIconButton'); // Clicks on Twitter Sign in Button
      await simpleTextInput('username_or_email', twitterUserName); // Enter Username or Email id
      await simpleTextInput('password', twitterPassword); // Enter Password
      await simpleClick('allow'); // Clicks on Authorize App
//      const unusualLoginUsernameInput = await $('input[name="session[username_or_email]"]');
//      await browser.pause(PAUSE_DURATION_MICROSECONDS);
//      await unusualLoginUsernameInput.setValue(twitterUserName);
//      await browser.pause(PAUSE_DURATION_MICROSECONDS);
//      const unusualLoginPasswordInput = await $('input[name="session[password]"]');
//      await browser.pause(PAUSE_DURATION_MICROSECONDS);
//      await unusualLoginPasswordInput.setValue(twitterPassword);
//      await browser.pause(PAUSE_DURATION_MICROSECONDS);
//      const unusualLoginSubmit = await $('[data-testid="LoginForm_Login_Button"]');
//      await browser.pause(PAUSE_DURATION_MICROSECONDS);
//      await unusualLoginSubmit.click();
//      await browser.pause(PAUSE_DURATION_MICROSECONDS);
//      await simpleTextInput('challenge_response', ''); // Clicks on 'Confirmation Code'
//      await simpleClick('allow'); // Clicks on Authorize App
      await simpleClick('profileAvatarHeaderBar'); // Clicks on Setting
    }

    // //////////////////////
    // Test verification code for email
    await simpleClick('signInHeaderBar'); // Click Sign In 
    await simpleTextInput('enterVoterEmailAddress', 'test@gmail.com'); // Enter test email in input box
    await simpleClick('voterEmailAddressEntrySendCode'); // Click on Send Code
    await simpleClick('digit1'); // Focus on first input box for verification code
    await simpleTextInput('digit1', '0'); // Set value to 0-9
    await simpleClick('digit2'); // Focus on second input box for verification code
    await simpleTextInput('digit2', '1'); // Set value to 0-9
    await simpleClick('digit3'); // Focus on third input box for verification code
    await simpleTextInput('digit3', '2'); // Set value to 0-9
    await simpleClick('digit4'); // Focus on fourth input box for verification code
    await simpleTextInput('digit4', '3'); // Set value to 0-9
    await simpleClick('digit5'); // Focus on fifth input box for verification code
    await simpleTextInput('digit5', '4'); // Set value to 0-9
    await simpleClick('digit6'); // Focus on sixth input box for verification code
    await simpleTextInput('digit6', '5'); // Set value to 0-9
    await simpleClick('emailVerifyButton'); // Click verify
    await simpleClick('emailVerificationBackButton'); // Click back
    await simpleClick('profileCloseSignInModal'); // Click "X"
  });
});
