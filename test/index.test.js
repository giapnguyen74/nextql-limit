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

nextql.model("test2", {
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
		me: "test2"
	}
});

test("simple query#underlimit", async function() {
	const result = await nextql.execute({
		test: {
			me: {
				a: 1
			}
		}
	});
	expect(result).toMatchObject({ test: { me: { a: "hello" } } });
});

test("simple query#manycalls", async function() {
	await nextql
		.execute({
			test: {
				me: {
					a: 1
				},
				"me/2": {
					a: 1
				},
				"me/3": {
					a: 1
				}
			}
		})
		.catch(err => expect(err.message).toBe("Too many calls in query: 3"));
});

test("complex query#underlimit", async function() {
	const result = await nextql.execute({
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
	});

	expect(result).toMatchObject({
		test: { me: { a: "hello", c: null }, "me/2": { a: "hello", c: null } }
	});
});

test("complex query#too_many_fields", async function() {
	await nextql
		.execute({
			test: {
				me: {
					a: 1,
					c: {
						c: {
							c: {
								c: {
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
						}
					}
				}
			},
			test2: {
				"me/2": {
					a: 1,
					c: {
						c: {
							c: {
								c: {
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
						}
					}
				}
			}
		})
		.catch(err => expect(err.message).toBe("Too many fields in query: 22"));
});

test("complex query#multiple_model_request", async function() {
	await nextql
		.execute({
			test: {
				me: {
					a: 1,
					c: {
						c: {
							c: {
								c: {
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
						}
					}
				},
				"me/2": {
					a: 1,
					c: {
						c: {
							c: {
								c: {
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
						}
					}
				}
			}
		})
		.catch(err => expect(err.message).toBe("Too many fields in query: 22"));
});

test("simple query#manycalls_multi_model", async function() {
	await nextql
		.execute({
			test: {
				me: {
					a: 1
				},
				"me/2": {
					a: 1
				}
			},
			test2: {
				"me/3": {
					a: 1
				}
			}
		})
		.catch(err => expect(err.message).toBe("Too many calls in query: 3"));
});
