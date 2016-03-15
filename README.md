# nodengine

<p align="center">
  <br>
  <img src="http://g.recordit.co/pMGKmq4ycR.gif" alt="demo">
  <br>
  <br>
</p>

![Last version](https://img.shields.io/github/tag/Kikobeats/nodengine.svg?style=flat-square)
[![Build Status](http://img.shields.io/travis/Kikobeats/nodengine/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/nodengine)
[![Dependency status](http://img.shields.io/david/Kikobeats/nodengine.svg?style=flat-square)](https://david-dm.org/Kikobeats/nodengine)
[![Dev Dependencies Status](http://img.shields.io/david/dev/Kikobeats/nodengine.svg?style=flat-square)](https://david-dm.org/Kikobeats/nodengine#info=devDependencies)
[![NPM Status](http://img.shields.io/npm/dm/nodengine.svg?style=flat-square)](https://www.npmjs.org/package/nodengine)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/Kikobeats)

> NodeJS switcher based on package.json.

It needs a global version manager as [n](https://www.npmjs.com/package/n) or [nvm](https://www.npmjs.com/package/nvm).

## Install

```bash
$ npm install nodengine --global
```

## Usage

Just run `nodengine` to change to current package.json version. Just it!

For automatic switching, add this snippet into `.extra`:

```bash
echo "chpwd () { nodengine }" >> ~/.extra
```

## License

MIT © [Kiko Beats](http://kikobeats.com)
