---
title: 0WM — Server user guide
lang: en
description: User guide for the 0WM server
p-guide-server: true
sp-guides: true
---

::: audience
**Target audience** Server administrators
:::

# Introduction

0WM Server is the central backend for 0WM. It receives scans from the client and floorplan data from the operator interface and processes them to generate coverage heatmaps. At this point in the project, very few options are available to tune the server’s behavior; yet, we provide some tools to interact with it, which we intend to extend in the future.

# Server architecture

The 0WM server is in reality made of two distinct servers running concurrently:

* A monitor, listening to a local UNIX socket and performing low-level administration tasks;
* A web server, listening to a configured HTTP address and port pair.

## Monitor

The only role of the monitor is to handle the web server’s configuration, through an internal `/config` HTTP endpoint. The only documented and supported way to interact with the monitor is through the `0wm` command-line tool.

The server supports the following configuration options:

* `interface`, the network interface to listen on (defaults to `localhost`);
* `port`, the port to listen on (defaults to `8080`);
* `aps`, the list of 0WM-ready access points (IP addresses and/or hostnames);
* `ssids`, the list of SSIDs to include in heatmaps.

::: warn
The configuration options are not stable yet and **will** change in the future.
:::

The configuration can be shown with `0wm config show` and edited with `0wm config edit`. Both commands can be passed a `--format` argument to show and edit the configuration in a different representation format. Individual configuration options can be set with `0wm config set`.

## Web server

The web server exposes the actual 0WM API through the interface and port configured in the monitor. A Swagger interface is served at the root of the web server (*i.e.* `http://localhost:8080/` if `interface` is set to `localhost` and `port` is set to `8080`).

::: warn
The web server doesn’t natively handle TLS, so a TLS termination proxy supporting HTTP and WebSocket is required to run 0WM Server in a secure environment.
:::

# Data storage

0WM manages all its configuration and measurements through a Git database stored under the `database` directory of its persistent storage. On a typical Debian installation, this directory is located at `/var/lib/0wm/database`. This Git database should regularly be pushed to a remote Git server; this is not handled by 0WM directly.

Floorplan images are stored in another directory, `data`, so as not to pollute the Git database. On a typical Debian installation, this directory is located at `/var/lib/0wm/data`. This directory should regularly be pushed to a remote file store; this is not handled by 0WM directly.
