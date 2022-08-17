export default function formHandler(req, res) {
	if(!req.body.pw) {
	
		return res.status(403).send();
	}
	const test = req.body.pw.trim().toLowerCase(); 
	if(test !== process.env.PW_CHECK) {
	
		return res.status(403).send()
	}
	return res.send({pw: test})
  }
 