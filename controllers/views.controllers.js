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

ctrl.signin = (req,res) => {
  res.render('signin')
}

ctrl.signinColaborador = (req,res) => {
  res.render('signincolaborador')
}

ctrl.signinTecler = (req,res) => {
  res.render('signintecler')
}

ctrl.signinEvaluador = (req,res) => {
  res.render('signinevaluador')
}

ctrl.inicio =(req,res) => {
  res.render('inicio')
}
ctrl.perfilTecler =(req,res) => {
  res.render('perfilTecler')
}

ctrl.perfilEvaluador = (req,res) => {
  res.render('perfilEvaluador')
}
module.exports = ctrl;