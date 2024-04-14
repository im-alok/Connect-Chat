const userInteraction = () => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				font-size: 1.54rem;
				font-weight: bolder;
				margin-bottom: 20px;
				background: rgb(255, 232, 61);
				color: black;
				padding: 8px;
				border-radius: 10px;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
			}
			a{
				text-decoration: none;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<a href=${`https://connect-chat-im-aloks-projects.vercel.app/`}><p class="logo">Connect Chat</p></a>
			<div class="message">Connect Chat is live now !!!</div>
			<div class="body">
				<p>Dear User,</p>
				<p>Connect Chat is live now you can go and access the benefits of this web application</p>
                <p>Kindly re-register, as your old credentials is expire now. Hope to here some positive feedback from your side</p>
				<p
                style="
                font-family: 'Ubuntu Mono', monospace;
                margin: auto;
                width: fit-content;
                display: block;
                color: blue;
                font-size: 14px;
                font-weight: bold;
                text-decoration: none;
                padding: 10px;
                padding-left: 20px;padding-right: 20px;
                background-color: #FFD60A;
                border-radius: 999px;
                ">Thank You!!</p>
			</div>
			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					href="mailto:alokranjan.projects@gmail.com">alokranjan.projects@gmail.com</a>. We are here to help!</div>
		</div>
	</body>
	
	</html>`;
};
module.exports = userInteraction;