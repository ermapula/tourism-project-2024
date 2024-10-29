export function validate(form, setError) {
  let valid = true;
  if(form.email !== undefined) {
    if(form.email == '') {
      setError(prev => ({
        ...prev,
        email: 'Email is empty'
      }))
      valid = false;
    } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)){
      setError(prev => ({
        ...prev,
        email: 'Invalid email'
      }))
      valid = false;
    }
  }

  if(form.password !== undefined && form.password == '') {
    setError(prev => ({
      ...prev,
      password: 'Password is empty'
    }))
    valid = false;
  }
  if(form.password2 !== undefined) {
    if(form.password2 == '') {
      setError(prev => ({
        ...prev,
        password2: 'Password is empty'
      }))
      valid = false;
    }
    else if(form.password !== form.password2) {
      setError(prev => ({
        ...prev,
        password2: "Password doesn't match"
      }))
      valid = false;
    }
  }
  
  return valid;
}