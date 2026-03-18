---
title: 0WM — AP configuration
lang: en
description: 0WM project
---

# 0WM Access Point (AP) Configuration

Setting up an AP first requires… an AP! If you do not have a spare AP available, we provide a mock AP to debug and develop 0WM more easily.

### Using a mock AP[](https://github.com/lab0-cc/0WM-AP-Mock){target="_blank"}

We provide a mock AP emulating results fetched from a live Zyxel NWA50AX. See the [0WM-AP-Mock repository](https://github.com/lab0-cc/0WM-AP-Mock) for details on how to run it.

### Using an actual AP (OpenWRT)[](https://github.com/lab0-cc/0WM-AP-OpenWRT){target="_blank"}

The 0WM client assumes that the AP will be connected to a mobile device via Ethernet, while the latter is connected to the 0WM server. To achieve this, we configure the AP in such a way that its Unique Local Address (and only it!) is advertised and, to ensure the AP can easily be found, we advertise it with Multicast DNS (mDNS). We recommend calling your AP `ap`; it then becomes available through the mDNS name `ap.local`.

Assuming you have some familiarity with OpenWRT, we provide files in the [0WM-AP-OpenWRT repository](https://github.com/lab0-cc/0WM-AP-OpenWRT) to properly configure your AP, along with CGI scripts that the 0WM client expects to call.

The approach works on a wide variety of OSes and platforms, except on Android, which, 30 years after its initial draft, still does not support IPv6. To get Android support, you have to root your device and manually inject a priority route to your AP through your wired interface (see our [dedicated guide](client.md) for details).
