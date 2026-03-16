---
title: 0WM
lang: en
description: 0WM project
---

# Introduction

0WM, pronounced /zʋʊm/ or /oʊm/, is a next-generation Wi-Fi mapping solution using off-the-shelf components and open standards to perform hassle-free, large-scale Wi-Fi surveys.

This project still being in its pre-alpha stage, don’t hesitate to come back to this page from time to time to check its progress.

Wi-Fi has gained so much popularity in the recent years that your devices, at home or at work, are less and less likely to be connected to the Internet using a wire. Laptops themselves are slowly losing their 8P8C ports. And yet, deploying a reliable Wi-Fi network is no easy task, because of walls, urban wave pollution, or even weather radars. Professional Wi-Fi survey tools are so expensive that private individuals, associations and small businesses cannot afford them, and free ones are too cumbersome.

0WM makes high quality Wi-Fi surveys affortable to everyone. Why would you need a dedicated device for Wi-Fi surveys when you already have a phone packed with sensors? Why would you need a dedicated wireless sensor when you already have factory-calibrated omnidirectional APs?

# Getting started

0WM is not ready for use by non-developers. The following instructions will get you started setting up a development environment to tinker with it. We present here the following components:

* **0WM Server**, 0WM’s backend, featuring all the hidden bits of logic, and exposing REST and WebSocket APIs;
* **0WM OpMode**, an operator frontend allowing to upload floorplans and position them on a map with precise georeferencing;
* **0WM Client**, a mobile frontend allowing to perform real-time Wi-Fi surveys;
* **0WM AP**, pieces of software and configuration to properly setup an AP for 0WM.

## 0WM Server[](https://github.com/lab0-cc/0WM-Server){target="_blank"}

Currently, 0WM is not packaged and some of its server OCaml dependencies are not live on OPAM. Therefore, a few manual operations are needed. We give here the required commands to get started on a fresh Debian Trixie container:

<pre data-header="bash"><code><span class="comment"># Init OPAM</span>
opam init --compiler=5.2.1 --shell-setup
<span class="comment"># Update the environment</span>
eval <var>$(opam env)</var>
<span class="comment"># Pin the unreleased Gendarme dependencies</span>
opam pin add --no-action --yes git+<a href="https://github.com/bensmrs/gendarme" target="_blank">https://github.com/bensmrs/gendarme</a>
<span class="comment"># Clone this repository</span>
git clone <a href="https://github.com/lab0-cc/0WM-Server.git" target="_blank">https://github.com/lab0-cc/0WM-Server.git</a>
<span class="comment"># Enter the newly created directory</span>
cd 0WM-Server
<span class="comment"># Install the dependencies</span>
opam install --confirm-level=unsafe-yes --deps-only .
<span class="comment"># Compile and run the server</span>
dune exec src/zwm.exe</code></pre>

By default, the server listens to `127.0.0.1:8000`; this can be configured in the `config.json` file. Note that appart from floorplan images, **the server’s internal storage is not persistent yet**; hence, stopping the server leads to data loss (remember, this is a development environment!).

## 0WM OpMode[]("https://github.com/lab0-cc/0WM-OpMode"){target="_blank"}

Being a simple frontend, the OpMode interface can be deployed however you want. Something along the lines of `python3 -m http.server 8001` at the root of the repository will get you going.

The OpMode can be configured with the `config.json` file at the root of the repository.

```{=html}
<img class="window" src="/img/opmode.png" alt="0WM OpMode">
```

## 0WM Client[](https://github.com/lab0-cc/0WM-Client){target="_blank"}

Being a simple frontend, the client interface can be deployed however you want. Something along the lines of `python3 -m http.server 8002` at the root of the repository will get you going.

The client can be configured with the `config.json` file at the root of the repository.

<div class="phone">![0WM client](/img/client.png)</div>

## 0WM AP

Setting up an AP first requires… an AP! If you do not have a spare AP available, we provide a mock AP to debug and develop 0WM more easily.

### Using a mock AP[](https://github.com/lab0-cc/0WM-AP-Mock){target="_blank"}

We provide a mock AP emulating results fetched from a live Zyxel NWA50AX. It can be run by specifying to its script the local port to bind to: `python3 server.py 8003` at the root of the repository will get you going.

### Using an actual AP (OpenWRT)[](https://github.com/lab0-cc/0WM-AP-OpenWRT){target="_blank"}

The 0WM client has been designed on the assumption that an AP be connected to a mobile device via Ethernet, while the latter is connected to the 0WM server. To achieve this, we configure the AP in such a way that its ULA (and only it!) is advertised and, to ensure the AP can easily be found, we advertise it with mDNS. We recommend calling your AP `ap`; it then becomes available through the mDNS name `ap.local`.

Assuming that you have a fair bit of knowledge on OpenWRT, we provide files to properly configure your AP, along with CGI scripts that the 0WM client expects to call.

The approach works on a wide variety of OSes and platforms, except on Android, which, 30&nbsp;years after its initial draft, still does not support IPv6. To get Android support, you have to root your device and manually inject a priority route to your AP through your wired interface (but this will not be enough to get mDNS records).

# Running the client

We support two ways of testing the 0WM client:

* On a mobile device (currently tested on Chrome on Android and XRViewer on iOS, each with its quirks);
* On a computer, with a WebXR emulator (currently tested on Chrome with Immersive Web Emulator).

## On a phone

There are dramatic differences depending on whether you are running the 0WM client on Android or iOS. But first, for the common part, configure your phone so that it can communicate with 0WM services (for example, by forwarding your local ports to your phone). Then, connect your AP to your phone via Ethernet (you may need an USB-C dongle).

### On Android

#### Network configuration

To access your AP, you unfortunately need to perform some pretty low-level network tricks that require rooting your phone. Grab your AP’s ULA, and inject an IPv6 route in your default routing table to this ULA. The following example shows how to connect to your phone with ADB and inject a route to `fd40:134a:ffad::1` through `eth0` (yours will probably differ!):

<pre data-header="bash"><code><span class="comment"># Connect to the device</span>
adb shell
<span class="comment"># Inject the route</span>
ip -6 route add table local fd40:134a:ffad::1 dev eth0</code></pre>

Your AP will only be available through its ULA.

#### Browser configuration

You may need to tell Chrome to enable WebXR. To this end, look for the WebXR flags in `chrome://flags`.

### On iOS

#### Network configuration

No configuration is required; your AP is available both through its mDNS name and its ULA.

#### Browser configuration

Unfortunately, no browser fully supports WebXR on iOS; Safari does not implement it despite having access to all the necessary APIs, and Firefox only supports a subset of it, in a browser called XRViewer, on a dedicated branch that has not been updated in 5&nbsp;years. Still, we recommend using this browser, as it is the only one available to us.

The app may crash while running the 0WM client; there is nothing we can do about that.

## On a computer

To test the 0WM client on a computer (for debugging and development), we recommend to use Chrome, with Meta’s WebXR emulator extension, Immersive Web Emulator. It gives you the most fully-featured environment to test the client.
