const { _android: android } = require('playwright');

(async () => {
  const [device] = await android.devices();
  const context = await device.launchBrowser({ args: ['--enable-automation'] });
  await context.setGeolocation({ latitude: 48.451959, longitude: -5.139625, accuracy: 10 });

  const page = await context.newPage();
  await page.goto('http://client', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'img/client-home-1.png' });

  await page.getByText('Click here').click();
  const radio0 = page.getByText('radio0');
  await radio0.waitFor();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'img/client-home-2.png' });

  await radio0.waitFor({ state: 'hidden' });
  await page.screenshot({ path: 'img/client-survey-1.png' });

  const miniMap = page.locator('mini-map');
  await miniMap.click();
  await page.screenshot({ path: 'img/client-edit-1.png' });

  await page.getByText('No map selected').click();
  const floorplan = page.getByText('Floorplan 1');
  await floorplan.waitFor();
  await page.screenshot({ path: 'img/client-edit-2.png' });

  await floorplan.click();
  await page.screenshot({ path: 'img/client-edit-3.png' });

  await page.getByText('Auto-place').click();
  await page.screenshot({ path: 'img/client-edit-4.png' });

  await page.locator('label[for="mode-1"]').click();
  await page.screenshot({ path: 'img/client-edit-5.png' });

  await page.getByText('Edit').click();
  await page.screenshot({ path: 'img/client-edit-6.png' });

  const bb = await miniMap.boundingBox();
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: bb.x+100, y: bb.y+100 }] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: bb.x+300, y: bb.y+200 }] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await cdp.detach();
  await page.screenshot({ path: 'img/client-edit-7.png' });

  await page.getByText('Ok').click();
  await page.screenshot({ path: 'img/client-edit-8.png' });

  await page.locator('.top-bar .close').click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'img/client-survey-2.png' });

  await page.getByText('SCAN').dispatchEvent('click');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'img/client-survey-3.png' });

  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'img/client-survey-4.png' });

  await page.close();
  await context.close();
  await device.close();
})();
