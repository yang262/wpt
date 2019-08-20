// META: script=/resources/testharness.js
// META: script=/resources/testharnessreport.js
// META: script=/resources/testdriver.js
// META: script=/resources/testdriver-vendor.js
// META: script=/bluetooth/resources/bluetooth-helpers.js
// Generated by //third_party/WebKit/LayoutTests/bluetooth/generate.py
'use strict';
const test_desc = 'Wrong Service name. Reject with TypeError.';
const expected = new DOMException(
    'Failed to execute \'getPrimaryServices\' on ' +
        '\'BluetoothRemoteGATTServer\': Invalid Service name: ' +
        '\'wrong_name\'. It must be a valid UUID alias (e.g. 0x1234), ' +
        'UUID (lowercase hex characters e.g. ' +
        '\'00001234-0000-1000-8000-00805f9b34fb\'), ' +
        'or recognized standard name from ' +
        'https://www.bluetooth.com/specifications/gatt/services' +
        ' e.g. \'alert_notification\'.',
    'TypeError');

bluetooth_test(
    () => getConnectedHealthThermometerDevice().then(
        ({device}) => assert_promise_rejects_with_message(
            device.gatt.getPrimaryServices('wrong_name'), expected,
            'Wrong Service name passed.')),
    test_desc);
