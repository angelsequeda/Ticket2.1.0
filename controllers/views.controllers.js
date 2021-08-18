const ctrl = {}

ctrl.index = (req,res) => {
  res.render('index')
}

ctrl.login = (req,res) => {
  res.render('login')
}
ctrl.loginTecler = (req,res) => {
  res.render('logintecler')
}
ctrl.loginTeclerValidation = (req, res) => {
  console.log('dentro')
  console.log(req.body)
  res.json(req.body)
}

ctrl.loginEvaluador = (req,res) => {
  res.render('loginevaluador')
}

ctrl.loginColaborador = (req,res) => {
  res.render('logincolaborador')
}

ctrl.signinTecler = (req,res) => {
  res.render('signintecler')
}

ctrl.signinEvaluador = (req,res) => {
  res.render('signinevaluador')
}

ctrl.signinColaborador = (req,res) => {
  res.render('signin')
}

module.exports = ctrl;