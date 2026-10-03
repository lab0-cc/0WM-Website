---
title: 0WM — AP installation guide
lang: en
description: Installation guide for 0WM access points
p-install-ap: true
sp-install: true
---

::: audience
**Target audience** Server administrators
:::

# Introduction

0WM collects measurements from access points connected to mobile devices. For those access points to be able to report the necessary data, they require special configuration. A typical 0WM access point acts as an Ethernet switch advertising its Unique Local Address (ULA) as a gateway and its name (usually `ap`) as a Multicast DNS record (usually `ap.local`).

# AP installation

We support two ways of setting up access points:

* [On a physical access point](#on-openwrt) running OpenWRT;
* [On a computer](#on-a-computer), for testing purposes only.

## On OpenWRT[](https://github.com/lab0-cc/0WM-AP-OpenWRT)

This assumes that you have correctly flashed your access point with OpenWRT and a web server runs scripts under `/www/cgi-bin` (this is the case with OpenWRT images shipping LuCI). You have to copy all the files in the [0WM-AP-OpenWRT repository](https://github.com/lab0-cc/0WM-AP-OpenWRT) to the root of your access point:

* `etc/config/dhcp` goes into `/etc/config/dhcp` and is loaded with `service odhcpd restart`. It is responsible for setting up the wired interface (assuming it is called `lan`) of the AP.
* `etc/mDNSResponder.conf` goes into `/etc/mDNSResponder.conf`. It is responsible for setting up the mDNS responder to advertise the AP’s host name.
* Scripts under `www/cgi-bin` go into `/www/cgi-bin` and must be made executable. They are responsible for transmitting scan data to 0WM.

## On a computer[](https://github.com/lab0-cc/0WM-AP-Mock)

For debugging and development purposes, we provide a very simple mock AP emulating results fetched from a live Zyxel NWA50AX. See the [0WM-AP-Mock repository](https://github.com/lab0-cc/0WM-AP-Mock) for details on how to run it.
