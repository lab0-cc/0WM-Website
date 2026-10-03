---
title: 0WM — Server installation guide
lang: en
description: Installation guide for the 0WM server
p-install-server: true
sp-install: true
---

::: audience
**Target audience** Server administrators
:::

# Introduction

0WM Server is the central backend for 0WM. It receives scans from the client and floorplan data from the operator interface and processes them to generate coverage heatmaps. The project is not officially released, therefore its distribution channels are rather scarce at the moment. That being said, we offer several ways to try it out in the meantime.

# Server installation

We support two ways of installing the 0WM server:

* With one of our [nightly Debian packages](#using-nightly-debian-packages);
* By [compiling its sources](#from-sources) directly.

## Using nightly Debian packages

The easiest way to install the server is through the nightly Debian packages we provide. Currently, we package 0WM Server for the following distributions and architectures:

| Distribution | Suites                  | Architectures |
| ------------ | ----------------------- | ------------- |
| Debian       | bookworm, trixie, forky | amd64, arm64  |
| Ubuntu       | jammy, noble            | amd64, arm64  |

Our nightly Debian packages are available in the [`nightly-deb` release page on GitHub](https://github.com/lab0-cc/0WM-Server/releases/tag/nightly-deb) and updated every day following a code change.

The Debian packages install a `0wm-server` service managing the 0WM server daemon.

## From sources

If Debian is not your environment of choice or you want to contribute to the project’s code, 0WM Server can be built from its sources.

### Using Nix

::: note
Before starting using Nix, make sure that the `nix-command` and `flakes` experimental features are enabled in your Nix configuration. This can be done by setting `experimental-features = nix-command flakes` in `~/.config/nix/nix.conf` (after creating the necessary directory and file, if missing).
:::

0WM Server can then be built either from within its cloned Git repository with:

```terminal
> git clone https://github.com/lab0-cc/0WM-Server.git
> cd 0WM-Server
> nix build
```

or directly with:

```terminal
> nix build github:lab0-cc/0WM-Server
```

`-L` can be passed to `nix build` to print all the build logs to the standard error. A development environment can be entered with `nix develop`.

The 0WM server daemon can then be started by running the resulting `0wmd` binary.

The server is tested daily with a Nix development environment on the following operating systems and architectures:

| OS           | Architectures |
| ------------ | ------------- |
| macOS 26     | arm64         |
| Ubuntu 24.04 | amd64, arm64  |

### Manually

0WM Server is written in OCaml. We rely on OPAM, the OCaml package manager, and Dune, a popular build system. Some of 0WM Server’s dependencies are pinned from Git repositories because upstream’s code either has not yet been made available on OPAM, or required bespoke patching on our end. To improve the server’s performance, we recommend using the `flambda` flavor of the OCaml compiler.

#### Prerequisites

- OCaml (5+)
- Opam
- Git

#### Installing dependencies

```terminal
# 1. Initialize OPAM if you haven’t already
> opam init --compiler=ocaml-option-flambda --shell-setup
> eval $(opam env)

# 2. Pin development dependencies
> opam pin add --no-action --yes git+https://github.com/bensmrs/gluten.git#668d961cf6edafecfd130b9b6b0ab01c3d2a4242
> opam pin add --no-action --yes git+https://github.com/camlworks/dream.git#4718cb47264178d6d2181e0fcc2e8a8ff2170b5a
> opam pin add --no-action --yes git+https://github.com/mirage/irmin.git#7a09a06fff67bc4981faca36a332c51fc16e819e
> opam pin add --no-action --yes git+https://gitlab.com/camlspotter/camlimages.git#ef4caba407b738e98763001a4c85b3a5db19a739
# Uncomment this on macOS
# opam pin add --no-action --yes git+https://github.com/jetjinser/ocaml-cf.git#92099f5918ce0a32633d4030660943504f33cc86

# 3. Clone and install dependencies
> git clone https://github.com/lab0-cc/0WM-Server.git
> cd 0WM-Server
> opam install --confirm-level=unsafe-yes --deps-only .
```

#### Compiling and running

From there, compiling the server is a matter of running:

```terminal
> dune build
```

The 0WM server daemon can then be started by running:

```terminal
> dune exec src/zwmd.exe
```

### Environment

0WM Server’s daemon obeys the following environment variables, which can be used to preconfigure the server:

| Variable                        | Meaning                                           |
| ------------------------------- | ------------------------------------------------- |
| `NOTIFY_SOCKET`                 | Systemd notify socket (to be set by systemd)      |
| `ZWM_RUN` / `RUNTIME_DIRECTORY` | Volatile runtime data storage                     |
| `ZWM_SHARE`                     | Persistent static data storage                    |
| `ZWM_SPOOL`                     | Internal data injection spool (internal use only) |
| `ZWM_VAR` / `STATE_DIRECTORY`   | Persistent dynamic data storage                   |
