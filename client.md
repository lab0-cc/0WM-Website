---
title: 0WM — Running the client
lang: en
description: 0WM project
---

# Running the client

We support two ways of testing the 0WM client:

* On a mobile device (currently tested on Chrome on Android and XRViewer on iOS, each with its quirks);
* On a computer, with a WebXR emulator (currently tested on Chrome with [Immersive Web Emulator](https://chromewebstore.google.com/detail/cgffilbpcibhmcfbgggfhfolhkfbhmik)).

## On a phone

There are dramatic differences depending on whether you are running the 0WM client on Android or iOS. But first, for the common part, configure your phone so that it can communicate with 0WM services (for example, by forwarding your local ports to your phone). Because the client needs a stable connection to the server while also receiving scan data from the AP, and due to the fact that most phones can only have one active Wi-Fi connection, we recommend to use Ethernet. Connect your AP to your phone via an Ethernet cable (you may need an RJ45 to USB-C dongle).

### On Android

#### Network configuration

To access your AP, you unfortunately need to perform some pretty low-level network tricks that require rooting your phone. Grab your AP’s ULA, and inject an IPv6 route in your default routing table to this ULA. The following example shows how to connect to your phone with ADB and inject a route to `fd40:134a:ffad::1` through `eth0` (yours will probably differ!):

To access your AP, you unfortunately need to perform some pretty low-level network tricks that require rooting your phone. Grab your AP’s ULA, and inject an IPv6 route in your default routing table to this ULA. The following example shows how to connect to your phone with ADB and inject a route to `<YOUR_AP_ULA>` (*e.g.* `fd40:134a:ffad::1`) through `<YOUR_PHONE_INTERFACE>` (*e.g.* `eth0`):

<pre data-header="bash"><code><span class="comment"># Connect to the device</span>
adb shell
<span class="comment"># Find your interface name (look for the ethernet connection, typically eth0)</span>
ip addr show
<span class="comment"># Inject the route (replace the bolded variables with your actual values)</span>
ip -6 route add table local <b>&lt;YOUR_AP_ULA&gt;</b> dev <b>&lt;YOUR_PHONE_INTERFACE&gt;</b></code></pre>

Your AP will only be available through its ULA.

#### Browser configuration

You may need to tell Chrome to enable WebXR. To this end, look for the WebXR flags in `chrome://flags`.

### On iOS

#### Network configuration

No configuration is required; your AP is available both through its mDNS name and its ULA.

#### Browser configuration

Unfortunately, no browser fully supports WebXR on iOS; Safari does not implement it despite having access to all the necessary APIs, and Firefox only supports a subset of it, in a browser called [WebXR Viewer](https://apps.apple.com/app/webxr-viewer/id1295998056), on a dedicated branch that has not been updated in 5 years. Still, we recommend using this browser, as it is the only viable option available to us.

The app may crash while running the 0WM client; there is nothing we can do about that.

## On a computer

To test the 0WM client on a computer (for debugging and development), we recommend using Chrome with Meta’s WebXR emulator extension, [Immersive Web Emulator](https://chromewebstore.google.com/detail/cgffilbpcibhmcfbgggfhfolhkfbhmik). To use the emulator, open Chrome’s Developer Tools (Inspector), go to the WebXR tab, and enable the emulation. It gives you the most fully-featured environment to test the client.
