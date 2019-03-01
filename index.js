require("isomorphic-fetch");

exports.handler = (event, context, callback) => {

	const body = JSON.parse(event.body)

	const commitNums = body.commits.length;
	const text = commitNums > 1 ? `+ ${commitNums-1} Commit${commitNums-1 === 1 ? "" : "s"}.` : "";
	const message = body.head_commit.message
	const link = body.head_commit.url
	
	const photo = `https://github.com/${body.head_commit.author.name}.png`

	const json = {
		"attachments": [
			{
				"fallback": "GitHub Pushed!!",
				"color": "good",
				"title": message,
				"title_link": link,
				"text": text,
				"author_icon": photo,
			}
		]
	}

	fetch("https://hooks.slack.com/services/pass/to/your/api", {
		method: "post",
		headers: {
			"Content-Types": "application/x-www-form-urlencoded; application/json;"
		},
		body : JSON.stringify(json)
	})

	const res = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*"
        },
        body : "OK",
        isBase64Encoded: false     
	}

	callback(null, res)
}