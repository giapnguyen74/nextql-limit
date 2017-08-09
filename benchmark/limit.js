const NextQL = require("../../nextql");
const nextql = new NextQL();
nextql.use(require("../src"), {
	calls: 2,
	fields: 20
});

nextql.model("test", {
	fields: {
		a: 1,
		c: "test"
	},
	methods: {
		me() {
			return { a: "hello" };
		}
	},
	returns: {
		me: "test"
	}
});

nextql
	.execute({
		test: {
			me: {
				a: 1,
				c: {
					c: {
						c: {
							c: {
								a: 1
							}
						}
					}
				}
			},
			"me/2": {
				a: 1,
				c: {
					c: {
						c: {
							c: {
								a: 1
							}
						}
					}
				}
			}
		}
	})
	.then(() => true);
