# nextql-limit [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> NextQL plugin for protect against excessive calls.
[NextQL](https://github.com/giapnguyen74/nextql), [GraphQL](http://graphql.org/) or any data query layer; vulnerable for exessive or abusive calls ( or denial of service attacks ) when used to provide service for third-parties.

There are some solutions:
- Rate limiting: limit how many api calls per time could be deploy at transport layer for example HTTP calls.
- [Persisted query](https://docs.scaphold.io/tutorials/persisted-queries/): only allow predefined queries.
- [Resource quotas](https://developer.github.com/v4/guides/resource-limitations/): limit how many information could be return. The solution could be deploy at bussiness logic layer.
- Limit request size: limit based on query shape.

The plugin implemented based on the last solution. The idea is very simple, it calculate query's metric: how many method calls and how many fields requested. If those metric out of limit, it stop execution and throw execptions. Nextql-limit iterate through javascript object properties, it should be very fast.


## Installation

```sh
$ npm install --save nextql-limit
```

## Usage

```js
const  = require('nextql-limit');

const NextQL = require("../../nextql");
const nextql = new NextQL();
nextql.use(nextqlLimit, {
	calls: 2, // how many method calls allow
	fields: 20 // how many fields query allow (for the sake of performance [$params] not filtered )
});

```
## License

MIT © [Giap Nguyen Huu]()


[npm-image]: https://badge.fury.io/js/nextql-limit.svg
[npm-url]: https://npmjs.org/package/nextql-limit
[travis-image]: https://travis-ci.org/giapnguyen74/nextql-limit.svg?branch=master
[travis-url]: https://travis-ci.org/giapnguyen74/nextql-limit
[daviddm-image]: https://david-dm.org/giapnguyen74/nextql-limit.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/giapnguyen74/nextql-limit
