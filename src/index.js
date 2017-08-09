function calculate_fields(call) {
	const fields = Object.keys(call);
	let count = fields.length;
	for (let i = 0; i < fields.length; i++) {
		//For the sake of performance, I don't filter $params key.
		if (call[fields[i]].constructor != Object) continue;
		count = count + calculate_fields(call[fields[i]]);
	}

	return count;
}

function calculate_metric(query) {
	const models = Object.keys(query);
	const metric = {
		calls: 0,
		fields: 0
	};

	for (let i = 0; i < models.length; i++) {
		const model = query[models[i]];
		const calls = Object.keys(model);
		metric.calls = metric.calls + calls.length;
		for (let j = 0; j < calls.length; j++) {
			metric.fields = metric.fields + calculate_fields(model[calls[j]]);
		}
	}
	return metric;
}

module.exports = {
	install(nextql, limit) {
		nextql.beforeExecute(query => {
			const metric = calculate_metric(query);
			if (limit.calls) {
				if (metric.calls > limit.calls) {
					return "Too many calls in query: " + metric.calls;
				}
			}

			if (limit.fields) {
				if (metric.fields > limit.fields) {
					return "Too many fields in query: " + metric.fields;
				}
			}
		});
	}
};
