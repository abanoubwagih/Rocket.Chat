function TokenpassVerifyAddress(command, params, item) {
	function getParams(str) {
		const regex = /(--(\w+))+/g;
		const result = [];
		let m;
		while ((m = regex.exec(str)) !== null) {
			if (m.index === regex.lastIndex) {
				regex.lastIndex++;
			}
			result.push(m[2]);
		}
		return result;
	}

	if (command !== 'tokenpass-verify-address' || !Match.test(params, String)) {
		return;
	}

	console.log(getParams(params));
}

RocketChat.slashCommands.add('tokenpass-verify-address', TokenpassVerifyAddress);
