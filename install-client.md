---
title: 0WM — Client installation guide
lang: en
description: Installation guide for the 0WM mobile client
p-install-client: true
sp-install: true
---

::: audience
**Target audience** Web administrators [Website installation](#website-installation), phone administrators [Platform configuration](#platform-configuration)
:::

# Introduction

0WM Client is the mobile survey frontend for 0WM. It uses WebXR to track the device’s movement and combines that information with Wi-Fi scan data fetched from an access point. Depending on the mobile device used, [additional configuration](#client-configuration) may be needed. The project is not officially released, therefore its distribution channels are rather scarce at the moment. That being said, 0WM Client only consists of static HTML/JS code and does not need to be built.

# Website installation

We support two ways of installing the 0WM client:

* With one of our [nightly Debian packages](#using-nightly-debian-packages);
* By [deploying its sources manually](#manually).

## Using nightly Debian packages

A convenient way for Debian users to install the operator mode is through the nightly Debian packages we provide. Currently, we package 0WM Client for the following distributions (architecture-independent):

| Distribution | Suites                  |
| ------------ | ----------------------- |
| Debian       | bookworm, trixie, forky |
| Ubuntu       | jammy, noble            |

Our nightly Debian packages are available in the [`nightly-deb` release page on GitHub](https://github.com/lab0-cc/0WM-Client/releases/tag/nightly-deb) and updated every day following a code change.

The Debian packages install 0WM Client’s static files into `/usr/share/0wm-client` and prompt for the URL at which the 0WM server’s API can be reached. This populates a `config.json` file which can later be modified manually (not recommended) or with:

```terminal
> dpkg-reconfigure 0wm-client
```

The files can then be served by the web server of your choice.

## Manually

If Debian is not your environment of choice or you want to contribute to the project’s code, 0WM Client can be fetched with:

```terminal
> git clone --recursive https://github.com/lab0-cc/0WM-Client.git
```

The only static files needed are `index.html` and the files located in the `css`, `fonts` and `js` directories. They can be copied to the directory of your choice, say `$MY_DIR`, with:

```terminal
> cp -rL css fonts js index.html $MY_DIR
```

To work properly, 0WM OpMode requires a `config.json` file at its root telling the web page how to contact 0WM Server’s API. Assuming the API is reachable at `http://my-api:8080`, `config.json` should contain `{ "api": "http://my-api:8080" }`.


The files can then be served by the web server of your choice.

# Platform configuration

We support two ways of using the 0WM client:

* [On a mobile device](#on-a-mobile-device) running iOS or Android;
* [On a computer](#on-a-computer), for testing purposes only.

## On a mobile device

Mobile support is divided in different tiers, depending on platforms’ maturity with the technologies used by 0WM:

| Tier   | Description                                                                                 | Platforms                                                                                                       |
| ------ | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Tier 1 | Fully native network and augmented reality support in the platform’s default web browser    | *None*                                                                                                          |
| Tier 2 | Support guaranteed by a thin wrapper available in a few clicks with no manual configuration | iOS ([through HelloXR](https://apps.apple.com/us/app/helloxr/id6757726359))                                     |
| Tier 3 | Support available after rooting the device and manually configuring it                      | Android ([through a root script](https://raw.githubusercontent.com/lab0-cc/0WM-Android/refs/heads/main/0wm.sh)) |

### On iOS

No specific configuration is needed to run the 0WM client on iOS, however, due to Safari not implementing WebXR, we need to resort to a small App Clip, [HelloXR](https://apps.apple.com/us/app/helloxr/id6757726359). You will get walked through the two-click process as you begin using the client.

### On Android

#### Network configuration

Because of Android’s strong network isolation model and Google’s refusal to properly implement IPv6 support, 0WM Client requires a rooted device to be able to work with Android. While this guide does not walk you through the rooting process, it assumes `/data/adb/service.d` to be a valid location to place startup scripts, like on a working Magisk installation. Here is how to setup the 0WM startup script:

```terminal
> wget https://raw.githubusercontent.com/lab0-cc/0WM-Android/refs/heads/main/0wm.sh
> adb push 0wm.sh /data/local/tmp/0wm.sh
> adb shell su -c "mv /data/local/tmp/0wm.sh /data/adb/service.d/0wm.sh"
> adb shell su -c "chown root:root /data/adb/service.d/0wm.sh"
> adb shell su -c "chmod 750 /data/adb/service.d/0wm.sh"
```

::: note
You may want to patch `0wm.sh` depending on the name of your wired interface. The `IFACE` variable is set to `eth0`, good chances are your access point will appear as `eth0`, but it may well appear as `eth1`, `usb0`, *etc*. The easiest way for you to make sure of this is to run `ip link` before and after plugging your access point in.
:::

::: warn
Your access point will **not** be available through its mDNS name, only its ULA.
:::

#### Enabling WebXR

When first using the client, you may be asked to install Google Play Services for AR to be able to use WebXR.

## On a computer

For debugging and development purposes, 0WM Client can be run on a regular web browser with a WebXR emulator. Currently, we only recommend using Chrome with the [Immersive Web Emulator](https://chromewebstore.google.com/detail/cgffilbpcibhmcfbgggfhfolhkfbhmik) extension. Note however that the 2.x.y series does not support a core WebXR feature that we require (DOM overlays), so you must stick to [version 1.3.0](https://github.com/meta-quest/immersive-web-emulator/releases/tag/v1.3.0) for now.

To use the emulator, open Chrome’s Developer Tools / Inspector and go to the WebXR tab. From there, you can emulate moving in the 3D environment and use the client.
