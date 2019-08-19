// META: script=/resources/testharness.js
// META: script=/resources/testharnessreport.js
// META: script=/resources/testdriver.js
// META: script=/resources/testdriver-vendor.js
// META: script=/bluetooth/resources/bluetooth-helpers.js
'use strict';
const test_desc = 'A device that reconnects during the ' +
    'gattserverdisconnected event should still receive ' +
    'gattserverdisconnected events after re-connection.';

bluetooth_test(async () => {
  const {device, fake_peripheral} = await getConnectedHealthThermometerDevice();

  const onDisconnected = async () => {
    device.removeEventListener('gattserverdisconnected', onDisconnected);
    // 2. Reconnect.
    await fake_peripheral.setNextGATTConnectionResponse({
      code: HCI_SUCCESS,
    });
    await device.gatt.connect();

    // 3. Disconnect after reconnecting.
    const disconnectPromise =
        await eventPromise(device, 'gattserverdisconnected');
    fake_peripheral.simulateGATTDisconnection();
    await disconnectPromise;
  };
  device.addEventListener('gattserverdisconnected', onDisconnected);

  // 1. Disconnect.
  await fake_peripheral.simulateGATTDisconnection();
}, test_desc);
